/* eslint-disable no-restricted-syntax */
import { IOrderData, IProduct, IUserData } from "../types";
import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import UpdateView from "../Update";

class CartView extends Element {

    private api: Api;

    private controller: Controller;

    private updateView: UpdateView;

    /*     private userData: IUserData | null; */

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.updateView = new UpdateView();
        /*         this.userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null'); */
    }

    create() {
        const container = this.createEl('div', '', 'container_main cart', null);
        const cartEl = this.createEl('div', '', 'cart__content', container);
        const cartsId = <string[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const cartsData: IOrderData = {
            orderItems: [],
        };
        if (cartsId && cartsId.length) {
            this.createEl('h2', 'Checkout', 'cart__title', cartEl);
            (async () => {
                const [inpustList, unputsValues] = this.createInputs() as [HTMLElement, IUserData];
                const cartListEl = this.createEl('div', '', 'cart__list', cartEl);
                this.createEl('h3', '1. Item Review', 'cart__list-title', cartListEl);
                const cartItemsEl = this.createEl('div', '', 'cart__items', cartListEl);
                let totalPrice = 0;
                for await (const item of cartsId) {
                    const product = <IProduct>await this.api.getProduct(item);
                    cartsData.status = 'processing';
                    cartsData.orderItems.push(product);
                    if (product) {
                        const cartItemEl = this.createEl('div', `<img src="${product.image}" class="cart__item-img" alt="image">`, 'cart__item', cartItemsEl);
                        const itemInfo = this.createEl('div', '', 'cart__item-info', cartItemEl);
                        this.createEl('div', product.name, 'cart__item-name', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">Year:</span> ${product.color}`, 'cart__item-name-value', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">Size:</span> ${product.year}`, 'cart__item-name-value', itemInfo);
                        /* const itemAmount =  */this.createEl('div', 'Amount', 'cart__item-amount', cartItemEl);


                        const sumPrice = product.price;
                        const discPrice = Number(sumPrice) - Number(sumPrice) * Number(product.discount) / 100;
                        totalPrice += discPrice;
                        if (Number(product.discount)) {
                            this.createEl('div', `$${discPrice}<span class="cart__item-price cart__item-price_grey">$${sumPrice}</span>`, 'cart__item-price cart__item-price_orange', cartItemEl);
                        } else {
                            this.createEl('div', `$${product.price}`, 'cart__item-price', cartItemEl);
                        }



                        const removeBtn = this.createEl('button', 'Delete', 'btn btn-primary cart__item-btn', cartItemEl);
                        removeBtn.addEventListener('click', () => {
                            this.controller.removeFromCart(cartsId, product._id)
                            const main = document.querySelector('.main') as HTMLElement;
                            main.innerHTML = '';
                            main.append(this.create())
                        });
                    }
                }
                const itemsAmount = cartsData.orderItems.length;
                const [sidebar, finallyPrice] = this.createSideBar(container, totalPrice, itemsAmount) as [HTMLElement, number];
                cartsData.price = finallyPrice;
                this.createEl('div', `Subtotal: $${totalPrice}`, 'cart__subtotal', cartListEl);

                cartEl.append(inpustList)
                if (itemsAmount) {
                    this.addOrder(sidebar, cartsData, userData, unputsValues)
                }
            })().catch(err => { console.error(err) });
        }
        return container;
    }

    createInputs() {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const shippingList = this.createEl('div', '', 'shipping__list', null);
        this.createEl('h2', '2. Shipping & Billing Address', 'cart__list-title', shippingList);
        const inpustListEl = this.createEl('div', '', 'account__inputs-list', shippingList);
        const inputs = ['name:text', 'email:email', 'surname:text', 'thirdname:text', 'phone:text', 'adress:text'];
        if (!userData) { inputs.push('password:password', 'repeatPassword:password') }
        const unputsValues: IUserData = {}
        inputs.forEach(item => {
            const [name, type] = item.split(':');
            const inputContainer = this.createEl('div', '', 'account__inputs-item', inpustListEl);
            this.createEl('p', `Your ${name}`, 'account__inputs-title', inputContainer);
            const input = this.createEl('input', '', 'form-control account__input', inputContainer) as HTMLInputElement;
            input.type = type;
            input.addEventListener('change', () => { unputsValues[name as keyof typeof unputsValues] = input.value })
            if (userData && userData[name as keyof typeof userData] !== undefined) {
                const currentValue = userData[name as keyof typeof userData] as string;
                input.value = currentValue;
                unputsValues[name as keyof typeof unputsValues] = input.value;
            }
        })
        return [shippingList, unputsValues]
    }

    /*  createPayment() {
         const payment = this.createEl('div', '3. Payment Method', 'cart__sidebar', null);
         return payment
     } */

    createSideBar(container: HTMLElement, price: number, itemsAmount: number) {
        const sidebar = this.createEl('div', '', 'cart__sidebar', container);
        const wrapperEl = this.createEl('div', '<h2 class="cart__sidebar-title">Order totals</h2>', 'cart__sidebar-wrapper', sidebar);
        const itemsListEl = this.createEl('div', '', 'cart__sidebar-list', wrapperEl);
        const shippingPrice = itemsAmount * 5;
        const finallyPrice = price + shippingPrice
        this.createEl('div', `<div class="cart__sidebar-price cart__sidebar-price_bold">Subtotal:</div>
        <div class="cart__sidebar-price cart__sidebar-price_bold">$${price}</div>`, 'cart__sidebar-item', itemsListEl);
        this.createEl('div', `<div class="cart__sidebar-price">Shipping:</div>
        <div class="cart__sidebar-price">$${shippingPrice}</div>`, 'cart__sidebar-item', itemsListEl);
        this.createEl('div', `<div class="cart__sidebar-price cart__sidebar-price_big">Shipping:</div>
        <div class="cart__sidebar-price cart__sidebar-price_big">$${finallyPrice}</div>`, 'cart__sidebar-item cart__sidebar-item_bold', wrapperEl);
        return [sidebar, finallyPrice];
    }

    addOrder(sidebar: HTMLElement, cartsData: IOrderData, userData: IUserData, unputsValues: IUserData) {
        const orderBtn = this.createEl('button', 'Complete order', 'btn btn-primary auth__btn', sidebar);
        orderBtn.addEventListener('click', () => {
            if (userData) {
                this.controller.makeOrder(cartsData)
            } else {
                this.controller.registerUser(unputsValues)
                    .then(() => {
                        this.updateView.updateHeader();
                        this.controller.makeOrder(cartsData)
                    })
            }
        });
    }

}

export default CartView;