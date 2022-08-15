import routerData from "./RouterData";

class Router {
    routing(mainEl: HTMLElement) {
        const location = window.location.hash.replace("#", "");
        const hashArr = location.split('/');
        let renderInstanse;
        if (hashArr.includes('p')) {
            renderInstanse = routerData['/p/'].instance;
        } else if (hashArr.includes('order')) {
            renderInstanse = routerData['/order/'].instance;
        } else if (location === '') {
            renderInstanse = routerData['/'].instance;
        } else if (!routerData[location as keyof typeof routerData]) {
            renderInstanse = routerData['404'].instance;
        } else {
            renderInstanse = routerData[location as keyof typeof routerData].instance
        }
        mainEl.innerHTML = '';
        mainEl.append(renderInstanse.create())
    }
}

export default Router