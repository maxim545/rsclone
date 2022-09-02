import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IUserData } from "../../types";
import { accData } from "../../data-lang";


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
        const wrapper = this.createEl('div', '', 'sidebar__wrapper', sidebar);
        const lang = localStorage.getItem('current-lang') as string;
        (async () => {
            const links = [
                `${accData.cart[lang as keyof typeof accData['cart']]}:#/cart`,
                `${accData.profile[lang as keyof typeof accData['profile']]}:#/account`,
                `${accData.favorite[lang as keyof typeof accData['favorite']]}:#/favorites`,
                `${accData.myorders[lang as keyof typeof accData['myorders']]}:#/purchases`,
                `${accData.signout[lang as keyof typeof accData['signout']]}:/`
            ];
            const [currentUser] = await this.api.loginUser({
                email: userData.email,
                password: userData.password
            }) as [IUserData];
            if (currentUser.role === 'admin') {
                links.unshift(
                    `${accData['all-roducts'][lang as keyof typeof accData['all-roducts']]}:#/adminpanel/products`,
                    `${accData['all-orders'][lang as keyof typeof accData['all-orders']]}:#/adminpanel/orders`,
                )
            } else if (currentUser.role === 'courier' || currentUser.role === 'manager') {
                links.unshift(`${accData['all-orders'][lang as keyof typeof accData['all-orders']]}:#/adminpanel/orders`)
            }
            const currentHash = window.location.hash;
            if (typeof userData.name === 'string' && typeof userData.surname === 'string' && typeof userData.email === 'string') {
                this.createEl('h2', `${userData.name} ${userData.surname}`, 'sidebar__user-name', wrapper);
                this.createEl('p', userData.email, 'sidebar__user-email', wrapper);
                if (currentUser.role !== 'user') {
                    this.createEl('p', (currentUser.role) as string, 'sidebar__user-role', wrapper);
                }
            }
            const linksEl = this.createEl('div', '', 'sidebar__links', wrapper);
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