import Element from "../common/Element";

class HeaderView extends Element {

    create() {
        const headerContainer = this.createEl('div', '', 'container', null);
        const nav = this.createEl('nav', '', 'nav', headerContainer);
        const linkHome = this.createEl('a', 'home', 'nav__link', nav) as HTMLAnchorElement;
        linkHome.href = `#/`;
        const linkCart = this.createEl('a', 'cart', 'nav__link', nav) as HTMLAnchorElement;
        linkCart.href = `#/cart`;


        return headerContainer;
    }
}

export default HeaderView;