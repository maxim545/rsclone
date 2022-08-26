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
                    <div class="tab__header-item"><span class="tab__header-status tab__header-status_${item.orderStatus}">${item.orderStatus}</span></div>
                    <div class="tab__header-item tab__header-price">$${String(item.price)}</div>
                </div>
                `;
                const orderItem = this.createEl('div', `
                <input class="tab__input" type="checkbox" id="tab_${i}">
                <label class="tab__label" for="tab_${i}">${orderbHeader}</label>
                `, 'tab', ordersList);
                const orderContent = this.createEl('div', '', 'tab__content', orderItem);
                const { orderItems } = item;
                let subtotal = '0';
                const shipping = orderItems.length * 5;
                orderItems.forEach(product => {
                    const cartItemEl = this.createEl('div', `<img src="${product.image}" class="cart__item-img" alt="image">`, 'cart__item order__item-product', orderContent);
                    const itemInfo = this.createEl('div', '', 'cart__row cart__row_info', cartItemEl);
                    this.createEl('div', product.name, 'cart__item-name', itemInfo);
                    this.createEl('div', `<span class=cart__item-name-key">Color:</span> ${product.color}`, 'cart__item-name-value', itemInfo);
                    this.createEl('div', `<span class="cart__item-name-key">Size:</span> ${product?.size}`, 'cart__item-name-value', itemInfo);
                    const itemPrice = this.createEl('div', '', 'cart__row cart__row_price', cartItemEl);
                    this.createEl('span', 'Price:', 'cart__item-title', itemPrice);
                    this.createEl('span', `$${product.price}`, 'cart__item-text', itemPrice);
                    const itemQuantity = this.createEl('div', '', 'cart__row cart__row_uantity', cartItemEl);
                    this.createEl('span', 'Quantity:', 'cart__item-title', itemQuantity);
                    this.createEl('span', `${product.stock}`, 'cart__item-text', itemQuantity);
                    const totalItemPrice = (Number(product.price) * Number(product.stock)).toFixed(1)
                    const itemSubtotal = this.createEl('div', '', 'cart__row cart__row_subtotal', cartItemEl);
                    this.createEl('span', 'Subtotal:', 'cart__item-title', itemSubtotal);
                    this.createEl('span', `$${totalItemPrice} `, 'cart__item-text', itemSubtotal);
                    subtotal = totalItemPrice;
                });
                const orderBottom = this.createEl('div', '', 'tab__bottom', orderContent);
                const subtotalEl = this.createEl('div', '', 'tab__bottom-item', orderBottom);
                this.createEl('span', 'Subtotal:', 'tab__bottom-item-title', subtotalEl);
                this.createEl('span', `$${subtotal}`, 'tab__bottom-item-text', subtotalEl);
                const shippingEl = this.createEl('div', '', 'tab__bottom-item', orderBottom);
                this.createEl('span', 'Shipping:', 'tab__bottom-item-title', shippingEl);
                this.createEl('span', `$${shipping}`, 'tab__bottom-item-text', shippingEl);
                const totalEl = this.createEl('div', '', 'tab__bottom-item', orderBottom);
                this.createEl('span', 'Total:', 'tab__bottom-item-title', totalEl);
                this.createEl('span', `$${Number(shipping) + Number(subtotal)}`, 'tab__bottom-item-text tab__bottom-item-text_bold', totalEl);
            })
        })().catch(err => { console.error(err) });

        return container;
    }
}

export default PurchaseView;