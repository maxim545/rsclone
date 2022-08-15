import Element from "../common/Element";

class ProductView extends Element {

    create(userIsAuth: boolean, id: string) {
        const productEl = this.createEl('div', '', 'container', null);
        (async () => {
            const product = await this.api.getProduct(id);
            const itemEl = this.createEl('div', '', 'item', productEl);
            if (product) {
                this.createEl('h3', product.name, 'item__name', itemEl) as HTMLAnchorElement;
                this.createEl('div', product.year, 'item__year', itemEl);
                const addCartBtn = this.createEl('button', 'Add to cart', 'item__cart', itemEl) as HTMLAnchorElement;
                addCartBtn.addEventListener('click', () => { this.controller.addToCart(id) });
            }
        })().catch(err => { console.error(err) });
        return productEl;
    }
}

export default ProductView;