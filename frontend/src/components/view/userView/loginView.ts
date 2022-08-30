import { IUserData } from "../../types";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";
import AlertsView from "../AlertsView";
import langData from "../../data-lang";

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
        const lang = localStorage.getItem('current-lang') as string;
        document.title = langData['login-page-title'][lang as keyof typeof langData['login-page-title']];
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const container = this.createEl('div', '', 'container_main', null);
        if (userData) {
            container.append(this.alertView.createLoginAlert())
        } else {
            const loginEl = this.createEl('div', '', 'auth auth_login', container);
            this.createEl('h2', langData['login-title'][lang as keyof typeof langData['login-title']], 'auth__title', loginEl/* , "", 'lng:login-title' */);
            this.createEl('p', langData['login-subtitle'][lang as keyof typeof langData['login-subtitle']], 'auth__subtitle', loginEl/* , "", 'lng:login-subtitle' */);
            const inpustList = this.createEl('div', '', 'auth__inputs', loginEl);
            const emailEl = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', langData['login-email'][lang as keyof typeof langData['login-email']], 'auth__input-title', emailEl/* , "", 'lng:login-email' */);
            const inputEmail = this.createEl('input', '', `form-control auth__input`, emailEl) as HTMLInputElement;
            inputEmail.type = 'email';
            inputEmail.placeholder = langData['login-placeholder'][lang as keyof typeof langData['login-placeholder']];

            const passwordEl = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', langData['login-password'][lang as keyof typeof langData['login-password']], 'auth__input-title', passwordEl/* , "", 'lng:login-password' */);
            const inputPassword = this.createEl('input', '', `form-control auth__input`, passwordEl) as HTMLInputElement;
            inputPassword.type = 'password';

            const submit = this.createEl('button', langData['login-btn'][lang as keyof typeof langData['login-btn']], 'btn btn-primary auth__btn', loginEl/* , "", 'lng:login-btn' */);

            this.createEl('p', langData['login-account'][lang as keyof typeof langData['login-account']], 'auth__info', loginEl/* , "", 'lng:login-account' */);
            submit.addEventListener('click', () => {
                this.controller.loginUser(inputEmail.value, inputPassword.value)
                    .then(() => { this.updateView.updateHeader() })
            });
        }
        return container;
    }

}

export default LoginView;