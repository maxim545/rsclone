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
        const container = this.createEl('div', '', 'container_main', null);
        const loginEl = this.createEl('div', '', 'login', container);

        this.createEl('h2', 'Sign in', 'login__title', loginEl);
        this.createEl('p', 'Sign in to your account using email and password provided during registration.', 'login__subtitle', loginEl);
        const inpustList = this.createEl('div', '', 'login__list', loginEl);


        const emailEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'Email', 'login__input-title', emailEl);
        const inputEmail = this.createEl('input', '', `form-control login__input`, emailEl) as HTMLInputElement;
        inputEmail.type = 'email';
        inputEmail.placeholder = 'Your working email'

        const passwordEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'Password', 'login__input-title', passwordEl);
        const inputPassword = this.createEl('input', '', `form-control login__input`, passwordEl) as HTMLInputElement;
        inputPassword.type = 'password';

        const submit = this.createEl('button', 'Sign in', 'btn btn-primary login__btn', loginEl);
        this.createEl('p', `Don't have an account? <a class="login__link" href="#/register">Sign up</a>`, 'login__info', loginEl) as HTMLAnchorElement;
        submit.addEventListener('click', () => {
            this.controller.loginUser(inputEmail.value, inputPassword.value)
                .then(() => { this.updateView.updateHeader() })
        });

        return container;
    }

}

export default LoginView;