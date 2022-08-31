/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-await-in-loop */
import { IWishListData, IUserData, IProduct } from "../../types";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";
import UserSidebarView from "./UserSidebarView";
import Api from "../../api";
import AlertsView from "../AlertsView";

class AccountView extends Element {

    private controller: Controller;

    private updateView: UpdateView;

    private sidebarView: UserSidebarView

    private api: Api;

    private alertView: AlertsView;

    constructor() {
        super()
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.sidebarView = new UserSidebarView();
        this.api = new Api();
        this.alertView = new AlertsView();
    }

    create() {
        const container = this.createEl('div', '', 'container_main wishlist', null);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (!userData) {
            container.append(this.alertView.createNotLoginAlert())
        }
        else {
            container.append(this.sidebarView.create(userData))
            const wrapper = this.createEl('div', '', 'wishlist__wrapper', container);
            this.createEl('h2', 'Wishlist', 'wishlist__title', wrapper);
            const wishlistItems = this.createEl('div', '', 'wishlist__list', wrapper);
            (async () => {
                const wishList = await this.api.getAllWishItems(userData) as IWishListData[];
                console.log(wishList);
                let itemsAmount = wishList.length;
                if (!itemsAmount) {
                    wrapper.innerHTML = ''
                    wrapper.append(this.alertView.createEmptyFavAlert())
                }
                for (const item of wishList) {
                    const [product, status] = await this.api.getProduct(item.productId) as [IProduct, number];
                    if (status !== 404) {
                        const itemEl = this.createEl('div', '', 'wishlit__item', wishlistItems);
                        itemEl.dataset.num = item._id;
                        const image = `<img src="http://localhost:5000${product.image}" class="wishlit__item-img" alt="image">`
                        const imageEl = this.createEl('div', image, 'wishlit__item-img-wrapper', itemEl);
                        const itemInfoEl = this.createEl('div', '', 'wishlit__item-info', itemEl);
                        const removeBtn = this.createEl('a', '<i class="bi bi-heart-fill wishlit__bi-heart-fill"></i>', 'wishlit__item-btn', imageEl);
                        removeBtn.dataset.id = item._id;
                        this.createEl('a', product.name, 'wishlit__item-name', itemInfoEl, `/#/p/${product._id}`);


                        const discPrice = (Number(product.price) - Number(product.price) * Number(product.discount) / 100);
                        const withoutDisc = Number(product.price);
                        if (Number(product.discount)) {
                            this.createEl('div', `-${product.discount}%`, 'wishlit__item-discount', imageEl);
                            const discWrapperEl = this.createEl('div', '', 'wishlit__item-discount-wrapper', itemInfoEl);
                            this.createEl('div', `$${discPrice.toFixed(1)}`, 'wishlit__item-price wishlit__item-price_orange', discWrapperEl);
                            this.createEl('div', `$${withoutDisc.toFixed(1)}`, 'wishlit__item-price wishlit__item-price_gray', discWrapperEl);
                        } else {
                            this.createEl('div', `$${discPrice.toFixed(1)}`, 'wishlit__item-price wishlit__item-price_bold', itemInfoEl);
                        }


                        removeBtn.addEventListener('click', (e) => {
                            this.api.removeWishItem(userData, (item._id) as string).then(() => {
                                itemsAmount -= 1
                                if (!itemsAmount) {
                                    wrapper.innerHTML = ''
                                    wrapper.append(this.alertView.createEmptyFavAlert())
                                }
                                this.updateView.updateWishlistNum();
                                e.preventDefault();
                                const currentId = removeBtn.dataset.id;
                                const currentEl = document.querySelector(`div[data-num="${(currentId) as string}"]`);
                                if (currentEl) {
                                    wishlistItems.removeChild(currentEl);
                                }
                            });
                        })
                    }
                }
            })()
        }
        return container;
    }
}

export default AccountView;