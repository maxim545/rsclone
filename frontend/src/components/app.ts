import Element from "./common/Element";


class App {

  private element: Element;

  constructor() {
    this.element = new Element();
  }

  start() {
    const { body } = document;
    const headerEl = this.element.createEl('header', '', 'header', null);
    headerEl.append(this.header.create())
    const mainEl = this.element.createEl('main', '', 'main', null);
    body.append(headerEl, mainEl);
    const events = ['hashchange', 'load'];

  }
}

export default App;