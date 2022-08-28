import Element from "../common/Element";

class PurchaseView extends Element {

    createEmptyAlert(page: string) {
        const title = `You haven't added anything to your ${page}.`;
        const shopLink = `<a class="acoount__link" href="/#">main page</a>`
        const text = `Go to the ${shopLink} and select the product you are interested in.`
        const container = this.createEl('div', '', `alert alert-warning`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

    createNotLoginAlert() {
        const title = 'You are not registred.';
        const enterLink = `<a class="acoount__link" href="#/login">sign in</a>`
        const registerLink = `<a class="acoount__link" href="#/register">register</a>`
        const text = `Please ${enterLink} in your account or ${registerLink} new account.`
        const container = this.createEl('div', '', `alert alert-warning`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

    createNotAdminAlert() {
        const title = 'You are not admin.';
        const text = `You must have administrator rights to access this page.`
        const container = this.createEl('div', '', `alert alert-danger`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

}

export default PurchaseView;