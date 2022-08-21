import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import { IProduct, IUserData } from "../types";
import monthNames from "../utils";
import UserSidebarView from "./userView/UserSidebarView";



class PurchaseView extends Element {

    private api: Api

    private controller: Controller;

    private sidebarView: UserSidebarView;

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.sidebarView = new UserSidebarView();
    }

    create() {
        const container = this.createEl('div', '', 'container_main orders', null);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        container.append(this.sidebarView.create(userData));
        (async () => {
            const ordersEl = this.createEl('div', '', 'orders__wrapper', container);
            const ordersTop = this.createEl('div', `<h2 class="orders__title">My orders</h2>`, 'orders__top', ordersEl);
            /* const sorting =  */this.createEl('div', `Sort`, 'orders__sorting', ordersTop);
            const purchases = await this.api.getPurchases(userData);
            const ordersList = this.createEl('div', '', 'tabs', ordersEl);
            purchases.forEach((item, i) => {
                const orderDate = new Date(item.updatedAt);
                const day = orderDate.getDate()
                const year = orderDate.getFullYear();
                const month = monthNames[orderDate.getMonth()];
                const orderbHeader = `
                <div class="tab__header">
                    <div class="tab__header-item tab__header-id">#${item._id.toUpperCase().slice(0, 10)}</div>
                    <div class="tab__header-item tab__header-date"><i class="bi bi-clock"></i>${month} ${day}, ${year}</div>
                    <div class="tab__header-item tab__header-tatus"></i>${item.orderStatus}</div>
                    <div class="tab__header-item tab__header-price"></i>$${String(item.price)}</div>
                </div>
                `;
                const orderItem = this.createEl('div', `
                <input class="tab__input" type="checkbox" id="tab_${i}">
                <label class="tab__label" for="tab_${i}">${orderbHeader}</label>
                `, 'tab', ordersList);
                const orderContent = this.createEl('div', '', 'tab__content', orderItem);
                const { orderItems } = item
                orderItems.forEach(product => {
                    const cartItemEl = this.createEl('div', `<img src="${product.image}" class="cart__item-img" alt="image">`, 'cart__item', orderContent);
                    const itemInfo = this.createEl('div', '', 'cart__item-info', cartItemEl);
                    this.createEl('div', product.name, 'cart__item-name', itemInfo);
                    this.createEl('div', `<span class="cart__item-name-key">Year:</span> ${product.color}`, 'cart__item-name-value', itemInfo);
                    this.createEl('div', `<span class="cart__item-name-key">Size:</span> ${product.year}`, 'cart__item-name-value', itemInfo);
                        /* const itemAmount =  */this.createEl('div', 'Amount', 'cart__item-amount', cartItemEl);
                })
            })
        })().catch(err => { console.error(err) });

        return container;
    }
}

export default PurchaseView;