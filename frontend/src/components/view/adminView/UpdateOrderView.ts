import { IOrderUpdated, IUserData } from "../../types";
import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";

class UpdateOrderView extends Element {

    private api: Api

    private controller: Controller

    private updateView: UpdateView

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.updateView = new UpdateView();
    }

    create() {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const id = window.location.hash.replace("#", "").slice(26);
        const container = this.createEl('div', `Change order ${id}`, 'container', null);
        const inputs = ['orderStatus'];
        (async () => {
            const product = await this.api.getOrder(id, userData);
            const inputsValues: IOrderUpdated = { _id: id }
            inputs.forEach(item => {
                const inputContainer = this.createEl('div', '', 'item', container);
                this.createEl('p', `Add ${item}`, 'item__title', inputContainer);
                const input = this.createEl('input', '', item, inputContainer) as HTMLInputElement;
                const value = product[item as keyof typeof product] as string;
                input.type = 'text';
                input.value = value;
                inputsValues[item as keyof typeof inputsValues] = input.value;
                input.addEventListener('change', () => { inputsValues[item as keyof typeof inputsValues] = input.value; })
            })
            const updateBtn = this.createEl('button', `Update`, 'btn-update', container);
            updateBtn.addEventListener('click', () => {
                this.api.updateOrder(userData, inputsValues).then(() => {
                    window.location.hash = '#/adminpanel/orders'
                })

            })
        })();
        return container;
    }

}

export default UpdateOrderView;