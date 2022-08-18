import Api from "../../api";
import Element from "../../common/Element";
import Controller from "../../Controller";
import UpdateView from "../../Update";

class AdminOrdersView extends Element {

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
        const loginEl = this.createEl('div', 'Admin products', 'login', null);


        return loginEl;
    }

}

export default AdminOrdersView;