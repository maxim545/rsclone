import Element from "../common/Element";

class PurchaseView extends Element {


    create(userIsAuth: boolean, id: string) {
        const purchaseEl = this.createEl('div', '', 'purchase', null);
        (async () => {
            const purchases = await this.api.getPurchases(userData);
            purchases.forEach(item => {
                const purchaseItem = this.createEl('div', item._id, 'purchase__id', purchaseEl);
                const purchaseLink = this.createEl('a', 'Go to details', 'purchase__link', purchaseItem);
                purchaseLink.href = `/#/order/${item._id}`
                item.orderItems.forEach(product => {
                    this.createEl('div', product.name, 'purchase__name', purchaseItem);
                })
            })
        })().catch(err => { console.error(err) });

        return purchaseEl;
    }
}

export default PurchaseView;