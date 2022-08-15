import Element from "../../common/Element";

class AccountView extends Element {


    create(userIsAuth: boolean) {
        const accountEl = this.createEl('div', '', 'account', null);
        if (!userIsAuth) {
            const enterLink = `<a class="acoount__link" href="#/login">enter</a>`
            const registerLink = `<a class="acoount__link" href="#/register">register</a>`
            this.createEl('div', `Please ${enterLink} in your account or ${registerLink}`, 'account__warning', accountEl);
        }
        else {
            this.createEl('h2', 'My data', 'account__title', accountEl);
            const inpustList = this.createEl('div', '', 'account__list', accountEl);

            const nameEl = this.createEl('div', '', 'login__item', inpustList);
            this.createEl('p', 'change name', 'login__title', nameEl);
            const inputName = this.createEl('input', '', `login__email`, nameEl) as HTMLInputElement;
            inputName.type = 'name';

            const emailEl = this.createEl('div', '', 'login__item', inpustList);
            this.createEl('p', 'change email', 'login__title', emailEl);
            const inputEmail = this.createEl('input', '', `login__email`, emailEl) as HTMLInputElement;
            inputEmail.type = 'email';

            const curPasswordEl = this.createEl('div', '', 'login__item', inpustList);
            this.createEl('p', 'enter current password', 'login__title', curPasswordEl);
            const inputPassword = this.createEl('input', '', `login__password`, curPasswordEl) as HTMLInputElement;
            inputPassword.type = 'password';

            const newPasswordEl = this.createEl('div', '', 'login__item', inpustList);
            this.createEl('p', 'enter new password', 'login__title', newPasswordEl);
            const inputNewPassword = this.createEl('input', '', `login__password`, newPasswordEl) as HTMLInputElement;
            inputNewPassword.type = 'password';

            const repeatPasEl = this.createEl('div', '', 'login__item', inpustList);
            this.createEl('p', 'repeat new password', 'login__title', repeatPasEl);
            const inputRepeatPas = this.createEl('input', '', `login__password`, repeatPasEl) as HTMLInputElement;
            inputRepeatPas.type = 'password';

            const submit = this.createEl('button', 'submit', 'account__btn', accountEl);


        }

        return accountEl;


    }

}

export default AccountView;