import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";

class RegisterView extends Element {

    private controller: Controller;

    private updateView: UpdateView

    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
    }

    create() {
        const registerEl = this.createEl('div', '', 'register', null);
        this.createEl('h2', 'Register new user', 'register__title', registerEl);
        const inpustList = this.createEl('div', '', 'register__list', registerEl);

        const nameEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'name', 'login__title', nameEl);
        const inputName = this.createEl('input', '', `login__email`, nameEl) as HTMLInputElement;
        inputName.type = 'name';

        const emailEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'email', 'login__title', emailEl);
        const inputEmail = this.createEl('input', '', `login__email`, emailEl) as HTMLInputElement;
        inputEmail.type = 'email';

        const passwordEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'password', 'login__title', passwordEl);
        const inputPassword = this.createEl('input', '', `login__password`, passwordEl) as HTMLInputElement;
        inputPassword.type = 'password';

        const repeatPasEl = this.createEl('div', '', 'login__item', inpustList);
        this.createEl('p', 'password', 'login__title', repeatPasEl);
        const inputRepeatPas = this.createEl('input', '', `login__password`, repeatPasEl) as HTMLInputElement;
        inputRepeatPas.type = 'password';

        const submit = this.createEl('button', 'submit', 'register__btn', registerEl);
        const login = this.createEl('a', 'I have account', 'register__login', registerEl, `#/login`) as HTMLAnchorElement;
        submit.addEventListener('click', () => {
            this.controller.registerUser(inputName.value, inputEmail.value, inputPassword.value, inputRepeatPas.value)
                .then(() => { this.updateView.updateHeader() })
        });

        return registerEl;
    }

}

export default RegisterView;