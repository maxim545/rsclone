/* eslint-disable no-await-in-loop */
import { IWishListData, IUserData, IProduct } from "../../types";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";
import UserSidebarView from "./UserSidebarView";
import Api from "../../api";

class AccountView extends Element {

    private controller: Controller;

    private updateView: UpdateView;

    private sidebarView: UserSidebarView

    private api: Api;

    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.sidebarView = new UserSidebarView();
        this.api = new Api();
    }

    create() {
        const container = this.createEl('div', '', 'container_main wishlist', null);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (!userData) {
            const enterLink = `<a class="acoount__link" href="#/login">enter</a>`
            const registerLink = `<a class="acoount__link" href="#/register">register</a>`
            this.createEl('div', `Please ${enterLink} in your account or ${registerLink}`, 'account__warning', container);
        }
        else {
            container.append(this.sidebarView.create(userData))
            const wishlistEl = this.createEl('h2', '', 'wishlist__wrapper', container);
            this.createEl('div', 'Wish list', 'wishlist__title', wishlistEl);
            (async () => {
                const wishList = await this.api.getAllWishItems(userData) as IWishListData[];
                for (const item of wishList) {
                    const product = await this.api.getProduct(item.productId) as IProduct;
                    const itemEl = this.createEl('div', '', 'item', wishlistEl);
                    this.createEl('a', product.name, 'item__name', itemEl, `/#/p/${product._id}`);
                    const image = `<img src="${product.image}" class="img-thumbnail" alt="image">`
                    this.createEl('div', image, 'image-container', itemEl)
                    this.createEl('div', product.year, 'item__year', itemEl);
                }
            })()
        }

        return container;


    }

}

export default AccountView;