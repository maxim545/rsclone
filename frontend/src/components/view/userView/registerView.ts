import Element from "../../common/Element";
import Controller from "../../Controller";
import { IUserData } from "../../types";
import UpdateView from "../../Update";
import AlertsView from "../AlertsView";
import langData from "../../data-lang";

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
        const lang = localStorage.getItem('current-lang') as string;
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const container = this.createEl('div', '', 'container_main', null);
        document.title = langData['reg-page-title'][lang as keyof typeof langData['reg-page-title']];
        if (userData) {
            container.append(this.alertView.createLoginAlert())
        } else {
            const registerEl = this.createEl('div', '', 'auth auth_register', container);
            this.createEl('h2', langData['reg-title'][lang as keyof typeof langData['reg-title']], 'auth__title', registerEl);
            this.createEl('p', langData['reg-subtitle'][lang as keyof typeof langData['reg-subtitle']], 'auth__subtitle', registerEl);
            const inpustList = this.createEl('div', '', 'auth__inputs', registerEl);


            const itemName = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', langData['reg-name'][lang as keyof typeof langData['reg-name']], 'auth__input-title', itemName);
            const inputName = this.createEl('input', '', `form-control auth__input`, itemName) as HTMLInputElement;
            inputName.type = 'text';

            const itemEmail = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', langData['reg-email'][lang as keyof typeof langData['reg-email']], 'auth__input-title', itemEmail);
            const inputEmail = this.createEl('input', '', `form-control auth__input`, itemEmail) as HTMLInputElement;
            inputEmail.type = 'email';


            const itemPassword = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', langData['reg-password'][lang as keyof typeof langData['reg-password']], 'auth__input-title', itemPassword);
            const inputPassword = this.createEl('input', '', `form-control auth__input`, itemPassword) as HTMLInputElement;
            inputPassword.type = 'password';


            const itemRepPassword = this.createEl('div', '', 'auth__item', inpustList);
            this.createEl('p', langData['reg-repPassword'][lang as keyof typeof langData['reg-repPassword']], 'auth__input-title', itemRepPassword);
            const inputRepPassword = this.createEl('input', '', `form-control auth__input`, itemRepPassword) as HTMLInputElement;
            inputRepPassword.type = 'password';


            const submit = this.createEl('button', langData['reg-title'][lang as keyof typeof langData['reg-title']], 'btn btn-primary auth__btn', registerEl);
            this.createEl('p', langData['reg-register'][lang as keyof typeof langData['reg-register']], 'auth__info', registerEl);
            submit.addEventListener('click', () => {
                this.controller.registerUser({
                    name: inputName.value,
                    email: inputEmail.value,
                    password: inputPassword.value,
                    repeatPassword: inputRepPassword.value,
                }).then(() => { this.updateView.updateHeader() })
            });
        }
        return container;
    }

}

export default RegisterView;