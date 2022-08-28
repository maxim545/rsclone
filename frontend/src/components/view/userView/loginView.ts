import { IUserData } from "../../types";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";
import AlertsView from "../AlertsView";

class LoginView extends Element {


    private controller: Controller

    private updateView: UpdateView

    private alertView: AlertsView;


    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.alertView = new AlertsView();
    }

    create() {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const container = this.createEl('div', '', 'container_main', null);
        if (userData) {
            container.append(this.alertView.createLoginAlert())
        } else {
            const loginEl = this.createEl('div', '', 'auth auth_login', container);
            this.createEl('h2', 'Sign in', 'auth__title', loginEl);
            this.createEl('p', 'Sign in to your account using email and password provided during registration.', 'auth__subtitle', loginEl);
            const inpustList = this.createEl('div', '', 'auth__inputs', loginEl);

            const emailEl = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', 'Email', 'auth__input-title', emailEl);
            const inputEmail = this.createEl('input', '', `form-control auth__input`, emailEl) as HTMLInputElement;
            inputEmail.type = 'email';
            inputEmail.placeholder = 'Your working email'

            const passwordEl = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', 'Password', 'auth__input-title', passwordEl);
            const inputPassword = this.createEl('input', '', `form-control auth__input`, passwordEl) as HTMLInputElement;
            inputPassword.type = 'password';

            const submit = this.createEl('button', 'Sign in', 'btn btn-primary auth__btn', loginEl);
            this.createEl('p', `Don't have an account? <a class="auth__link" href="#/register">Sign up</a>`, 'auth__info', loginEl);
            submit.addEventListener('click', () => {
                this.controller.loginUser(inputEmail.value, inputPassword.value)
                    .then(() => { this.updateView.updateHeader() })
            });
        }
        return container;
    }

}

export default LoginView;