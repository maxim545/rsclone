import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IProduct, IProductCreated, IUserData } from "../../types";
import UpdateView from "../../Update";
import UserSidebarView from "../userView/UserSidebarView";
import AlertsView from "../AlertsView";
import { orderLang, adminLang } from "../../data-lang";

class ChangeProductView extends Element {

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
    const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
    const id = window.location.hash.replace("#", "").slice(28);
    const main = document.querySelector('.main') as HTMLElement;
    if (id.length !== 24) {
      main.append(this.alertView.create())
      throw new Error(`Page not found`);
    }
    const container = this.createEl('div', '', 'container_main account', null);
    (async () => {
      if (userData) {
        const [currentUser] = await this.api.loginUser({
          email: userData.email,
          password: userData.password
        }) as [IUserData];
        if (currentUser.role !== 'user' && currentUser.role !== 'courier') {
          const [product, status] = await this.api.getProduct(id) as [IProduct, number];
          if (status === 404) {
            main.append(this.alertView.create())
            throw new Error(`Page not found`);
          }
          container.append(this.sidebarView.create(userData));
          const accountWrap = this.createEl('div', '', 'account__wrapper', container);

          const name = {
            eng: `Editing of the product "${product.name.split(':')[0]}"`,
            ru: `Редактирование продукта "${product.name.split(':')[1]}"`,
          }
          document.title = name[this.lang as keyof typeof name]

          accountWrap.innerHTML = `
                    <h2 class="account__title">${name[this.lang as keyof typeof name]}<h2>
                    <span class="account__article">Art. No. ${product._id.slice(-10)}</span>
                    <form data-update-product-form>
                    <div class="account__inputs-list">
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.name[this.lang as keyof typeof adminLang['name']]}</p>
                        <input class="form-control account__input" type="text" data-update-input="name" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.year[this.lang as keyof typeof adminLang['year']]}</p>
                        <input class="form-control account__input" type="number" data-update-input="year" min="1900" max="2023" step="1" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.color[this.lang as keyof typeof adminLang['color']]}</p>
                        <input class="form-control account__input" type="text" data-update-input="color" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.category[this.lang as keyof typeof adminLang['catrgory']]}</p>
                        <input class="form-control account__input" type="text" data-update-input="category" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.price[this.lang as keyof typeof adminLang['price']]}</p>
                        <input class="form-control account__input" type="number" data-update-input="price" min="1" max="10000" step="0.01" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.brand[this.lang as keyof typeof adminLang['brand']]}</p>
                        <input class="form-control account__input" type="text" data-update-input="brand" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.img[this.lang as keyof typeof adminLang['img']]}</p>
                        <input class="form-control account__input account__input_image" type="text" data-update-input="image" required>
                        <input class="form-control account__input account__input_file" type="file" accept="image/*" data-update-file="image">
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.variant[this.lang as keyof typeof adminLang['variant']]}</p>
                        <input class="form-control account__input" type="text" data-update-input="variant" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">${adminLang.dis[this.lang as keyof typeof adminLang['dis']]}</p>
                        <input class="form-control account__input" type="number" data-update-input="discount" min="0" max="100" required>
                      </div>
                    </div>
                    <button class="btn btn-primary auth__btn" type="submit" data-submit-btn>${adminLang.upd[this.lang as keyof typeof adminLang['upd']]}</button>
                    </form>
                    `;
          const inputsValues: IProductCreated = { _id: id }
          const inputs = accountWrap.querySelectorAll<HTMLInputElement>(`[data-update-input]`);
          for (const input of inputs) {
            input.value = product[input.dataset.updateInput as keyof typeof product];
            inputsValues[input.dataset.updateInput as keyof typeof inputsValues] = input.value;
            input.addEventListener('change', () => {
              inputsValues[input.dataset.updateInput as keyof typeof inputsValues] = input.value;
            })
          }
          const inputFile = accountWrap.querySelector<HTMLInputElement>(`[data-update-file]`);
          inputFile?.addEventListener('change', () => {
            const fd = new FormData();
            const inputImage = document.querySelector('.account__input_image') as HTMLInputElement;
            const [image] = inputFile.files as FileList;
            fd.append('image', image);
            this.api.addProductImage(userData, fd).then((data) => {
              inputImage.value = data.image;
              inputsValues.image = data.image;
            })
          })
          const form = accountWrap.querySelector(`[data-update-product-form]`);
          form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.api.updateProduct(userData, inputsValues).then(() => {
              window.location.hash = '#/adminpanel/products'
            })
          });
        } else {
          container.append(this.alertView.createNotAdminAlert())
        }
      } else {
        container.append(this.alertView.createNotAdminAlert())
      }
    })();

    return container;
  }
}

export default ChangeProductView;