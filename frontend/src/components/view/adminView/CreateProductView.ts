import { IProductCreated, IUserData } from "../../types";
import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";
import UserSidebarView from "../userView/UserSidebarView";
import AlertsView from "../AlertsView";

class CreateProductView extends Element {

  private api: Api

  private controller: Controller

  private updateView: UpdateView

  private sidebarView: UserSidebarView

  private alertView: AlertsView;

  constructor() {
    super();
    this.api = new Api();
    this.controller = new Controller();
    this.updateView = new UpdateView();
    this.sidebarView = new UserSidebarView();
    this.alertView = new AlertsView();
  }

  create() {
    const container = this.createEl('div', '', 'container_main account', null);
    const userData = <IUserData>JSON.parse(localStorage.getItem(`userData`) || `null`);
    (async () => {
      if (userData) {
        const [currentUser] = await this.api.loginUser({
          email: userData.email,
          password: userData.password
        }) as [IUserData];
        if (currentUser.role === 'user' || currentUser.role === 'courier') {
          container.append(this.alertView.createNotAdminAlert())
        }
        else {
          container.append(this.sidebarView.create(userData));
          const accountWrap = this.createEl('div', '', 'account__wrapper', container);
          const inputsValues: IProductCreated = {};
          accountWrap.innerHTML = `
                  <h1 class="account__title">Create New Product<h1>
                  <form data-create-product-form>
                  <div class="account__inputs-list">
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Name</p>
                      <input class="form-control account__input" type="text" data-create-input="name" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Year</p>
                      <input class="form-control account__input" type="number" data-create-input="year" min="1900" max="2023" step="1" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Color</p>
                      <input class="form-control account__input" type="text" data-create-input="color" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Category</p>
                      <input class="form-control account__input" type="text" data-create-input="category" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Price</p>
                      <input class="form-control account__input" type="number" data-create-input="price" min="1" max="10000" step="0.01" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Brand</p>
                      <input class="form-control account__input" type="text" data-create-input="brand" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Image</p>
                      <input class="form-control account__input" type="text" data-create-input="image" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Variant</p>
                      <input class="form-control account__input" type="text" data-create-input="variant" required>
                    </div>
                    <div class="account__inputs-item">
                      <p class="account__inputs-title">Discount</p>
                      <input class="form-control account__input" type="number" data-create-input="discount" min="0" max="100" required>
                    </div>
                  </div>
                  <button class="btn btn-primary auth__btn" type="submit" data-submit-btn>Create New Product</button>
                  </form>
                  `;
          const inputs = accountWrap.querySelectorAll<HTMLInputElement>(`[data-create-input]`);
          for (const input of inputs) {
            input.addEventListener('change', () => {
              inputsValues[input.dataset.createInput as keyof typeof inputsValues] = input.value;
            })
          }

          // inputs.forEach(item => {
          //     const inputContainer = this.createEl('div', '', 'item', null);
          //     this.createEl('p', `Add ${item}`, 'item__title', inputContainer);
          //     const input = this.createEl('input', '', item, inputContainer) as HTMLInputElement;
          //     input.type = 'text';
          //     input.addEventListener('change', () => {
          //         inputsValues[item as keyof typeof inputsValues] = input.value;
          //     })
          // })

          const btn = accountWrap.querySelector(`[data-submit-btn]`) as HTMLButtonElement;
          const form = accountWrap.querySelector(`[data-create-product-form]`);
          form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.api.createProduct(userData, inputsValues);
            btn?.blur();
          });
        }
      } else {
        container.append(this.alertView.createNotAdminAlert())
      }
    })();
    return container;
  }
}

export default CreateProductView;