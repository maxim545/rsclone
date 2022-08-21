import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import { IUserData } from "../types";

class PurchaseView extends Element {

    private api: Api

    private controller: Controller;


    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
    }

    create() {
        const container = this.createEl('div', '', 'container_main orders', null);
        (async () => {
            const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null')
            const purchases = await this.api.getPurchases(userData);
            purchases.forEach(item => {
                const purchaseItem = this.createEl('div', item._id, 'purchase__id', container);
                this.createEl('a', 'Go to details', 'purchase__link', purchaseItem, `/#/purchases/order/${item._id}`);
                item.orderItems.forEach(product => {
                    this.createEl('div', product.name, 'purchase__name', purchaseItem);
                })
            })
        })().catch(err => { console.error(err) });

        return container;
    }
}

export default PurchaseView;