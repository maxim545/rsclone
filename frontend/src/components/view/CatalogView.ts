import Element from "../common/Element";

class CatalogView extends Element {


    create() {
        const main = this.createEl('div', '', 'item__container', null);
        (async () => {
            const products = await this.api.getAllProduct();
            products.forEach(item => {
                const itemEl = this.createEl('div', '', 'item', main);
                const link = this.createEl('a', item.name, 'item__name', itemEl) as HTMLAnchorElement;
                link.href = `/#/p/${item.id}/`;
                this.createEl('div', item.year, 'item__year', itemEl);
            });
        })().catch(err => { console.error(err) });

        return main;
    }
}

export default CatalogView;