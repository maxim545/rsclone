import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
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
        const productsEl = this.createEl('div', 'Admin products', 'admin-products', null);
        this.createEl('a', 'create new product', 'admin-products__name', productsEl, `#/adminpanel/createproduct`);
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        (async () => {
            const products = await this.api.getAllProduct();
            products.forEach(item => {
                this.createEl('div', item._id, 'admin-products__name', productsEl);
                this.createEl('div', item.name, 'admin-products__name', productsEl);
                this.createEl('div', item.price, 'admin-products__name', productsEl);
                const changeBtn = this.createEl('a', 'update', 'admin-products__name', productsEl, `/#/adminpanel/products/update/${item._id}`);
                const deleteBtn = this.createEl('button', 'delete', 'admin-products__name', productsEl);
            })
        })();


        return productsEl;
    }

}

export default AdminProductsView;