import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IProduct, IUserData } from "../../types";
import UpdateView from "../../Update";
import UserSidebarView from "../userView/UserSidebarView";


class AdminProductsView extends Element {

    private api: Api

    private controller: Controller

    private updateView: UpdateView

    private sidebarView: UserSidebarView

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.updateView = new UpdateView();
        this.sidebarView = new UserSidebarView();
    }

    create() {
        const container = this.createEl(`div`, ``, `container_main account admin-products-wrapper`, null);
        const userData = <IUserData>JSON.parse(localStorage.getItem(`userData`) || `null`);
        if (!userData) {
            const enterLink = `<a class="acoount__link" href="#/login">enter</a>`
            const registerLink = `<a class="acoount__link" href="#/register">register</a>`
            this.createEl(`div`, `Please ${enterLink} in your account or ${registerLink}`, `account__warning`, container);
        }
        else {
            container.append(this.sidebarView.create(userData));
            const productsSection = this.createEl(`section`, ``, `admin-products`, container);
            const productsEl = this.createEl(`div`, `Admin products`, `admin-products`, null);
            this.createEl(`a`, `create new product`, `admin-products__name`, productsEl, `#/adminpanel/createproduct`);
            (async () => {
                const products = await this.api.getAllProduct();
                console.dir(products);
                productsSection.innerHTML = `
                    <a class="admin-products__create" href="#/adminpanel/createproduct">Create new product</a>
                    <ul class="admin-products__list">
                      ${this.getProductsHTML(products)}
                    </ul>
                    `;
                productsSection.addEventListener(`click`, (e) => {
                    const eventTarget = e.target as HTMLElement;
                    const btn = eventTarget?.closest(`[data-delete-btn]`) as HTMLButtonElement;
                    const item = eventTarget?.closest(`.admin-product`) as HTMLLIElement;
                    if (btn && item && (typeof btn.dataset.id === `string`)) {
                        console.dir(btn.dataset.id);
                        this.api.removeProduct(userData, String(btn.dataset.id)).then(() => {
                            item.style.opacity = `0`;
                            function handleDelete(this: HTMLDivElement) {
                                this.remove()
                            }
                            item.addEventListener(`transitionend`, handleDelete);
                        })
                    }
                })

                // products.forEach(item => {
                //     this.createEl(`div`, item._id, `admin-products__name`, productsEl);
                //     this.createEl(`div`, item.name, `admin-products__name`, productsEl);
                //     this.createEl(`div`, item.price, `admin-products__name`, productsEl);
                //     this.createEl(`a`, `update`, `admin-products__name`, productsEl, `/#/adminpanel/products/update/${item._id}`);
                //     const deleteBtn = this.createEl(`button`, `delete`, `admin-products__name`, productsEl);
                //     deleteBtn.dataset.id = item._id;
                //     deleteBtn.addEventListener(`click`, () => {
                //         if (deleteBtn.dataset.id) {
                //             this.api.removeProduct(userData, deleteBtn.dataset.id).then(() => {
                //
                //             })
                //         }
                //     })
                // })
            })();
        }

        return container;
    }

    getProductsHTML(products: IProduct[]) {
        let res = ``
        for (const product of products) {
            res = `${res}
                <li class="admin-product">
                  <div class="admin-product__img-wrapper">
                    <img src="${product.image}" alt="Product photo">
                  </div>
                  <div class="admin-product__title">
                    <h3>${product.name}</h3>
                    <span>Art. No. ${product._id.slice(-10)}</span>
                  </div>
                  <div class="admin-product__price">
                    <span>Price:</span>
                    <b>$${product.price}</b>
                  </div>
                  <div class="admin-product__quantities">
                    <span>Quantities in stock:</span>
                    <div class="admin-product__sizes">
                      ${this.getQuantitiesHTML(product.variant)}
                    </div>
                  </div>
                  <div class="admin-product__btns">
                    <a class="admin-product__btn" href="/#/adminpanel/products/update/${product._id}">Update</a>
                    <button class="admin-product__btn admin-product__btn_delete" data-id="${product._id}" data-delete-btn>Delete</button>
                  </div>
                </li>
            `;
        }
        return res;
    }

    getQuantitiesHTML(quantities: string) {
        const arr = quantities.split(`, `);
        let res = ``;
        for (const size of arr) {
            let ending = ``;
            if (+size.split(`:`)[1] > 1) {
                ending = `s`;
            }
            res = `${res}
              <span>Size ${size.split(`:`)[0]}: ${size.split(`:`)[1]} piece${ending}</span>
              `;
        }
        return res;
    }
}

export default AdminProductsView;