import Element from "../common/Element";

class PurchaseView extends Element {

    createStaticAlert(title: string, text: string, type = 'danger') {
        const container = this.createEl('div', '', `alert alert-${type}`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

}

export default PurchaseView;