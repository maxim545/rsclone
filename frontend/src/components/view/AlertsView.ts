import Element from "../common/Element";
import { alertsData } from "../data-lang";

class AlertsView extends Element {

    private lang: string;

    constructor() {
        super()
        this.lang = localStorage.getItem('current-lang') as string;
    }

    createEmptyFavAlert() {
        const title = alertsData['fav-title'][this.lang as keyof typeof alertsData['fav-title']];
        const text = alertsData['fav-text'][this.lang as keyof typeof alertsData['fav-text']];
        const container = this.createEl('div', '', `alert alert-warning`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

    createEmptyCartAlert() {
        const title = alertsData['wl-title'][this.lang as keyof typeof alertsData['wl-title']];
        const text = alertsData['wl-text'][this.lang as keyof typeof alertsData['wl-text']];
        const container = this.createEl('div', '', `alert alert-warning`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

    createNotLoginAlert() {
        const title = alertsData['not-login-title'][this.lang as keyof typeof alertsData['not-login-title']];
        const text = alertsData['not-login-text'][this.lang as keyof typeof alertsData['not-login-text']];
        const container = this.createEl('div', '', `alert alert-warning`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

    createLoginAlert() {
        const title = alertsData['login-title'][this.lang as keyof typeof alertsData['login-title']];
        const text = alertsData['login-text'][this.lang as keyof typeof alertsData['login-text']];
        const container = this.createEl('div', '', `alert alert-warning`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

    createNotAdminAlert() {
        const title = alertsData['admin-title'][this.lang as keyof typeof alertsData['admin-title']];
        const text = alertsData['admin-text'][this.lang as keyof typeof alertsData['admin-text']];
        const container = this.createEl('div', '', `alert alert-danger`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container
    }

    create() {
        const title = alertsData['404-title'][this.lang as keyof typeof alertsData['404-title']];
        const text = alertsData['404-text'][this.lang as keyof typeof alertsData['404-text']];
        const container = this.createEl('div', '', `alert alert-danger`, null);
        this.createEl('h4', title, 'alert-heading', container);
        this.createEl('p', text, 'alert-text', container);
        return container;
    }

}

export default AlertsView;