import Element from "../../common/Element";
import Controller from "../../Controller";
import { IUserData } from "../../types";
import UpdateView from "../../Update";

class AccountView extends Element {

    private controller: Controller;

    private updateView: UpdateView

    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
    }

    create() {
        const accountEl = this.createEl('div', '', 'account', null);
        const userData: IUserData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            const enterLink = `<a class="acoount__link" href="#/login">enter</a>`
            const registerLink = `<a class="acoount__link" href="#/register">register</a>`
            this.createEl('div', `Please ${enterLink} in your account or ${registerLink}`, 'account__warning', accountEl);
        }
        else {
            this.createEl('h2', 'My data', 'account__title', accountEl);
            const inpustList = this.createEl('div', '', 'account__list', accountEl);
            const inputs = ['name:text', 'email:email', 'password:password', 'surname:text', 'thirdname:text', 'phone:text', 'adress:text', 'newPasswordOne:password', 'newPasswordTwo:password']
            const test = {}
            inputs.forEach(item => {
                const [name, type] = item.split(':');
                const inputContainer = this.createEl('div', '', 'login__item', inpustList);
                this.createEl('p', `change ${name}`, 'login__title', inputContainer);
                const input = this.createEl('input', '', name, inputContainer) as HTMLInputElement;
                input.type = type;
                input.addEventListener('change', () => { test[name] = input.value })
                if (userData[name] !== undefined) {
                    input.value = userData[name];
                    test[name] = input.value;
                } else if (type === 'password') {
                    test[name] = input.value;
                }
            })

            const submit = this.createEl('button', 'submit', 'account__btn', accountEl);
            submit.addEventListener('click', () => {
                const inputs = Object.values(test)
                this.controller.changeUserData(...Object.values(test))
                    .then(() => {
                        this.updateView.updateHeader();
                        /* const main = document.querySelector('.main') as HTMLElement;
                        main.innerHTML = '';
                        main.append(this.create()) */
                    })
            });
        }

        return accountEl;


    }

}

export default AccountView;