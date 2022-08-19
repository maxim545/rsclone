import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import data from "../../data";
import { IUserData } from "../../types";
import UpdateView from "../../Update";


class AdminProductsView extends Element {

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
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const productsEl = this.createEl('div', 'Admin orders', 'admin-products', null);
        this.createEl('a', 'create new product', 'admin-products__name', productsEl, `#/adminpanel/createproduct`);


        (async () => {
            const orders = await this.api.getAllPurchases();
            orders.forEach(item => {
                const itemEl = this.createEl('div', item._id, 'admin-products__name', productsEl);
                this.createEl('div', item.orderStatus, 'admin-products__name', productsEl);
                this.createEl('a', 'update', 'admin-products__name', productsEl, `/#/adminpanel/orders/update/${item._id}`);
                item.orderItems.forEach(order => {
                    this.createEl('div', order.name, 'admin-products__name', itemEl);
                })
                const deleteBtn = this.createEl('button', 'delete', 'admin-products__name', productsEl);
                deleteBtn.dataset.id = item._id;
                deleteBtn.addEventListener('click', () => {
                    if (deleteBtn.dataset.id) {
                        this.api.removePurchase(userData, deleteBtn.dataset.id).then(() => {
                        })
                    }
                })
            })
        })();


        return productsEl;
    }

}

export default AdminProductsView;