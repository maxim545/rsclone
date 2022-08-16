import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import { IOrder, IOrders, IUserData } from "../types";

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
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        (async () => {
            const product: IOrders = await this.api.getOrder(id, userData);
            const itemEl = this.createEl('div', '', 'item', productEl);
            if (product) {
                this.createEl('h3', product._id, 'item__id', itemEl);
                const orders: IOrder[] = product.orderItems;
                orders.forEach(item => {
                    this.createEl('div', item.name, 'item__name', itemEl);
                })
            }
        })().catch(err => { console.error(err) });
        return productEl;
    }
}

export default ProductView;