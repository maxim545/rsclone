import Element from "../common/Element";
import Controller from "../Controller";

class HeaderView extends Element {

    private controller: Controller;

    constructor() {
        super();
        this.controller = new Controller();
    }

    create() {
        const headerContainer = this.createEl('div', '', 'container', null);
        const nav = this.createEl('nav', '', 'nav', headerContainer);
        const linkHome = this.createEl('a', 'home', 'nav__link', nav, `#/`) as HTMLAnchorElement;
        const linkCart = this.createEl('a', 'cart', 'nav__link', nav, `#/cart`) as HTMLAnchorElement;
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData) {
            const profile = this.createEl('div', '', 'dropdown', nav);
            this.createEl('button', 'profile', 'dropbtn', profile);
            const profileList = this.createEl('div', '', 'dropdown-content', profile);

            this.createEl('a', `Welcome, ${userData.name}`, '', profileList);

            const userLinks = ['cart', 'account', 'favorites', 'purchase'];
            userLinks.forEach(link => {
                const linkEL = this.createEl('a', link, '', profileList, `#/${link}`) as HTMLAnchorElement;
            })

            const logoutLink = this.createEl('a', 'logout', '', profileList, `/`) as HTMLAnchorElement;
            logoutLink.addEventListener('click', () => { this.controller.logoutUser(); });

        } else {
            const linkLogin = this.createEl('a', 'login', 'nav__link', nav, `#/login`) as HTMLAnchorElement;
        }

        return headerContainer;
    }
}

export default HeaderView;