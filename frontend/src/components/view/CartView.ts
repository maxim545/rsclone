/* eslint-disable no-restricted-syntax */
import { IProduct } from "../types";
import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";

class CartView extends Element {

    private api: Api

    private controller: Controller

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
    }

    create() {
        const cartEl = this.createEl('div', '', 'container', null);
        const cartsData = <string[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        const cartsArr: IProduct[] = [];
        if (cartsData) {
            (async () => {
                for await (const item of cartsData) {
                    const product = <IProduct>await this.api.getProduct(item);
                    cartsArr.push(product);
                    console.log(cartsArr);
                    if (product) {
                        this.createEl('div', product.name, 'item__name', cartEl);
                        this.createEl('div', product.year, 'item__year', cartEl);
                        this.createEl('div', product.color, 'item__year', cartEl);
                        const removeBtn = this.createEl('button', 'Remove', 'item__remove-btn', cartEl);
                        removeBtn.addEventListener('click', () => {
                            this.controller.removeFromCart(cartsData, product.id)
                            const main = document.querySelector('.main') as HTMLElement;
                            main.innerHTML = '';
                            main.append(this.create())
                        });
                    }
                }
                if (cartsData.length) {
                    this.createPurchases(cartEl, cartsArr)
                }
            })().catch(err => { console.error(err) });
        }
        return cartEl;
    }

    createPurchases(cartEl: HTMLElement, cartsData: IProduct[]) {
        const purchases = this.createEl('div', 'Your purchases list with prices', 'purchases', cartEl);
        const orderBtn = this.createEl('button', 'create order', 'purchases__btn', purchases);
        orderBtn.addEventListener('click', () => {
            this.controller.makeOrder(cartsData)
        });
    }

}

export default CartView;