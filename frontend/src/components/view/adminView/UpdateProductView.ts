import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IProduct, IProductCreated, IUserData } from "../../types";
import UpdateView from "../../Update";
import UserSidebarView from "../userView/UserSidebarView";

class ChangeProductView extends Element {

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
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const id = window.location.hash.replace("#", "").slice(28);
        const container = this.createEl('div', '', 'container_main account', null);
        // const inputs = ['name', 'year', 'color', 'category', 'price', 'brand', 'image', 'variant', 'discount'];
        if (!userData) {
            const enterLink = `<a class="acoount__link" href="#/login">enter</a>`
            const registerLink = `<a class="acoount__link" href="#/register">register</a>`
            this.createEl(`div`, `Please ${enterLink} in your account or ${registerLink}`, `account__warning`, container);
        }
        else {
            (async () => {
                const [product] = await this.api.getProduct(id) as [IProduct];
                container.append(this.sidebarView.create(userData));
                const accountWrap = this.createEl('div', '', 'account__wrapper', container);
                accountWrap.innerHTML = `
                    <h2 class="account__title">Editing of&nbsp;the&nbsp;product "${product.name}"<h2>
                    <span class="account__article">Art. No. ${product._id.slice(-10)}</span>
                    <form data-update-product-form>
                    <div class="account__inputs-list">
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Name</p>
                        <input class="form-control account__input" type="text" data-update-input="name" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Year</p>
                        <input class="form-control account__input" type="number" data-update-input="year" min="1900" max="2023" step="1" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Color</p>
                        <input class="form-control account__input" type="text" data-update-input="color" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Category</p>
                        <input class="form-control account__input" type="text" data-update-input="category" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Price</p>
                        <input class="form-control account__input" type="number" data-update-input="price" min="1" max="10000" step="0.01" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Brand</p>
                        <input class="form-control account__input" type="text" data-update-input="brand" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Image</p>
                        <input class="form-control account__input" type="text" data-update-input="image" required>
                        <input class="form-control account__input account__input_file" type="file" accept="image/*" data-update-file="image">
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Variant</p>
                        <input class="form-control account__input" type="text" data-update-input="variant" required>
                      </div>
                      <div class="account__inputs-item">
                        <p class="account__inputs-title">Change Discount</p>
                        <input class="form-control account__input" type="number" data-update-input="discount" min="0" max="100" required>
                      </div>
                    </div>
                    <button class="btn btn-primary auth__btn" type="submit" data-submit-btn>Update Product</button>
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
                    const [image] = inputFile.files as FileList;
                    fd.append('img', image);
                    this.api.addProductImage(userData, fd)
                })

                // inputs.forEach(item => {
                //     const inputContainer = this.createEl('div', '', 'item', container);
                //     this.createEl('p', `Add ${item}`, 'item__title', inputContainer);
                //     const input = this.createEl('input', '', item, inputContainer) as HTMLInputElement;
                //     input.type = 'text';
                //     input.value = product[item as keyof typeof product];
                //     inputsValues[item as keyof typeof inputsValues] = input.value;
                //     if (item === 'image') {
                //         const imageInput = this.createEl('input', '', item, inputContainer) as HTMLInputElement;
                //         imageInput.type = 'file'
                //         imageInput.addEventListener('change', () => {
                //             const fd = new FormData();
                //             const [image] = imageInput.files as FileList;
                //             fd.append('img', image);
                //             this.api.addProductImage(userData, fd)
                //         })
                //     }
                //
                //     input.addEventListener('change', () => {
                //         inputsValues[item as keyof typeof inputsValues] = input.value;
                //     })
                // })
                // const updateBtn = this.createEl('button', `Update`, 'btn-update', null);
                // updateBtn.addEventListener('click', () => {
                //     this.api.updateProduct(userData, inputsValues).then(() => {
                //         window.location.hash = '#/adminpanel/products'
                //     })
                // })

                const form = accountWrap.querySelector(`[data-update-product-form]`);
                form?.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.api.updateProduct(userData, inputsValues).then(() => {
                        window.location.hash = '#/adminpanel/products'
                    })
                });
            })();
        }
        return container;
    }
}

export default ChangeProductView;