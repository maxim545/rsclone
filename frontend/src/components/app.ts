import Element from "./common/Element";
import HeaderView from "./view/HeaderView";

class App {

  private element: Element;

  private headerView: HeaderView

  constructor() {
    this.element = new Element();
    this.headerView = new HeaderView();
  }

  start() {
    const { body } = document;
    const headerEl = this.element.createEl('header', '', 'header', null);
    headerEl.append(this.headerView.create())
    const mainEl = this.element.createEl('main', '', 'main', null);
    body.append(headerEl, mainEl);
    const events = ['hashchange', 'load'];
  }
}

export default App;