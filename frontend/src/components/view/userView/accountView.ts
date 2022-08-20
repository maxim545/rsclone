import Element from "../../common/Element";
import Controller from "../../Controller";
import { IUserData } from "../../types";
import UpdateView from "../../Update";
import UserSidebarView from "./UserSidebarView";

class AccountView extends Element {

    private controller: Controller;

    private updateView: UpdateView;

    private sidebarView: UserSidebarView

    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.sidebarView = new UserSidebarView();
    }

    create() {
        const container = this.createEl('div', '', 'container_main account', null);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (!userData) {
            const enterLink = `<a class="acoount__link" href="#/login">enter</a>`
            const registerLink = `<a class="acoount__link" href="#/register">register</a>`
            this.createEl('div', `Please ${enterLink} in your account or ${registerLink}`, 'account__warning', container);
        }
        else {
            container.append(this.sidebarView.create(userData))
            const accountEl = this.createEl('div', '', 'account__wrapper', container);
            this.createEl('h2', 'My profile', 'account__title', accountEl);
            const inpustList = this.createEl('div', '', 'account__inputs-list', accountEl);
            const inputs = ['name:text', 'surname:text', 'thirdname:text', 'email:email', 'password:password', 'repPassword:password', 'phone:text', 'adress:text']
            const unputsValues: Record<string, string> = {}
            inputs.forEach(item => {
                const [name, type] = item.split(':');
                const inputContainer = this.createEl('div', '', 'account__inputs-item', inpustList);
                this.createEl('p', `Change ${name}`, 'account__inputs-title', inputContainer);
                const input = this.createEl('input', '', 'form-control account__input', inputContainer) as HTMLInputElement;
                input.type = type;
                input.addEventListener('change', () => { unputsValues[name] = input.value })
                if (userData[name as keyof typeof userData] !== undefined && type !== 'password') {
                    input.value = userData[name as keyof typeof userData];
                    unputsValues[name] = input.value;
                } else if (userData[name as keyof typeof userData] !== undefined && type === 'password') {
                    unputsValues[name] = input.value;
                }
            })
            const submit = this.createEl('button', 'Save changes', 'btn btn-primary auth__btn', accountEl);
            submit.addEventListener('click', () => {
                this.controller.changeUserData(unputsValues)
                    .then(() => {
                        this.updateView.updateHeader();
                        const main = document.querySelector('.main') as HTMLElement;
                        main.innerHTML = '';
                        main.append(this.create())
                    })
            });
        }

        return container;


    }

}

export default AccountView;