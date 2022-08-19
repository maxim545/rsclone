import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IProduct, IUserData } from "../../types";
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
            const inputsValues: IProduct = { _id: id }
            inputs.forEach(item => {
                const inputContainer = this.createEl('div', '', 'item', container);
                this.createEl('p', `Add ${item}`, 'item__title', inputContainer);
                const input = this.createEl('input', '', item, inputContainer) as HTMLInputElement;
                input.type = 'text';
                input.value = product[item];
                inputsValues[item] = input.value;
                input.addEventListener('change', () => { inputsValues[item] = input.value; })
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