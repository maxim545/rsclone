import { IProduct } from "../types";
import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";

class ProductView extends Element {

    private api: Api

    private controller: Controller;

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
    }

    create() {
        const id = window.location.hash.replace("#", "").slice(3);
        const productEl = this.createEl('div', '', 'container', null);
        (async () => {
            const product = <IProduct | undefined>await this.api.getProduct(id);
            const itemEl = this.createEl('div', '', 'item', productEl);
            if (product) {
                this.createEl('h3', product.name, 'item__name', itemEl) as HTMLAnchorElement;
                this.createEl('div', product.year, 'item__year', itemEl);
                const addCartBtn = this.createEl('button', 'Add to cart', 'item__cart', itemEl) as HTMLAnchorElement;
                addCartBtn.addEventListener('click', () => { this.controller.addToCart(id) });
            }
        })().catch(err => { console.error(err) });
        return productEl;
    }
}

export default ProductView;