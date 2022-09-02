import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IProduct, IUserData } from "../../types";
import UpdateView from "../../Update";
import UserSidebarView from "../userView/UserSidebarView";
import AlertsView from "../AlertsView";
import data from "../../data";
import { orderLang, adminLang } from "../../data-lang";



class AdminProductsView extends Element {

  private api: Api

  private controller: Controller

  private updateView: UpdateView

  private sidebarView: UserSidebarView

  private alertView: AlertsView;

  private lang: string;

  constructor() {
    super();
    this.api = new Api();
    this.controller = new Controller();
    this.updateView = new UpdateView();
    this.sidebarView = new UserSidebarView();
    this.alertView = new AlertsView();
    this.lang = localStorage.getItem('current-lang') as string;
  }

  create() {
    document.title = adminLang.title[this.lang as keyof typeof adminLang['title']]
    const container = this.createEl(`div`, ``, `container_main account admin-products-wrapper`, null);
    const userData = <IUserData>JSON.parse(localStorage.getItem(`userData`) || `null`);

    /* const createAll = this.createEl('button', 'create all product', 'admin-products__name', container);
    createAll.addEventListener('click', () => {
      data.forEach((item) => {
        this.api.createProduct(userData, item)
      });
    }); */


    (async () => {
      if (userData) {
        const [currentUser] = await this.api.loginUser({
          email: userData.email,
          password: userData.password
        }) as [IUserData];
        if (currentUser.role === 'admin') {
          container.append(this.sidebarView.create(userData));
          const productsSection = this.createEl(`section`, ``, `admin-products`, container);
          const productsEl = this.createEl(`div`, `Admin products`, `admin-products`, null);







          this.createEl(`a`, `create new product`, `admin-products__name`, productsEl, `#/adminpanel/createproduct`);
          const products = await this.api.getAllProduct();
          productsSection.innerHTML = `
                    <div class="admin-products__header">
                      <h2 class="admin-products__header-title">${adminLang.title[this.lang as keyof typeof adminLang['title']]}</h2>
                      <a class="admin-products__create" href="#/adminpanel/createproduct">${adminLang.create[this.lang as keyof typeof adminLang['create']]}</a>
                    </div>
                    <ul class="admin-products__list">
                      ${this.getProductsHTML(products)}
                    </ul>
                    `;
          productsSection.addEventListener(`click`, (e) => {
            const eventTarget = e.target as HTMLElement;
            const btn = eventTarget?.closest(`[data-delete-btn]`) as HTMLButtonElement;
            const item = eventTarget?.closest(`.admin-product`) as HTMLLIElement;
            if (btn && item && (typeof btn.dataset.id === `string`)) {
              this.api.removeProduct(userData, String(btn.dataset.id)).then(() => {
                item.style.opacity = `0`;
                function handleDelete(this: HTMLDivElement) {
                  this.remove()
                }
                item.addEventListener(`transitionend`, handleDelete);
              })
            }
          })
        } else {
          container.append(this.alertView.createNotAdminAlert())
        }
      } else {
        container.append(this.alertView.createNotAdminAlert())
      }
    })();

    return container;
  }

  getProductsHTML(products: IProduct[]) {
    let res = ``
    for (const product of products) {
      const name = {
        eng: product.name.split(':')[0],
        ru: product.name.split(':')[1],
      }
      res = `${res}
                <li class="admin-product">
                  <div class="admin-product__img-wrapper">
                    <img src="http://localhost:5000${product.image}" alt="Product photo">
                  </div>
                  <div class="admin-product__title">
                    <h3>${name[this.lang as keyof typeof name]}</h3>
                    <span>Art. No. ${product._id.slice(-10)}</span>
                  </div>
                  <div class="admin-product__price">
                    <span>${adminLang.price[this.lang as keyof typeof adminLang['price']]}</span>
                    <b>$${product.price}</b>
                  </div>
                  <div class="admin-product__quantities">
                    <span>${adminLang.quan[this.lang as keyof typeof adminLang['quan']]}</span>
                    <div class="admin-product__sizes">
                      ${this.getQuantitiesHTML(product.variant)}
                    </div>
                  </div>
                  <div class="admin-product__btns">
                    <a class="admin-product__btn" href="/#/adminpanel/products/update/${product._id}">${adminLang.update[this.lang as keyof typeof adminLang['update']]}</a>
                    <button class="admin-product__btn admin-product__btn_delete" data-id="${product._id}" data-delete-btn>${adminLang.delete[this.lang as keyof typeof adminLang['delete']]}</button>
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
      res = `${res}
              <span>${adminLang.size[this.lang as keyof typeof adminLang['size']]} ${size.split(`:`)[0]} : ${size.split(`:`)[1]} ${adminLang.amount[this.lang as keyof typeof adminLang['amount']]}</span>
              `;
    }
    return res;
  }
}

export default AdminProductsView;