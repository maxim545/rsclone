/* eslint-disable no-restricted-syntax */
import { IProduct, IUserData } from "../types";
import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import UpdateView from "../Update";

class CartView extends Element {

    private api: Api

    private controller: Controller

    private updateView: UpdateView

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.updateView = new UpdateView();
    }

    create() {
        const cartEl = this.createEl('div', '', 'container', null);
        const cartsId = <string[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const cartsData: IProduct[] = [];
        if (cartsId && cartsId.length) {
            (async () => {
                this.createEl('h2', 'Fill in all the data to place an order', 'account__title', cartEl);
                const inpustList = this.createEl('div', '', 'account__list', cartEl);
                const inputs = ['name:text', 'email:email', 'surname:text', 'thirdname:text', 'phone:text', 'adress:text'];
                if (!userData) { inputs.push('password:password', 'repPassword:password') }
                const unputsValues: Record<string, string> = {}
                inputs.forEach(item => {
                    const [name, type] = item.split(':');
                    const inputContainer = this.createEl('div', '', 'login__item', inpustList);
                    this.createEl('p', `Your ${name}`, 'login__title', inputContainer);
                    const input = this.createEl('input', '', name, inputContainer) as HTMLInputElement;
                    input.type = type;
                    input.addEventListener('change', () => { unputsValues[name] = input.value })
                    if (userData && userData[name as keyof typeof userData] !== undefined) {
                        input.value = userData[name as keyof typeof userData];
                        unputsValues[name] = input.value;
                    }
                })
                // Functional showing carts of pruduct
                for await (const item of cartsId) {
                    const product = <IProduct>await this.api.getProduct(item);
                    cartsData.push(product);
                    if (product) {
                        this.createEl('div', product.name, 'item__name', cartEl);
                        this.createEl('div', product.year, 'item__year', cartEl);
                        this.createEl('div', product.color, 'item__year', cartEl);
                        const removeBtn = this.createEl('button', 'Remove', 'item__remove-btn', cartEl);
                        removeBtn.addEventListener('click', () => {
                            this.controller.removeFromCart(cartsId, product._id)
                            const main = document.querySelector('.main') as HTMLElement;
                            main.innerHTML = '';
                            main.append(this.create())
                        });
                    }
                }
                if (cartsData.length) {
                    this.createPurchases(cartEl, cartsData, userData, unputsValues)
                }
            })().catch(err => { console.error(err) });
        }
        return cartEl;
    }

    createPurchases(cartEl: HTMLElement, cartsData: IProduct[], userData: IUserData, unputsValues: Record<string, string>) {
        const purchases = this.createEl('div', 'Your purchases list with prices', 'purchases', cartEl);
        const orderBtn = this.createEl('button', 'create order', 'purchases__btn', purchases);
        orderBtn.addEventListener('click', () => {
            if (userData) {
                this.controller.makeOrder(cartsData)
            } else {
                this.controller.registerUser(unputsValues.name, unputsValues.email, unputsValues.password, unputsValues.repPassword)
                    .then(() => {
                        this.updateView.updateHeader();
                        this.controller.makeOrder(cartsData)
                    })
            }
        });
    }

}

export default CartView;