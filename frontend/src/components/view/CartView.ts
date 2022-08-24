/* eslint-disable no-restricted-syntax */
import { ICartProduct, IOrderData, IProduct, IUserData } from "../types";
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
        const cartsItems = <ICartProduct[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const orderData: IOrderData = {
            orderItems: [],
        };
        if (cartsItems && cartsItems.length) {
            this.createEl('h2', 'Checkout', 'cart__title', cartEl);
            (async () => {
                const [inpustList, unputsValues] = this.createInputs() as [HTMLElement, IUserData];
                const cartListEl = this.createEl('div', '', 'cart__list', cartEl);
                this.createEl('h3', '1. Item Review', 'cart__list-title', cartListEl);
                const cartItemsEl = this.createEl('div', '', 'cart__items', cartListEl);
                let totalPrice = 0;
                for await (const item of cartsItems) {
                    orderData.status = 'processing';
                    orderData.orderItems.push(item);
                    if (item) {
                        const productDB = <IProduct>await this.api.getProduct(item._id);
                        const prodSizes = productDB.variant.split(',');
                        const curSizeIndex = prodSizes.findIndex(el => el.split(':')[0].trim() === item.size);
                        const maxStockValue = prodSizes[curSizeIndex].split(':')[1].trim();

                        console.log();



                        const cartItemEl = this.createEl('div', `<img src="${item.image}" class="cart__item-img" alt="image">`, 'cart__item', cartItemsEl);
                        const itemInfo = this.createEl('div', '', 'cart__item-info', cartItemEl);
                        this.createEl('div', item.name, 'cart__item-name', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">Color:</span> ${item.color}`, 'cart__item-name-value', itemInfo);
                        this.createEl('div', `<span class="cart__item-name-key">Size:</span> ${item.size}`, 'cart__item-name-value', itemInfo);
                        const itemAmount = this.createEl('div', '', 'cart__item-amount', cartItemEl);
                        const inputAmount = this.createEl('input', '', 'cart__item-input', itemAmount) as HTMLInputElement;
                        inputAmount.type = 'number';
                        inputAmount.value = item.stock > maxStockValue ? maxStockValue : item.stock;
                        inputAmount.min = '1';
                        inputAmount.max = maxStockValue;
                        /* inputAmount.addEventListener('change', () => {
                            console.log(inputAmount.value);
                            this.updateCart();
                        }); */
                        const sumPrice = item.price;
                        const discPrice = Number(sumPrice) - Number(sumPrice) * Number(item.discount) / 100;
                        totalPrice += discPrice;
                        if (Number(item.discount)) {
                            this.createEl('div', `$${discPrice * Number(item.stock)}<span class="cart__item-price cart__item-price_grey">$${Number(item.price) * Number(item.stock)}</span>`, 'cart__item-price cart__item-price_orange', cartItemEl);
                        } else {
                            this.createEl('div', `$${Number(item.price) * Number(item.stock)}`, 'cart__item-price', cartItemEl);
                        }


                        const removeBtn = this.createEl('button', 'Delete', 'btn btn-primary cart__item-btn', cartItemEl);
                        removeBtn.addEventListener('click', () => {
                            this.controller.removeFromCart(cartsItems, item._id)
                            const main = document.querySelector('.main') as HTMLElement;
                            main.innerHTML = '';
                            main.append(this.create())
                        });
                    }
                }
                const itemsAmount = orderData.orderItems.length;
                const [sidebar, finallyPrice] = this.createSideBar(container, totalPrice, itemsAmount) as [HTMLElement, number];
                orderData.price = finallyPrice;
                this.createEl('div', `Subtotal: $${totalPrice}`, 'cart__subtotal', cartListEl);

                cartEl.append(inpustList)
                if (itemsAmount) {
                    this.addOrder(sidebar, orderData, userData, unputsValues)
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
        return [shippingList, unputsValues];
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

    addOrder(sidebar: HTMLElement, orderData: IOrderData, userData: IUserData, unputsValues: IUserData) {
        const orderBtn = this.createEl('button', 'Complete order', 'btn btn-primary auth__btn', sidebar);
        orderBtn.addEventListener('click', () => {
            if (userData) {
                this.controller.makeOrder(orderData)
            } else {
                this.controller.registerUser(unputsValues)
                    .then(() => {
                        this.updateView.updateHeader();
                        this.controller.makeOrder(orderData)
                    })
            }
        });
    }

    /*  updateCart() {
         const mainPage = document.querySelector('.main');
         if (mainPage) {
             mainPage.innerHTML = '';
             mainPage.append(this.create())
         }
     } */

}

export default CartView;