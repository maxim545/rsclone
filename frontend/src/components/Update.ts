import { ICartProduct } from "./types";
import HeaderView from "./view/HeaderView";

class UpdateView {

    private header: HeaderView


    constructor() {
        this.header = new HeaderView();
    }

    updateHeader() {
        const header = document.querySelector('.header');
        if (header) {
            header.innerHTML = '';
            header.append(this.header.create())
        }
    }

    updateCart() {
        const cartsItems = <ICartProduct[]>JSON.parse(localStorage.getItem('cartData') || 'null');
        const cartNumberEl = document.querySelector('.navbar__content__count');
        let cartCount = 0;
        cartsItems.forEach((item) => {
            cartCount += Number(item.stock)
        });
        if (cartNumberEl) {
            cartNumberEl.innerHTML = String(cartCount);
        }
    }

    /* updateMain() {
        const main = document.querySelector('.main') as HTMLElement;
        main.innerHTML = '';
        main.append(this.cart.create())
    } */
}

export default UpdateView;