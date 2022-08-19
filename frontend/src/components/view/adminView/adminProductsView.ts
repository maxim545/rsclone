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
        const productsEl = this.createEl('div', 'Admin products', 'admin-products', null);
        this.createEl('a', 'create new product', 'admin-products__name', productsEl, `#/adminpanel/createproduct`);

        /*  const createAll = this.createEl('button', 'create all product', 'admin-products__name', productsEl);
         createAll.addEventListener('click', () => {
             data.forEach((item) => {
                 this.api.createProduct(userData, item)
             });
         }); */


        (async () => {
            const products = await this.api.getAllProduct();
            products.forEach(item => {
                this.createEl('div', item._id, 'admin-products__name', productsEl);
                this.createEl('div', item.name, 'admin-products__name', productsEl);
                this.createEl('div', item.price, 'admin-products__name', productsEl);
                this.createEl('a', 'update', 'admin-products__name', productsEl, `/#/adminpanel/products/update/${item._id}`);
                const deleteBtn = this.createEl('button', 'delete', 'admin-products__name', productsEl);
                deleteBtn.dataset.id = item._id;
                deleteBtn.addEventListener('click', () => {
                    if (deleteBtn.dataset.id) {
                        this.api.removeProduct(userData, deleteBtn.dataset.id).then(() => {

                        })
                    }
                })
            })
        })();


        return productsEl;
    }

}

export default AdminProductsView;