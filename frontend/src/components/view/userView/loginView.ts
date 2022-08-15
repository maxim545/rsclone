import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";

class LoginView extends Element {


    private controller: Controller

    private updateView: UpdateView

    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
    }

    create() {
        const loginEl = this.createEl('div', '', 'login', null);
        this.createEl('h2', 'Please enter your Name and password', 'login__title', loginEl);
        const inpustList = this.createEl('div', '', 'login__list', loginEl);

        const emailEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'email', 'login__title', emailEl);
        const inputEmail = this.createEl('input', '', `login__email`, emailEl) as HTMLInputElement;
        inputEmail.type = 'email';

        const passwordEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'password', 'login__title', passwordEl);
        const inputPassword = this.createEl('input', '', `login__password`, passwordEl) as HTMLInputElement;
        inputPassword.type = 'password';

        const submit = this.createEl('button', 'submit', 'login__btn', loginEl);
        const register = this.createEl('a', 'Register new account', 'login__register', loginEl) as HTMLAnchorElement;
        register.href = `#/register`;

        submit.addEventListener('click', () => {
            this.controller.loginUser(inputEmail.value, inputPassword.value)
                .then(() => { this.updateView.updateHeader() })
        });

        return loginEl;
    }

}

export default LoginView;