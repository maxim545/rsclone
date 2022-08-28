import Element from "../../common/Element";
import Controller from "../../Controller";
import { IUserData } from "../../types";
import UpdateView from "../../Update";
import AlertsView from "../AlertsView";

class RegisterView extends Element {

    private controller: Controller;

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
            const registerEl = this.createEl('div', '', 'auth auth_register', container);
            this.createEl('h2', 'Sign up', 'auth__title', registerEl);
            this.createEl('p', 'Registration takes less than a minute but gives you full control over your orders.', 'auth__subtitle', registerEl);
            const inpustList = this.createEl('div', '', 'auth__inputs', registerEl);
            const inputsArr = ['name:Name:name', 'email:Email:email', 'password:Password:password', 'password:Confirm Password:repeatPassword'];
            const inputsValues: IUserData = {};

            inputsArr.forEach((input) => {
                const [type, name, key] = input.split(':');
                const itemEl = this.createEl('div', '', 'auth__item', inpustList);
                this.createEl('p', name, 'auth__input-title', itemEl);
                const inputEl = this.createEl('input', '', `form-control auth__input`, itemEl) as HTMLInputElement;
                inputEl.type = type;
                inputEl.placeholder = `Your working ${type}`;
                inputEl.addEventListener('change', () => {
                    inputsValues[key as keyof typeof inputsValues] = inputEl.value
                })
            })
            const submit = this.createEl('button', 'Sign up', 'btn btn-primary auth__btn', registerEl);
            this.createEl('p', `Already have an account? <a class="auth__link" href="#/login">Sign in</a>`, 'auth__info', registerEl);
            submit.addEventListener('click', () => {
                this.controller.registerUser(inputsValues)
                    .then(() => { this.updateView.updateHeader() })
            });
        }

        return container;
    }

}

export default RegisterView;