import { IProductCreated, IUserData } from "../../types";
import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";
import UserSidebarView from "../userView/UserSidebarView";

class CreateProductView extends Element {

    private api: Api

    private controller: Controller

    private updateView: UpdateView

    private sidebarView: UserSidebarView

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.sidebarView = new UserSidebarView();
    }

    create() {
        const container = this.createEl('div', '', 'container_main account', null);
        const userData = <IUserData>JSON.parse(localStorage.getItem(`userData`) || `null`);
        if (!userData) {
            const enterLink = `<a class="acoount__link" href="#/login">enter</a>`
            const registerLink = `<a class="acoount__link" href="#/register">register</a>`
            this.createEl(`div`, `Please ${enterLink} in your account or ${registerLink}`, `account__warning`, container);
        }
        else {
            container.append(this.sidebarView.create(userData));
            const accountWrap = this.createEl('div', '', 'account__wrapper', container);
            const inputs = ['name', 'year', 'color', 'category', 'price', 'brand', 'image', 'variant', 'discount'];
            const inputsValues: IProductCreated = {}
            inputs.forEach(item => {
                const inputContainer = this.createEl('div', '', 'item', accountWrap);
                this.createEl('p', `Add ${item}`, 'item__title', inputContainer);
                const input = this.createEl('input', '', item, inputContainer) as HTMLInputElement;
                input.type = 'text';
                input.addEventListener('change', () => {
                    inputsValues[item as keyof typeof inputsValues] = input.value;
                })
            })

            const submitBtn = this.createEl('button', 'submit', 'submit-btn', container);
            submitBtn.addEventListener('click', () => {
                this.api.createProduct(userData, inputsValues)
            });
        }

        return container;
    }

}

export default CreateProductView;