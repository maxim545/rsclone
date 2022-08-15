import CartView from "./view/CartView";
import HeaderView from "./view/HeaderView";

class UpdateView {

    private header: HeaderView

    private cart: CartView;

    constructor() {
        this.header = new HeaderView();
        this.cart = new CartView();
    }

    updateHeader() {
        const header = document.querySelector('.header');
        if (header) {
            header.innerHTML = '';
            header.append(this.header.create())
        }
    }

    /* updateMain() {
        const main = document.querySelector('.main') as HTMLElement;
        main.innerHTML = '';
        main.append(this.cart.create())
    } */
}

export default UpdateView;