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
        const id = window.location.hash.replace("#", "").slice(7);
        const productEl = this.createEl('div', '', 'container', null);
        const userData = JSON.parse(localStorage.getItem('userData'));
        (async () => {
            const product = await this.api.getOrder(id, userData);
            const itemEl = this.createEl('div', '', 'item', productEl);
            if (product) {
                this.createEl('h3', product._id, 'item__id', itemEl);
                product.orderItems.forEach(item => {
                    this.createEl('div', item.name, 'item__name', itemEl);
                })
            }
        })().catch(err => { console.error(err) });
        return productEl;
    }
}

export default ProductView;