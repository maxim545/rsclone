class Element {
    createEl(elementTag: string, elementInner: string, className: string, insertTag: HTMLElement | null, href = "", dataset = "") {
        const element = document.createElement(elementTag)
        element.innerHTML = elementInner;
        element.className = className;
        if (insertTag) {
            insertTag.append(element);
        }
        if (href && element instanceof HTMLAnchorElement) {
            element.href = href;
        }
        if (dataset) {
            const [datasetName, datasetValue] = dataset.split(':')
            element.dataset[datasetName] = datasetValue;
        }
        return element;
    }
}
export default Element;