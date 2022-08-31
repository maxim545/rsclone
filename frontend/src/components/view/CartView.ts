/* eslint-disable @typescript-eslint/no-loop-func */
/* eslint-disable no-restricted-syntax */
import { ICartProduct, IOrderData, IProduct, IUserData } from "../types";
import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import UpdateView from "../Update";
import AlertsView from "./AlertsView";
import { cartLang } from "../data-lang";

class CartView extends Element {

    private api: Api;

    private controller: Controller;

    private updateView: UpdateView;

    private alertView: AlertsView;

    private lang: string;

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.alertView = new AlertsView();
        this.lang = localStorage.getItem('current-lang') as string;
    }

    create() {
        const main = document.querySelector('.main') as HTMLElement;
        document.title = cartLang['cart-title'][this.lang as keyof typeof cartLang['cart-title']];
        const container = this.createEl('div', '', 'container_main cart', null);
        const cartEl = this.createEl('div', '', 'cart__content', container);
        const cartsItems = <ICartProduct[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const orderData: IOrderData = {
            orderItems: [],
        };
        if (cartsItems && cartsItems.length) {
            this.createEl('h2', cartLang['cart-title'][this.lang as keyof typeof cartLang['cart-title']], 'cart__title', cartEl);
            (async () => {
                const [inpustList, unputsValues] = this.createInputs() as [HTMLElement, IUserData];
                const cartListEl = this.createEl('div', '', 'cart__list', cartEl);
                this.createEl('h3', cartLang['cart-items'][this.lang as keyof typeof cartLang['cart-items']], 'cart__list-title', cartListEl);
                const cartItemsEl = this.createEl('div', '', 'cart__items', cartListEl);
                let totalPrice = 0;
                for await (const item of cartsItems) {
                    orderData.status = 'processing';
                    orderData.orderItems.push(item);
                    const [productDB, status] = await this.api.getProduct(item._id) as [IProduct, number];
                    if (item && status !== 404) {
                        const prodSizes = productDB.variant.split(',');
                        const curSizeIndex = prodSizes.findIndex(el => el.split(':')[0].trim() === item.size);
                        const maxStockValue = prodSizes[curSizeIndex].split(':')[1].trim();
                        const cartItemEl = this.createEl('div', `<img src="http://localhost:5000${item.image}" class="cart__item-img" alt="image">`, 'cart__item', cartItemsEl);
                        const itemInfo = this.createEl('div', '', 'cart__item-info', cartItemEl);

                        const name = {
                            eng: item.name.split(':')[0],
                            ru: item.name.split(':')[1],
                        }

                        this.createEl('div', name[this.lang as keyof typeof name], 'cart__item-name', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">Color:</span> ${item.color}`, 'cart__item-name-value', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">Size:</span> ${item.size}`, 'cart__item-name-value', itemInfo);
                        const itemAmount = this.createEl('div', '', 'cart__item-amount', cartItemEl);
                        const inputAmount = this.createEl('input', '', 'cart__item-input', itemAmount) as HTMLInputElement;
                        inputAmount.type = 'number';
                        inputAmount.value = item.stock > maxStockValue ? maxStockValue : item.stock;
                        inputAmount.min = '1';
                        inputAmount.max = maxStockValue;

                        const sumPrice = item.price;
                        const discPrice = ((Number(sumPrice) - Number(sumPrice) * Number(item.discount) / 100) * Number(item.stock));
                        const withoutDisc = Number(item.price) * Number(item.stock)
                        totalPrice += discPrice;
                        const priceEl = this.createEl('div', ``, 'cart__item-price', cartItemEl);
                        if (Number(item.discount)) {
                            this.createEl('span', `$${discPrice.toFixed(1)}`, 'cart__item-price_orange', priceEl);
                            this.createEl('span', `$${withoutDisc.toFixed(1)}`, 'cart__item-price_grey', priceEl);
                        } else {
                            this.createEl('span', `$${withoutDisc.toFixed(1)}`, 'cart__item-price_black', priceEl);
                        }

                        inputAmount.addEventListener('change', () => {
                            item.stock = inputAmount.value;
                            const finallyPrice = this.updateCartPrice(cartsItems, priceEl, item.discount, item.stock, item.price);
                            orderData.price = Number(finallyPrice.toFixed(1));
                        });


                        const removeBtn = this.createEl('button', cartLang['cart-delete'][this.lang as keyof typeof cartLang['cart-delete']], 'btn btn-primary cart__item-btn', cartItemEl);
                        removeBtn.addEventListener('click', (e) => {
                            const target = e.target as HTMLElement;
                            this.controller.removeFromCart(cartsItems, item._id)
                            if (target.parentElement instanceof HTMLElement) {
                                cartItemsEl.removeChild(target.parentElement);
                            }
                            this.updateCartPrice(cartsItems, priceEl);
                            if (!cartsItems.length) {
                                main.innerHTML = '';
                                main.append(this.alertView.createEmptyCartAlert())
                            }
                        });
                    }
                }
                const itemsAmount = orderData.orderItems.length;
                const [sidebar, finallyPrice] = this.createSideBar(container, totalPrice, itemsAmount) as [HTMLElement, number];
                orderData.price = finallyPrice;
                this.createEl('div', `${cartLang['cart-subtotal'][this.lang as keyof typeof cartLang['cart-subtotal']]}: $${totalPrice.toFixed(1)}`, 'cart__subtotal', cartListEl);

                cartEl.append(inpustList)
                if (itemsAmount) {
                    this.addOrder(sidebar, orderData, userData, unputsValues)
                }
            })().catch(err => { console.error(err) });
        } else {
            main.append(this.alertView.createEmptyCartAlert())
        }
        return container;
    }


    createInputs() {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const shippingList = this.createEl('div', '', 'shipping__list', null);
        this.createEl('h2', cartLang['cart-ship'][this.lang as keyof typeof cartLang['cart-ship']], 'cart__list-title', shippingList);
        const inpustListEl = this.createEl('div', '', 'account__inputs-list', shippingList);
        const inputs = [
            `name:text:${cartLang['cart-name'][this.lang as keyof typeof cartLang['cart-name']]}`,
            `email:email:${cartLang['cart-email'][this.lang as keyof typeof cartLang['cart-email']]}`,
            `surname:text:${cartLang['cart-surname'][this.lang as keyof typeof cartLang['cart-surname']]}`,
            `thirdname:text:${cartLang['cart-thirdname'][this.lang as keyof typeof cartLang['cart-thirdname']]}`,
            `phone:text:${cartLang['cart-phone'][this.lang as keyof typeof cartLang['cart-phone']]}`,
            `adress:text:${cartLang['cart-adress'][this.lang as keyof typeof cartLang['cart-adress']]}`
        ];
        if (!userData) { inputs.push(`password:password`, `repeatPassword:password`) }
        const unputsValues: IUserData = {}
        inputs.forEach(item => {
            const [name, type, title] = item.split(':');
            const inputContainer = this.createEl('div', '', 'account__inputs-item', inpustListEl);
            this.createEl('p', title, 'account__inputs-title', inputContainer);
            const input = this.createEl('input', '', 'form-control account__input', inputContainer) as HTMLInputElement;
            input.type = type;
            input.addEventListener('change', () => { unputsValues[name as keyof typeof unputsValues] = input.value })
            if (userData && userData[name as keyof typeof userData] !== undefined) {
                const currentValue = userData[name as keyof typeof userData] as string;
                input.value = currentValue;
                unputsValues[name as keyof typeof unputsValues] = input.value;
            }
        })
        return [shippingList, unputsValues];
    }


    createSideBar(container: HTMLElement, price: number, itemsAmount: number) {
        const sidebar = this.createEl('div', '', 'cart__sidebar', container);
        const wrapperEl = this.createEl('div', `<h2 class="cart__sidebar-title">${cartLang['cart-total'][this.lang as keyof typeof cartLang['cart-total']]}</h2>`, 'cart__sidebar-wrapper', sidebar);
        const itemsListEl = this.createEl('div', '', 'cart__sidebar-list', wrapperEl);
        const shippingPrice = itemsAmount * 5;
        const finallyPrice = price + shippingPrice
        this.createEl('div', `<div class="cart__sidebar-price cart__sidebar-price_title">${cartLang['cart-subtotal'][this.lang as keyof typeof cartLang['cart-subtotal']]}:</div>
        <div class="cart__sidebar-price cart__sidebar-price_value">$${price.toFixed(1)}</div>`, 'cart__sidebar-item', itemsListEl);
        this.createEl('div', `<div class="cart__sidebar-price">${cartLang['cart-shipping'][this.lang as keyof typeof cartLang['cart-shipping']]}:</div>
        <div class="cart__sidebar-price cart__sidebar-price_shipping">$${shippingPrice}</div>`, 'cart__sidebar-item', itemsListEl);
        this.createEl('div', `<div class="cart__sidebar-price cart__sidebar-price_title">${cartLang['cart-total'][this.lang as keyof typeof cartLang['cart-total']]}:</div>
        <div class="cart__sidebar-price cart__sidebar-price_bold">$${finallyPrice.toFixed(1)}</div>`, 'cart__sidebar-item cart__sidebar-item_bold', wrapperEl);
        return [sidebar, finallyPrice];
    }

    addOrder(sidebar: HTMLElement, orderData: IOrderData, userData: IUserData, unputsValues: IUserData) {
        const orderBtn = this.createEl('button', cartLang['cart-btn'][this.lang as keyof typeof cartLang['cart-btn']], 'btn btn-primary auth__btn', sidebar);
        orderBtn.addEventListener('click', () => {
            if (userData) {
                this.controller.makeOrder(orderData).then(() => {
                    this.updateView.updateCart();
                })
            } else {
                this.controller.registerUser(unputsValues)
                    .then(() => {
                        this.controller.makeOrder(orderData);
                        this.updateView.updateHeader();
                    })
            }
        });
    }

    updateCartPrice(cartsItems: ICartProduct[], priceEl: HTMLElement, discount = '', stock = '', price = '') {
        localStorage.setItem('cartData', JSON.stringify(cartsItems));
        this.updateView.updateCart();
        if (priceEl) {
            priceEl.innerHTML = '';
        }
        const sumPrice = price;
        const discPrice = ((Number(sumPrice) - Number(sumPrice) * Number(discount) / 100) * Number(stock));
        const withoutDisc = Number(price) * Number(stock)
        if (Number(discount)) {
            this.createEl('span', `$${discPrice.toFixed(1)}`, 'cart__item-price_orange', priceEl);
            this.createEl('span', `$${withoutDisc.toFixed(1)}`, 'cart__item-price_grey', priceEl);
        } else {
            this.createEl('span', `$${withoutDisc.toFixed(1)}`, 'cart__item-price_black', priceEl);
        }

        let totalPrice = 0;
        cartsItems.forEach(item => {
            const disc = ((Number(item.price) - Number(item.price) * Number(item.discount) / 100) * Number(item.stock));
            totalPrice += disc;
        })

        const subTotal = document.querySelector('.cart__subtotal');
        if (subTotal) {
            subTotal.innerHTML = `Subtotal: $${totalPrice.toFixed(1)}`
        }

        const shippingPrice = cartsItems.length * 5;
        const finallyPrice = totalPrice + shippingPrice;
        const sidebarOrdersPrice = document.querySelector('.cart__sidebar-price_value');
        const sidebarShipingPrice = document.querySelector('.cart__sidebar-price_shipping');
        const sidebarFinallyPrice = document.querySelector('.cart__sidebar-price_bold');

        if (sidebarOrdersPrice) {
            sidebarOrdersPrice.innerHTML = `$${totalPrice.toFixed(1)}`
        }
        if (sidebarShipingPrice) {
            sidebarShipingPrice.innerHTML = `$${shippingPrice.toFixed(1)}`
        }
        if (sidebarFinallyPrice) {
            sidebarFinallyPrice.innerHTML = `$${finallyPrice.toFixed(1)}`
        }
        return finallyPrice;
    }

}

export default CartView;