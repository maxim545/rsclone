import Element from "../common/Element";

class CartView extends Element {

    create() {
        const cartEl = this.createEl('div', '', 'container', null);
        const cartsObj = [];
        if (cartsData) {
            (async () => {
                for await (const item of cartsData) {
                    const product = await this.api.getProduct(item);
                    cartsObj.push(product);
                    if (product) {
                        this.createEl('div', product.name, 'item__name', cartEl);
                        this.createEl('div', product.year, 'item__year', cartEl);
                        this.createEl('div', product.color, 'item__year', cartEl);
                        const removeBtn = this.createEl('button', 'Remove', 'item__remove-btn', cartEl);
                    }
                }
                if (cartsData.length) {
                    this.createPurchases(cartEl, cartsObj)
                }
            })().catch(err => { console.error(err) });
        }
        return cartEl;
    }

    createPurchases(cartEl: HTMLElement, cartsData) {
        const purchases = this.createEl('div', 'Your purchases list with prices', 'purchases', cartEl);
        const orderBtn = this.createEl('button', 'create order', 'purchases__btn', purchases);

    }

}

export default CartView;