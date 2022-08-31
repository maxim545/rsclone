/* eslint-disable no-restricted-syntax */
import Element from "./common/Element";
import Router from "./Router";
import HeaderView from "./view/HeaderView";
import FooterView from "./view/FooterView";

class App {

  private header: HeaderView;

  private footer: FooterView;

  private router: Router;

  private element: Element;

  constructor() {
    this.header = new HeaderView();
    this.footer = new FooterView();
    this.router = new Router();
    this.element = new Element();
  }

  start() {
    const { body } = document;
    const headerEl = this.element.createEl('header', '', 'header', null);
    headerEl.append(this.header.create())
    const mainEl = this.element.createEl('main', '', 'main', null);
    const footerEl = this.element.createEl('footer', '', 'footer', null);
    footerEl.append(this.footer.create());
    body.append(headerEl, mainEl, footerEl);
    const events = ['hashchange', 'load'];
    for (const eventName of events) {
      window.addEventListener(eventName, () => { this.router.routing(mainEl) })
    }
  }
}

export default App;