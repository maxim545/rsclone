import { IProductCreated, IUserData } from "../../types";
import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";
import UserSidebarView from "../userView/UserSidebarView";
import AlertsView from "../AlertsView";
import { alertsData, adminLang } from "../../data-lang";
import ModalView from "../ModalView";

class CreateProductView extends Element {

  private api: Api

  private controller: Controller

  private updateView: UpdateView

  private sidebarView: UserSidebarView

  private alertView: AlertsView;

  private lang: string;

  private modalView: ModalView;


  constructor() {
    super();
    this.api = new Api();
    this.controller = new Controller();
    this.updateView = new UpdateView();
    this.sidebarView = new UserSidebarView();
    this.alertView = new AlertsView();
    this.lang = localStorage.getItem('current-lang') as string;
    this.modalView = new ModalView();
  }

  create() {
    document.title = adminLang['create-title'][this.lang as keyof typeof adminLang['create-title']]
    const container = this.createEl('div', '', 'container_main account', null);
    const userData = <IUserData>JSON.parse(localStorage.getItem(`userData`) || `null`);
    (async () => {
      if (userData) {
        const [currentUser] = await this.api.loginUser({
          email: userData.email,
          password: userData.password
        }) as [IUserData];
        if (currentUser.role !== 'user' && currentUser.role !== 'courier') {
          container.append(this.sidebarView.create(userData));
          const accountWrap = this.createEl('div', '', 'account__wrapper', container);
          const inputsValues: IProductCreated = {};
          accountWrap.innerHTML = `
                  <h1 class="account__title">${adminLang['create-title'][this.lang as keyof typeof adminLang['create-title']]}<h1>
                  <form data-create-product-form>
                  <div class="account__inputs-list">
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.name[this.lang as keyof typeof adminLang['name']]}</p>
                      <input class="form-control account__input" type="text" pattern=".{2,}:.{2,}" data-create-input="name" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.year[this.lang as keyof typeof adminLang['year']]}</p>
                      <input class="form-control account__input" type="number" data-create-input="year" min="1900" max="2023" step="1" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.color[this.lang as keyof typeof adminLang['color']]}</p>
                      <input class="form-control account__input" type="text" pattern="(\\b[a-z]{2,}\\b, )*[a-z]{2,}:([а-я]{2,}, )*([а-я]{2,})" data-create-input="color" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.category[this.lang as keyof typeof adminLang['category']]}</p>
                      <input class="form-control account__input" type="text" pattern="[A-Za-z-]{2,}:[А-Яа-яЁё-]{2,}" data-create-input="category" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.price[this.lang as keyof typeof adminLang['price']]}</p>
                      <input class="form-control account__input" type="number" data-create-input="price" min="1" max="10000" step="0.01" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.brand[this.lang as keyof typeof adminLang['brand']]}</p>
                      <input class="form-control account__input" type="text" pattern="[A-Za-zА-Яа-яЁё0-9-]{2,}" data-create-input="brand" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.img[this.lang as keyof typeof adminLang['img']]}</p>
                      <input class="form-control account__inpu account__input_image" type="text" data-create-input="image" disabled required>
                      <input class="form-control account__input account__input_file" type="file" accept="image/*" data-update-file="image" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.variant[this.lang as keyof typeof adminLang['variant']]}</p>
                      <input class="form-control account__input" type="text" pattern="([A-Za-zА-Яа-яЁё0-9-]{1,}:([0-9]{1,}), )*([A-Za-zА-Яа-яЁё0-9-]{1,}:([0-9]{1,}))" data-create-input="variant" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">${adminLang.dis[this.lang as keyof typeof adminLang['dis']]}</p>
                      <input class="form-control account__input" type="number" data-create-input="discount" min="0" max="100" step="1" required>
                    </div>
                  </div>
                  <button class="btn btn-primary auth__btn" type="submit" data-submit-btn>${adminLang['create-title'][this.lang as keyof typeof adminLang['create-title']]}</button>
                  </form>
                  `;
          const inputs = accountWrap.querySelectorAll<HTMLInputElement>(`[data-create-input]`);
          for (const input of inputs) {
            input.addEventListener('change', () => {
              inputsValues[input.dataset.createInput as keyof typeof inputsValues] = input.value;
            })
          }


          const inputFile = accountWrap.querySelector<HTMLInputElement>(`[data-update-file]`);
          inputFile?.addEventListener('change', () => {
            const fd = new FormData();
            const [image] = inputFile.files as FileList;
            const inputImage = document.querySelector('.account__input_image') as HTMLInputElement;
            fd.append('image', image);
            this.api.addProductImage(userData, fd).then((data) => {
              inputImage.value = data.image;
              inputsValues.image = data.image;
            })
          })

          const btn = accountWrap.querySelector(`[data-submit-btn]`) as HTMLButtonElement;
          const form = accountWrap.querySelector(`[data-create-product-form]`);
          form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.api.createProduct(userData, inputsValues);
            btn?.blur();
            this.modalView.create(alertsData.create[this.lang as keyof typeof alertsData['create']])
            window.location.hash = '#/adminpanel/products'
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

export default CreateProductView;