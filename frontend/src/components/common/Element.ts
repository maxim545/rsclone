class Element {
    createEl(elementName: string, elementInner: string, className: string, insertTag: HTMLElement | null): HTMLElement {
        const element = document.createElement(elementName);
        element.innerHTML = elementInner;
        element.className = className;
        if (insertTag) {
            insertTag.append(element);
        }
        return element;
    }
}
export default Element;