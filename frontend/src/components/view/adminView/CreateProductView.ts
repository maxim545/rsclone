import { IProductCreated, IUserData } from "../../types";
import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";

class CreateProductView extends Element {

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
        const container = this.createEl('div', 'Create product', 'container', null);
        const inputs = ['name', 'year', 'color', 'category', 'price', 'brand', 'image', 'variant', 'discount'];
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const inputsValues: IProductCreated = {}
        inputs.forEach(item => {
            const inputContainer = this.createEl('div', '', 'item', container);
            this.createEl('p', `Add ${item}`, 'item__title', inputContainer);
            const input = this.createEl('input', '', item, inputContainer) as HTMLInputElement;
            input.type = 'text';
            input.addEventListener('change', () => { inputsValues[item as keyof typeof inputsValues] = input.value; })
        })

        const submitBtn = this.createEl('button', 'submit', 'submit-btn', container);
        submitBtn.addEventListener('click', () => {
            this.api.createProduct(userData, inputsValues)
        });

        return container;
    }

}

export default CreateProductView;