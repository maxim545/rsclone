import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IRegister, IUserData } from "../../types";

class UserSidebarView extends Element {


    private controller: Controller;

    private api: Api;

    constructor() {
        super();
        this.controller = new Controller();
        this.api = new Api();
    }


    create(userData: IUserData) {
        const sidebar = this.createEl('div', '', 'sidebar', null);
        (async () => {
            const links = ['Cart:#/cart', 'My profile:#/account', 'Favorites:#/favorites', 'My orders:#/purchases', 'Sign out:/'];
            const [currentUser] = await this.api.loginUser({
                email: userData.email,
                password: userData.password
            });
            if (currentUser.role === 'admin') {
                links.unshift('All products:#/adminpanel/products', 'All orders:#/adminpanel/orders')
            }
            const currentHash = window.location.hash;
            if (userData.name && userData.surname && userData.email) {
                this.createEl('h2', `${userData.name} ${userData.surname}`, 'sidebar__user-name', sidebar);
                this.createEl('p', userData.email, 'sidebar__user-email', sidebar);
            }
            const linksEl = this.createEl('div', '', 'sidebar__links', sidebar);
            links.forEach(link => {
                const [name, hash] = link.split(':');
                const linkEl = this.createEl('a', `${name}`, `sidebar__link`, linksEl, hash);
                if (currentHash === hash) { linkEl.classList.add('sidebar__link_active') }
                if (name === 'Sign out') {
                    linkEl.addEventListener('click', () => { this.controller.logoutUser(); })
                }
            });
        })()

        return sidebar;
    }

}

export default UserSidebarView;