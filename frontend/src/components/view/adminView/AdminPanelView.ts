import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import { IUserData } from "../../types";
import UpdateView from "../../Update";


class AdminPanelView extends Element {

    private api: Api

    private controller: Controller

    private updateView: UpdateView

    constructor() {
        super();
        this.api = new Api();
        this.controller = new Controller();
        this.updateView = new UpdateView();
    }

    create() {
        const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
        const purchases = this.createEl('div', 'Admin panel', 'admin-purchases', null);
        const adminLinks = ['Products:#/adminpanel/products', 'Order:#/adminpanel/orders']
        adminLinks.forEach((link) => {
            const [name, href] = link.split(':');
            this.createEl('a', name, 'admin-purchases', purchases, href);
        })


        return purchases;
    }

}

export default AdminPanelView;