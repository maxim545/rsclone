import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import { IOrders, IProduct, IUserData } from "../types";
import { monthNamesEn, monthNamesRu } from "../utils";
import UserSidebarView from "./userView/UserSidebarView";
import AlertsView from "./AlertsView";
import { orderLang, cartLang } from "../data-lang";


class PurchaseView extends Element {

    private api: Api

    private controller: Controller;

    private sidebarView: UserSidebarView;

    private alertView: AlertsView;

    private lang: string;

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.sidebarView = new UserSidebarView();
        this.alertView = new AlertsView();
        this.lang = localStorage.getItem('current-lang') as string;
    }

    create() {
        const container = this.createEl('div', '', 'orders', null);
        document.title = orderLang.title[this.lang as keyof typeof orderLang['title']];
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        if (!userData) {
            container.append(this.alertView.createNotLoginAlert())
        } else {
            (async () => {
                container.append(this.sidebarView.create(userData));
                const ordersEl = this.createEl('div', '', 'orders__wrapper', container);
                const ordersTop = this.createEl('div', `<h2 class="orders__title">${orderLang.title[this.lang as keyof typeof orderLang['title']]}</h2>`, 'orders__top', ordersEl);
                ordersTop.append(this.createSorting())
                const purchases = await this.api.getPurchases(userData);
                if (localStorage.getItem('userSortParameters')) {
                    this.sortOrders(purchases);
                }
                const ordersList = this.createEl('div', '', 'tabs', ordersEl);
                purchases.forEach((item, i) => {
                    const orderDate = new Date(item.createdAt);
                    const day = orderDate.getDate()
                    const year = orderDate.getFullYear();
                    const monthLang = {
                        eng: monthNamesEn[orderDate.getMonth()],
                        ru: monthNamesRu[orderDate.getMonth()],
                    }
                    const month = monthLang[this.lang as keyof typeof monthLang]

                    const statusObj = {
                        "processing": 'В обработке',
                        "progressing": 'Собирается',
                        "in-delivery": 'В доставке',
                        "delivered": 'Доставлен',
                        "canceled": 'Отказ',
                    }

                    let statusLang
                    if (this.lang === 'eng') {
                        statusLang = item.orderStatus;
                    } else {
                        statusLang = statusObj[item.orderStatus as keyof typeof statusObj];
                    }


                    const orderbHeader = `
                    <div class="tab__header">
                        <div class="tab__header-item tab__header-id">#${item._id.toUpperCase().slice(0, 10)}</div>
                        <div class="tab__header-item tab__header-date"><i class="bi bi-clock"></i>${month} ${day}, ${year}</div>
                        <div class="tab__header-item"><span class="tab__header-status tab__header-status_${item.orderStatus}">${statusLang}</span></div>
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
                    orderItems.forEach((product) => {
                        /* const [currentProduct, status] = await this.api.getProduct(product._id) as [IProduct, number]; */

                        const cartItemEl = this.createEl('div', `<img src="http://localhost:5000${product.image}" class="cart__item-img" alt="image">`, 'cart__item order__item-product', orderContent);
                        const itemInfo = this.createEl('div', '', 'cart__row cart__row_info', cartItemEl);

                        const name = {
                            eng: product.name.split(':')[0],
                            ru: product.name.split(':')[1],
                        }

                        this.createEl('div', name[this.lang as keyof typeof name], 'cart__item-name', itemInfo);
                        this.createEl('div', `<span class=cart__item-name-key">${cartLang['cart-color'][this.lang as keyof typeof cartLang['cart-color']]}</span> ${product.color}`, 'cart__item-name-value', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">${cartLang['cart-size'][this.lang as keyof typeof cartLang['cart-size']]}:</span> ${product?.size}`, 'cart__item-name-value', itemInfo);
                        const itemPrice = this.createEl('div', '', 'cart__row cart__row_price', cartItemEl);

                        const discPrice = (Number(product.price) - Number(product.price) * Number(product.discount) / 100);
                        const withoutDisc = Number(product.price);
                        this.createEl('div', `${cartLang['cart-price'][this.lang as keyof typeof cartLang['cart-price']]}:`, 'cart__item-title', itemPrice);
                        const prices = this.createEl('div', ``, 'cart__item-text', itemPrice);
                        if (Number(product.discount)) {
                            this.createEl('span', `$${discPrice.toFixed(1)}`, 'order__item-price_orange', prices);
                            this.createEl('span', `$${withoutDisc.toFixed(1)}`, 'order__item-price_grey', prices);
                        } else {
                            this.createEl('span', `$${discPrice.toFixed(1)}`, 'order__item-price_black', prices);
                        }

                        const itemQuantity = this.createEl('div', '', 'cart__row cart__row_uantity', cartItemEl);
                        this.createEl('span', `${cartLang['cart-quan'][this.lang as keyof typeof cartLang['cart-quan']]}:`, 'cart__item-title', itemQuantity);
                        this.createEl('span', `${product.stock}`, 'cart__item-text', itemQuantity);
                        const totalItemPrice = (Number(discPrice) * Number(product.stock)).toFixed(1)
                        const itemSubtotal = this.createEl('div', '', 'cart__row cart__row_subtotal', cartItemEl);
                        this.createEl('span', cartLang['cart-subtotal'][this.lang as keyof typeof cartLang['cart-subtotal']], 'cart__item-title', itemSubtotal);
                        this.createEl('span', `$${totalItemPrice} `, 'cart__item-text', itemSubtotal);
                        subtotal += Number(totalItemPrice);
                    });
                    const orderBottom = this.createEl('div', '', 'tab__bottom', orderContent);
                    const subtotalEl = this.createEl('div', '', 'tab__bottom-item', orderBottom);
                    this.createEl('span', `${cartLang['cart-subtotal'][this.lang as keyof typeof cartLang['cart-subtotal']]}:`, 'tab__bottom-item-title', subtotalEl);
                    this.createEl('span', `$${subtotal}`, 'tab__bottom-item-text', subtotalEl);
                    const shippingEl = this.createEl('div', '', 'tab__bottom-item', orderBottom);
                    this.createEl('span', `${cartLang['cart-shipping'][this.lang as keyof typeof cartLang['cart-shipping']]}:`, 'tab__bottom-item-title', shippingEl);
                    this.createEl('span', `$${shipping}`, 'tab__bottom-item-text', shippingEl);
                    const totalEl = this.createEl('div', '', 'tab__bottom-item', orderBottom);
                    this.createEl('span', `${cartLang['cart-total'][this.lang as keyof typeof cartLang['cart-total']]}:`, 'tab__bottom-item-title', totalEl);
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
            dateDesc: `${orderLang.ddate[this.lang as keyof typeof orderLang['ddate']]}`,
            dateAsc: `${orderLang.adate[this.lang as keyof typeof orderLang['adate']]}`,
            priceDesc: `${orderLang.dprice[this.lang as keyof typeof orderLang['dprice']]}`,
            priceAsc: `${orderLang.aprice[this.lang as keyof typeof orderLang['aprice']]}`,
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
            data.sort((a, b) => (new Date(b.createdAt) < new Date(a.createdAt) ? -1 : 1));
        }
        if (sortParams === 'dateAsc') {
            data.sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt) ? -1 : 1));
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