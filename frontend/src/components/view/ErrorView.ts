import Element from "../common/Element";

class ErrorView extends Element {
    create() {
        const header = this.createEl('div', 'Page not found 404', 'error', null);
        return header;
    }
}

export default ErrorView;