import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import { IOrders, IProduct, IUserData } from "../types";
import monthNames from "../utils";
import UserSidebarView from "./userView/UserSidebarView";
import AlertsView from "./AlertsView";


class PurchaseView extends Element {

    private api: Api

    private controller: Controller;

    private sidebarView: UserSidebarView;

    private alertView: AlertsView;

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.sidebarView = new UserSidebarView();
        this.alertView = new AlertsView();
    }

    create() {
        const container = this.createEl('div', '', 'orders', null);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (!userData) {
            container.append(this.alertView.createNotLoginAlert())
        } else {
            (async () => {
                container.append(this.sidebarView.create(userData));
                const ordersEl = this.createEl('div', '', 'orders__wrapper', container);
                const ordersTop = this.createEl('div', `<h2 class="orders__title">My orders</h2>`, 'orders__top', ordersEl);
                ordersTop.append(this.createSorting())
                const purchases = await this.api.getPurchases(userData);
                if (localStorage.getItem('userSortParameters')) {
                    this.sortOrders(purchases);
                }
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
                    let subtotal = 0;
                    const shipping = orderItems.length * 5;
                    orderItems.forEach(product => {
                        const cartItemEl = this.createEl('div', `<img src="${product.image}" class="cart__item-img" alt="image">`, 'cart__item order__item-product', orderContent);
                        const itemInfo = this.createEl('div', '', 'cart__row cart__row_info', cartItemEl);
                        this.createEl('div', product.name, 'cart__item-name', itemInfo);
                        this.createEl('div', `<span class=cart__item-name-key">Color:</span> ${product.color}`, 'cart__item-name-value', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">Size:</span> ${product?.size}`, 'cart__item-name-value', itemInfo);
                        const itemPrice = this.createEl('div', '', 'cart__row cart__row_price', cartItemEl);

                        const discPrice = (Number(product.price) - Number(product.price) * Number(product.discount) / 100);
                        const withoutDisc = Number(product.price);
                        this.createEl('div', 'Price:', 'cart__item-title', itemPrice);
                        const prices = this.createEl('div', ``, 'cart__item-text', itemPrice);
                        if (Number(product.discount)) {
                            this.createEl('span', `$${discPrice.toFixed(1)}`, 'order__item-price_orange', prices);
                            this.createEl('span', `$${withoutDisc.toFixed(1)}`, 'order__item-price_grey', prices);
                        } else {
                            this.createEl('span', `$${discPrice.toFixed(1)}`, 'order__item-price_black', prices);
                        }

                        const itemQuantity = this.createEl('div', '', 'cart__row cart__row_uantity', cartItemEl);
                        this.createEl('span', 'Quantity:', 'cart__item-title', itemQuantity);
                        this.createEl('span', `${product.stock}`, 'cart__item-text', itemQuantity);
                        const totalItemPrice = (Number(discPrice) * Number(product.stock)).toFixed(1)
                        const itemSubtotal = this.createEl('div', '', 'cart__row cart__row_subtotal', cartItemEl);
                        this.createEl('span', 'Subtotal:', 'cart__item-title', itemSubtotal);
                        this.createEl('span', `$${totalItemPrice} `, 'cart__item-text', itemSubtotal);
                        subtotal += Number(totalItemPrice);
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
        }


        return container;
    }

    createSorting() {
        const main = document.querySelector('.main') as HTMLElement;
        const sortEl = this.createEl('div', '', 'orders__sorting', null);
        const selectEl = this.createEl('select', '', 'form-select orders__select', sortEl) as HTMLSelectElement;
        const optionsElements = ['dateDesc', 'dateAsc', 'priceDesc', 'priceAsc'];
        const sortNames: Record<string, string> = {
            dateDesc: 'Date descending &uarr;',
            dateAsc: 'Date ascending &darr;',
            priceDesc: 'Price descending &uarr;',
            priceAsc: 'Price ascending &darr;',
        };
        optionsElements.forEach(el => {
            const optionEl = this.createEl('option', sortNames[el], 'orders__option', selectEl) as HTMLOptionElement;
            optionEl.value = el;
            if (el === localStorage.getItem('userSortParameters')) { optionEl.selected = true; }
        });
        selectEl.addEventListener('change', () => {
            localStorage.setItem('userSortParameters', selectEl.value);
            if (main) {
                main.innerHTML = '';
                main.append(this.create())
            }
        });
        return sortEl
    }

    sortOrders(data: IOrders[]) {
        const sortParams = localStorage.getItem('userSortParameters');
        if (sortParams === 'dateDesc') {
            data.sort((a, b) => (new Date(b.updatedAt) < new Date(a.updatedAt) ? -1 : 1));
        }
        if (sortParams === 'dateAsc') {
            data.sort((a, b) => (new Date(a.updatedAt) < new Date(b.updatedAt) ? -1 : 1));
        }
        if (sortParams === 'priceDesc') {
            data.sort((a, b) => (b.price > a.price ? -1 : 1));
        }
        if (sortParams === 'priceAsc') {
            data.sort((a, b) => (b.price < a.price ? -1 : 1));
        }
        return data;
    }
}

export default PurchaseView;