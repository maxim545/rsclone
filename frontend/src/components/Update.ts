import Api from "./api";
import { ICartProduct, IUserData, IWishListData } from "./types";
import HeaderView from "./view/HeaderView";

class UpdateView {

    private header: HeaderView

    private api: Api;


    constructor() {
        this.header = new HeaderView();
        this.api = new Api();
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
        if (cartsItems) {
            cartsItems.forEach((item) => {
                cartCount += Number(item.stock)
            });
        }
        if (cartNumberEl) {
            cartNumberEl.innerHTML = String(cartCount);
        }
    }

    updateWishlistNum() {
        const numberEl = document.querySelector('.navbar__favorites__count');
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        let cartCount = 0;
        (async () => {
            const wishList = await this.api.getAllWishItems(userData) as IWishListData[];
            if (wishList) {
                cartCount = wishList.length
            }
            if (numberEl) {
                numberEl.innerHTML = String(cartCount);
            }
        })()
    }

    /* updateMain() {
        const main = document.querySelector('.main') as HTMLElement;
        main.innerHTML = '';
        main.append(this.cart.create())
    } */
}

export default UpdateView;