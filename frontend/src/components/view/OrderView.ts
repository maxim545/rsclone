import Element from "../common/Element";

class ProductView extends Element {


    create(userIsAuth: boolean, id: string) {
        const productEl = this.createEl('div', '', 'container', null);
        (async () => {
            const product = await this.api.getOrder(id, userData);
            const itemEl = this.createEl('div', '', 'item', productEl);
            if (product) {
                this.createEl('h3', product._id, 'item__id', itemEl);
                product.orderItems.forEach(item => {
                    this.createEl('div', item.name, 'item__name', itemEl);
                })
            }
        })().catch(err => { console.error(err) });
        return productEl;
    }
}

export default ProductView;