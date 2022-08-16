import Element from "../common/Element";
import Controller from "../Controller";
import { IUserData } from "../types";

class HeaderView extends Element {

    private controller: Controller;

    constructor() {
        super();
        this.controller = new Controller();
    }

    create() {
        const headerContainer = this.createEl('div', '', 'container', null);
        const nav = this.createEl('nav', '', 'nav', headerContainer);
        this.createEl('a', 'home', 'nav__link', nav, `#/`);
        this.createEl('a', 'cart', 'nav__link', nav, `#/cart`);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (userData) {
            const profile = this.createEl('div', '', 'dropdown', nav);
            this.createEl('button', 'profile', 'dropbtn', profile);
            const profileList = this.createEl('div', '', 'dropdown-content', profile);

            this.createEl('a', `Welcome, ${(userData.name) as string}`, '', profileList);

            const userLinks = ['cart', 'account', 'favorites', 'purchase'];
            userLinks.forEach(link => {
                this.createEl('a', link, '', profileList, `#/${link}`) as HTMLAnchorElement;
            })

            const logoutLink = this.createEl('a', 'logout', '', profileList, `/`) as HTMLAnchorElement;
            logoutLink.addEventListener('click', () => { this.controller.logoutUser(); });

        } else {
            this.createEl('a', 'login', 'nav__link', nav, `#/login`) as HTMLAnchorElement;
        }

        return headerContainer;
    }
}

export default HeaderView;