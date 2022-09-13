import Element from "../../common/Element";
import Controller from "../../Controller";
import { IUserData } from "../../types";
import UpdateView from "../../Update";
import UserSidebarView from "./UserSidebarView";
import AlertsView from "../AlertsView";
import { accData } from "../../data-lang";

class AccountView extends Element {

    private controller: Controller;

    private updateView: UpdateView;

    private sidebarView: UserSidebarView

    private alertView: AlertsView;


    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.sidebarView = new UserSidebarView();
        this.alertView = new AlertsView();
    }

    create() {
        const container = this.createEl('div', '', 'container_main account', null);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const lang = localStorage.getItem('current-lang') as string;
        document.title = accData['acc-page-title'][lang as keyof typeof accData['acc-page-title']];
        if (!userData) {
            container.append(this.alertView.createNotLoginAlert())
        }
        else {
            container.append(this.sidebarView.create(userData))
            const accountEl = this.createEl('div', '', 'account__wrapper', container);
            this.createEl('h2', accData['acc-page-title'][lang as keyof typeof accData['acc-page-title']], 'account__title', accountEl);
            const inpustList = this.createEl('form', '', 'account__inputs-list', accountEl);
            const inputs = [
                `name:text:${accData.name[lang as keyof typeof accData['name']]}`,
                `surname:text:${accData.surname[lang as keyof typeof accData['surname']]}`,
                `thirdname:text:${accData.thirdname[lang as keyof typeof accData['thirdname']]}`,
                `email:email:${accData.email[lang as keyof typeof accData['email']]}`,
                `password:password:${accData.password[lang as keyof typeof accData['password']]}`,
                `repeatPassword:password:${accData.repPassword[lang as keyof typeof accData['repPassword']]}`,
                `phone:tel:${accData.phone[lang as keyof typeof accData['phone']]}`,
                `adress:text:${accData.adress[lang as keyof typeof accData['adress']]}`]
            const unputsValues: IUserData = {}
            inputs.forEach(item => {
                const [name, type, title] = item.split(':');
                const inputContainer = this.createEl('div', '', 'account__inputs-item', inpustList);
                this.createEl('p', title, 'account__inputs-title', inputContainer);
                const input = this.createEl('input', '', 'form-control account__input', inputContainer) as HTMLInputElement;
                input.type = type;
                input.addEventListener('change', () => { unputsValues[name as keyof typeof unputsValues] = input.value })
                if (userData[name as keyof typeof userData] !== undefined && type !== 'password') {
                    const currentValue = userData[name as keyof typeof userData] as string;
                    input.value = currentValue;
                    unputsValues[name as keyof typeof unputsValues] = input.value;
                } else if (userData[name as keyof typeof userData] !== undefined && type === 'password') {
                    unputsValues[name as keyof typeof unputsValues] = input.value;
                }
            })
            const inps = inpustList.querySelectorAll<HTMLInputElement>(`input.form-control.account__input`);
            for (const inp of inps) {
                inp.required = true;
            }
            const tel = inpustList.querySelector(`[type="tel"]`) as HTMLInputElement;
            tel.pattern = "[+]{1}[0-9]{8,15}";
            const submit = this.createEl('button', accData.btn[lang as keyof typeof accData['btn']], 'btn btn-primary auth__btn', inpustList) as HTMLButtonElement;
            submit.type = `submit`;
            inpustList?.addEventListener('submit', (e) => {
                e.preventDefault();
                this.controller.changeUserData(unputsValues)
                    .then(() => {
                        this.updateView.updateHeader();
                        const main = document.querySelector('.main') as HTMLElement;
                        main.innerHTML = '';
                        main.append(this.create());
                    })
            });
        }

        return container;


    }

}

export default AccountView;