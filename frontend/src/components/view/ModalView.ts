import Element from "../common/Element";
import { modalLang } from "../data-lang";


class ModalView extends Element {

    /*    private lang: string;
   
       constructor() {
           super();
           this.lang = localStorage.getItem('current-lang') as string;
       } */

    create(text: string/* , time = 2000 */) {
        const lang = localStorage.getItem('current-lang') as string;
        const { body } = document;
        const modalEl = this.createEl('div', '', 'modal', null);
        const modalInner = this.createEl('div', '', 'modal__inner', modalEl);
        const modalText = this.createEl('div', text, 'modal__text', modalInner);
        const btn = this.createEl('button', modalLang.btn[lang as keyof typeof modalLang['btn']], 'btn btn-primary modal__btn', modalText);
        btn.addEventListener('click', () => {
            body.removeChild(modalEl);
        })
        body.append(modalEl)
        return modalEl;
    }

}

export default ModalView;