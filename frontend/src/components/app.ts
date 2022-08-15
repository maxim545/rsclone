/* eslint-disable no-restricted-syntax */
import Element from "./common/Element";
import Router from "./Router";
import HeaderView from "./view/HeaderView";

class App {

  private header: HeaderView;

  private router: Router;

  private element: Element;

  constructor() {
    this.header = new HeaderView();
    this.router = new Router();
    this.element = new Element();
  }

  start() {
    const { body } = document;
    const headerEl = this.element.createEl('header', '', 'header', null);
    headerEl.append(this.header.create())
    const mainEl = this.element.createEl('main', '', 'main', null);
    body.append(headerEl, mainEl);
    const events = ['hashchange', 'load'];
    for (const eventName of events) {
      window.addEventListener(eventName, () => { this.router.routing(mainEl) })
    }
  }
}

export default App;