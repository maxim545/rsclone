class Element {
    createEl(elementName: string, elementInner: string, className: string, insertTag: HTMLElement | null, href = ""): HTMLElement {
        const element = document.createElement(elementName);
        element.innerHTML = elementInner;
        element.className = className;
        if (insertTag) {
            insertTag.append(element);
        }
        if (href) {
            element.href = href;
        }
        return element;
    }
}
export default Element;