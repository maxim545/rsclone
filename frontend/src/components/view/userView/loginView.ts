import Element from "../../common/Element";


class LoginView extends Element {

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
        return loginEl;
    }

}

export default LoginView;