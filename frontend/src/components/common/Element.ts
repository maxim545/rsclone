class Element {
    createEl(elementTag: string, elementInner: string, className: string, insertTag: HTMLElement | null, href = "") {
        const element = document.createElement(elementTag)
        element.innerHTML = elementInner;
        element.className = className;
        if (insertTag) {
            insertTag.append(element);
        }
        if (href && element instanceof HTMLAnchorElement) {
            element.href = href;
        }
        return element;
    }
}
export default Element;