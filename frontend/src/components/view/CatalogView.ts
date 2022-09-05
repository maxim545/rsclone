import noUiSlider, { target, API } from 'nouislider';
import Api from "../api";
import Element from "../common/Element";
import { IUserData, IWishListData, IProduct, AllFiltersObj, ISort } from "../types";
import { catLang, alertsData } from "../data-lang";
import AlertsView from './AlertsView';
import UpdateView from "../Update";
import ModalView from './ModalView';


export const obj: AllFiltersObj = {
  minStock: 0,
  maxStock: 0,
  coverPriceFilter: [],
  arrFilter: [],
  sizeFilter: [],
  clothesFilter: [],
  colorFilter: [],
  brandFilter: [],
  searchFilter: ''
};

class CatalogView extends Element {

  private api: Api;

  private lang: string;

  private alertsView: AlertsView;

  private updateView: UpdateView;

  private modalView: ModalView;


  constructor() {
    super();
    this.api = new Api();
    this.lang = localStorage.getItem('current-lang') as string;
    this.alertsView = new AlertsView();
    this.updateView = new UpdateView();
    this.modalView = new ModalView();
  }

  create() {
    document.title = catLang['cat-page-title'][this.lang as keyof typeof catLang['cat-page-title']];
    /* const mainContent = document.getElementsByTagName('main') as HTMLCollection; */
    const main = document.querySelector('.main') as HTMLElement
    const topBar = this.createEl('div', '', 'main__top-bar', main);
    topBar.innerHTML += `
      <div id="show-filters" class="show-filters"><i class="bi bi-sliders2-vertical"></i>${catLang['cat-hide'][this.lang as keyof typeof catLang['cat-hide']]}</div>
      <div id="change-view" class="change-view"><i class="bi bi-grid"></i></div>
      `;
    if (!localStorage.getItem('sortParam')) {
      localStorage.setItem('sortParam', 'UpName');
    }
    const sortElement = this.createEl('div', '', 'sort', topBar) as HTMLInputElement;
    const labelElement = this.createEl('label', `<span class="sort__title">${catLang['cat-sort'][this.lang as keyof typeof catLang['cat-sort']]} </span>`, 'sort__label', sortElement) as HTMLLabelElement;
    const selectElement = this.createEl('select', '', 'form-control sort__select', labelElement) as HTMLSelectElement;
    const sortParameters: string[] = ['UpName', 'DownName', 'UpYear', 'DownYear', 'UpPrice', 'DownPrice'];
    const sortNames: ISort = {
      DownYear: catLang['cat-dyear'][this.lang as keyof typeof catLang['cat-dyear']],
      UpYear: catLang['cat-uyear'][this.lang as keyof typeof catLang['cat-uyear']],
      DownName: catLang['cat-dname'][this.lang as keyof typeof catLang['cat-dname']],
      UpName: catLang['cat-uname'][this.lang as keyof typeof catLang['cat-uname']],
      UpPrice: catLang['cat-uprice'][this.lang as keyof typeof catLang['cat-uprice']],
      DownPrice: catLang['cat-dprice'][this.lang as keyof typeof catLang['cat-dprice']],
    };
    // Render selects elements
    sortParameters.forEach((parameter) => {
      const optionElement = this.createEl('option', sortNames[parameter as keyof ISort], 'sort__option', selectElement) as HTMLOptionElement;
      optionElement.value = parameter;
      if (parameter === localStorage.getItem('sortParam')) { optionElement.selected = true; }
    });



    const filtersAndCards = this.createEl('div', '', 'filters__and__cards', null);
    this.createEl('div', '', 'item__container', filtersAndCards);
    const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
    const getItemsContainer = document.getElementsByClassName('item__container') as HTMLCollection;
    const onFiltersStorage = <AllFiltersObj>JSON.parse(localStorage.getItem('onFilters') || 'null');
    Object.assign(obj, onFiltersStorage);

    (async () => {
      const products = await this.api.getAllProduct();
      const wishList = await this.api.getAllWishItems(userData) as IWishListData[];

      const addCard = (arr: IProduct[]) => {
        getItemsContainer[0].innerHTML = '';
        getItemsContainer[0].innerHTML = `<div id="nothing-found" class="item__notfound">
                                              ${alertsData.search[this.lang as keyof typeof alertsData['search']]}
                                          </div>`;
        arr.forEach((item, index) => {
          const name = {
            eng: item.name.split(':')[0],
            ru: item.name.split(':')[1],
          }
          const getColors = () => {
            const colorsEngArr = item.color.split(':')[0].split(', ');
            let colorsStr = ``;
            colorsEngArr.forEach(el => {
              colorsStr += `<div class="item-column__color" style="background: ${el.trim()}"></div>`
            });
            return colorsStr;
          }
          const customParameters = localStorage.getItem('custParam');
          if (!customParameters || customParameters === 'row') {
            getItemsContainer[0].innerHTML += `<a class="item" href="/#/p/${item._id}">
                                                    <div id="image-container-${index}" class="image-container">
                                                      <img src="https://serverclone1.herokuapp.com${item.image}" class="item__img" alt="image">
                                                      <div id="favorites-container-${index}" class="favorites-container" data-productid="${item._id}">
                                                      </div>
                                                    </div>
                                                    <p class="item__name">${name[this.lang as keyof typeof name]}</p>
                                                    <div id="item__allprice-${index}" class="item__allprice">
                                                    </div>
                                                </a>`;
          } else if (customParameters === 'column') {
            const category = {
              eng: item.category.split(':')[0],
              ru: item.category.split(':')[1],
            }
            getItemsContainer[0].innerHTML += `<div class="item-column">
            <a class="item-left" href="/#/p/${item._id}">
              <div id="image-container-${index}" class="item-column__img-wrapper">
                <img src="https://serverclone1.herokuapp.com${item.image}" class="item-column__img" alt="image">
                <div id="favorites-container-${index}" class="favorites-container" data-productid="${item._id}">
                </div>
              </div>
            </a>
            <div class="item-column__info">
              <a class="item-column__name" href="/#/p/${item._id}">${name[this.lang as keyof typeof name]}</a>

              <div class="item-column__item item-column__colors">
                <p class="item-column-title item-column__colors-title">${catLang['cat-colors'][this.lang as keyof typeof catLang['cat-colors']]}</p>
                <div class="item-column-value item-column__colors">${getColors()}</div>
              </div>

              <div class="item-column__item item-column__year">
                <p class="item-column-title item-column__year-title">${catLang['cat-year'][this.lang as keyof typeof catLang['cat-year']]}</p>
                <div class="item-column-value item-column__year-value">${item.year}</div>
              </div>

              <div class="item-column__item item-column__category">
                <p class="item-column-title item-column__category-title">${catLang['cat-cat'][this.lang as keyof typeof catLang['cat-cat']]}</p>
                <div class="item-column-value item-column__category-value">${category[this.lang as keyof typeof category].toLowerCase()}</div>
              </div>

              <div class="item-column__item item-column__brand">
                <p class="item-column-title item-column__brand-title">${catLang['cat-brand'][this.lang as keyof typeof catLang['cat-brand']]}</p>
                <div class="item-column-value item-column__brand-value">${item.brand}</div>
              </div>

              <div class="item-column__price"></div>
              <div id="item__allprice-${index}" class="item-column__price">
              </div>
            </div>
        </div>`;
          }


          const isExist = wishList.find(el => el.productId === item._id);
          const favoritesContainer = document.getElementById(`favorites-container-${index}`) as HTMLElement;
          if (isExist) {
            favoritesContainer.dataset.id = isExist._id;
            favoritesContainer.innerHTML = `<i class="bi bi-heart-fill wishlit__bi-heart-fill"></i>`;
          }
          else {
            favoritesContainer.innerHTML = `<i class="bi bi-heart wishlit__bi-heart-fill"></i>`;
          }
          const itemAllPrice = document.getElementById(`item__allprice-${index}`) as HTMLElement;
          if (Number(item.discount) && Number(item.discount) > 0) {
            const withDiscount = Number(item.price) * (100 - Number(item.discount)) / 100;
            itemAllPrice.innerHTML = `<div class="item__price item__discount-price">$${String(withDiscount.toFixed(2))}</div>`;
            itemAllPrice.innerHTML += `<div class="item__without-discount">$${Number(item.price).toFixed(2)}</div>`;
            const imageContainer = document.getElementById(`image-container-${index}`) as HTMLElement;
            imageContainer.innerHTML += `<div class="sale-container">-${item.discount}%</div>`;
          }
          else {
            itemAllPrice.innerHTML = `<div class="item__price">$${Number(item.price).toFixed(2)}</div>`;
          }
        });

        const favoriteBtn = document.querySelectorAll(".favorites-container");
        favoriteBtn.forEach((el) => {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            if (userData) {
              const element = el as HTMLElement
              const datasetId = element.dataset.id as string;
              if (datasetId) {
                this.api.removeWishItem(userData, datasetId).then(() => {
                  this.updateView.updateWishlistNum();
                  element.dataset.id = '';
                  el.innerHTML = `<i class="bi bi-heart wishlit__bi-heart-fill"></i>`;
                });
              } else if (element.dataset.productid) {
                const wishItem = {
                  productId: element.dataset.productid,
                  isExist: true,
                }
                this.api.addWishItem(wishItem, userData).then((data: IWishListData) => {
                  this.updateView.updateWishlistNum();
                  element.dataset.id = data._id;
                  el.innerHTML = `<i class="bi bi-heart-fill wishlit__bi-heart-fill"></i>`;
                })
              }
            } else {
              this.modalView.create(alertsData['add-btn'][this.lang as keyof typeof alertsData['add-btn']])
            }
          })
        })
      }


      filtersAndCards.innerHTML += `
            <section class="filters-wrapper">
              <div class="filters-content">
                <div class="filter-container"> 
                  <p class="filters-content_name">${catLang['cat-cat'][this.lang as keyof typeof catLang['cat-cat']]}</p>
                  <div id="select-clothes" class="filters-content__clother filter-box">
                  </div>
                </div>
                <div class="filter-container">
                  <p class="filters-content_name">${catLang['cat-size'][this.lang as keyof typeof catLang['cat-size']]}</p>
                  <div id="select-size" class="filters-content__size filter-box">
                  </div>
                </div>
                <div class="filter-container">
                  <p class="filters-content_name">${catLang['cat-color'][this.lang as keyof typeof catLang['cat-color']]}</p>
                  <div id="select-color" class="filters-content__color filter-box">
                  </div>
                </div>
                <div class="filter-container">
                  <p class="filters-content_name">${catLang['cat-brand'][this.lang as keyof typeof catLang['cat-brand']]}</p>
                  <div id="select-brand" class="filters-content__brand filter-box">
                  </div>
                </div>
                <div class="filter-container__price">
                  <p class="filters-content_name">${catLang['cat-price'][this.lang as keyof typeof catLang['cat-brand']]}</p>
                  <div id="select-price" class="filters-content__price"></div>
                  <div class="input-price">
                    <input type="number" id="input-number_low" class="input-number__price">
                    <p>-</p>
                    <input type="number" id="input-number_up" class="input-number__price">
                  </div>
                </div>
              </div>
            </section>
            `;

      const changeView = document.getElementById('change-view') as HTMLElement;
      if (changeView !== undefined)
        changeView.addEventListener("click", () => {
          changeView.classList.toggle('change-view__onclick');
          const currentParam = localStorage.getItem('custParam')
          if (!currentParam || currentParam === 'column') {
            localStorage.setItem('custParam', 'row')
            addCard(obj.arrFilter);
          } else {
            localStorage.setItem('custParam', 'column')
            addCard(obj.arrFilter);

          }
        });

      const hideFilters = document.getElementById('show-filters') as HTMLElement;
      if (hideFilters !== undefined)
        hideFilters.addEventListener("click", () => {
          const filtersWrapper = document.getElementsByClassName("filters-wrapper")[0] as HTMLElement;
          if (filtersWrapper.classList.contains('hide')) {
            filtersWrapper.classList.remove('hide');
            filtersWrapper.classList.add('show');
          }
          else {
            filtersWrapper.classList.add('hide');
            filtersWrapper.classList.remove('show');
          }
        });

      function getClothes() {
        const coverClothes = document.getElementById('select-clothes') as HTMLSelectElement;
        const arrCoverClothes: string[] = [];
        const lang = localStorage.getItem('current-lang') as string;
        for (let i = 0; i < products.length; i += 1) {
          const category = {
            eng: products[i].category.split(':')[0],
            ru: products[i].category.split(':')[1],
          }
          const categoryName = category[lang as keyof typeof category].toLowerCase();
          if (!arrCoverClothes.includes(categoryName)) {
            arrCoverClothes.push(categoryName);
          }
        }
        arrCoverClothes.sort();
        for (let i = 0; i < arrCoverClothes.length; i += 1) {
          let amount = 0;
          products.forEach(e => {
            const categoryAmount = {
              eng: e.category.split(':')[0],
              ru: e.category.split(':')[1],
            }
            if (arrCoverClothes[i] === categoryAmount[lang as keyof typeof categoryAmount].toLowerCase()) {
              amount += 1;
            }
          });
          if (coverClothes !== null)
            arrCoverClothes[i] = arrCoverClothes[i][0].toUpperCase() + arrCoverClothes[i].slice(1)
          coverClothes.innerHTML += `
                <input type="checkbox" id="${arrCoverClothes[i]}" class="filter-clothes__checkbox filter-checkbox" value="${arrCoverClothes[i]}">
                <label for="${arrCoverClothes[i]}" class="filter-clothes__label filter-label">${arrCoverClothes[i]} (${amount})</label>
                `;
        }
        if (obj.clothesFilter.length !== 0) {
          for (let i = 0; i < obj.clothesFilter.length; i += 1) {
            const idClothes = document.getElementById(obj.clothesFilter[i][0].toUpperCase() + obj.clothesFilter[i].slice(1)) as HTMLInputElement;
            idClothes.checked = true;
          }
        }
      }
      getClothes();

      function getSize() {
        const coverSize = document.getElementById('select-size') as HTMLSelectElement;
        const arrCoverSize: string[] = [];
        for (let i = 0; i < products.length; i += 1) {
          const arr = products[i].variant.split(',');
          for (let j = 0; j < arr.length; j += 1) {
            arr[j] = arr[j].trim();
          }
          arr.forEach(e => {
            const variantName = e.split(':')[0];
            if (!arrCoverSize.includes(variantName)) {
              arrCoverSize.push(variantName);
            }
          })
        }
        arrCoverSize.sort();
        for (let i = 0; i < arrCoverSize.length; i += 1) {
          let amount = 0;
          products.forEach(e => {
            if (e.variant.includes(arrCoverSize[i])) {
              amount += 1;
            }
          });
          if (coverSize !== null)
            coverSize.innerHTML += `
                    <input type="checkbox" id="${arrCoverSize[i]}" class="filter-size__checkbox filter-checkbox" value="${arrCoverSize[i]}">
                    <label for="${arrCoverSize[i]}" class="filter-size__label filter-label">${arrCoverSize[i]} (${amount})</label>
                    `;
        }
        if (obj.sizeFilter.length !== 0) {
          for (let i = 0; i < obj.sizeFilter.length; i += 1) {
            const idSize = document.getElementById(obj.sizeFilter[i]) as HTMLInputElement;
            idSize.checked = true;
          }
        }
      }
      getSize();

      function getColor() {
        const lang = localStorage.getItem('current-lang') as string;

        const coverColor = document.getElementById('select-color') as HTMLSelectElement;
        const arrCoverColor: string[] = [];
        for (let i = 0; i < products.length; i += 1) {
          const color = {
            eng: products[i].color.split(':')[0],
            ru: products[i].color.split(':')[1],
          }
          const arrEng = color.eng.split(',');
          const arr = color[lang as keyof typeof color].split(',');
          for (let j = 0; j < arr.length; j += 1) {
            arr[j] = arr[j].trim();
          }
          /* let amount = 0;
            products.forEach(e => {
              if(e.color === products[i].color) {
                amount += 1;
              }
            }); */
          arr.forEach((e, i) => {
            const colorName = e;
            if (!arrCoverColor.includes(colorName)) {
              arrCoverColor.push(colorName);
              if (coverColor !== null)
                coverColor.innerHTML += `
                    <div class="color-wrapper">
                      <input type="checkbox" id="${colorName}" class="filter-color__checkbox" value="${colorName}">
                      <label for="${colorName}" class="filter-color__label" style="background-color: ${arrEng[i]};"></label>
                      <div class="color-checkbox-wrapper">
                      </div>
                      <div class="color-checkbox-name">${colorName}</div>
                    </div>
                      `;
            }
          })
        }
        if (obj.colorFilter.length !== 0) {
          for (let i = 0; i < obj.colorFilter.length; i += 1) {
            const idColor = document.getElementById(obj.colorFilter[i]) as HTMLInputElement;
            idColor.checked = true;
          }
        }
      }
      getColor();

      function getBrand() {
        const coverBrand = document.getElementById('select-brand') as HTMLSelectElement;
        const arrCoverBrand: string[] = [];
        for (let i = 0; i < products.length; i += 1) {
          const brandName = products[i].brand.toLowerCase();
          if (!arrCoverBrand.includes(brandName)) {
            arrCoverBrand.push(brandName);
          }
        }
        arrCoverBrand.sort();
        for (let i = 0; i < arrCoverBrand.length; i += 1) {
          let amount = 0;
          products.forEach(e => {
            if (arrCoverBrand[i] === e.brand.toLowerCase()) {
              amount += 1;
            }
          });
          if (coverBrand !== null)
            arrCoverBrand[i] = arrCoverBrand[i][0].toUpperCase() + arrCoverBrand[i].slice(1);
          coverBrand.innerHTML += `
                  <input type="checkbox" id="${arrCoverBrand[i]}" class="filter-brand__checkbox filter-checkbox" value="${arrCoverBrand[i]}">
                  <label for="${arrCoverBrand[i]}" class="filter-brand__label filter-label">${arrCoverBrand[i]} (${amount})</label>
                  `;
        }
        if (obj.brandFilter.length !== 0) {
          for (let i = 0; i < obj.brandFilter.length; i += 1) {
            const idBrand = document.getElementById(obj.brandFilter[i][0].toUpperCase() + obj.brandFilter[i].slice(1)) as HTMLInputElement;
            idBrand.checked = true;
          }
        }
      }
      getBrand();

      function getPrice() {
        const coverPrice = document.getElementById('select-price') as target;
        const arrInStock: number[] = [];
        for (let i = 0; i < products.length; i += 1) {
          arrInStock.push(Number(products[i].price));
        }
        if (obj.minStock === 0 || obj.maxStock === 0) {
          obj.minStock = Math.min(...arrInStock);
          obj.maxStock = Math.max(...arrInStock);
        }
        else {
          [obj.minStock, obj.maxStock] = onFiltersStorage.coverPriceFilter;
        }
        const minAm: number = Math.min(...arrInStock);
        const maxAm: number = Math.max(...arrInStock);
        if (coverPrice !== null)
          noUiSlider.create(coverPrice, {
            start: [0, obj.maxStock],
            step: 1,
            tooltips: [true, true],
            connect: true,
            range: { 'min': 0, 'max': maxAm }
          });

        const inputNumberLow = document.getElementById('input-number_low') as HTMLInputElement;
        const inputNumberUp = document.getElementById('input-number_up') as HTMLInputElement;

        (<API>coverPrice.noUiSlider).on('update', (values, handle) => {

          const value = values[handle];

          if (handle) {
            inputNumberUp.value = String(value);
          } else {
            inputNumberLow.value = String(value);
          }
        });
        inputNumberLow.addEventListener('change', () => {
          (<API>coverPrice.noUiSlider).set([inputNumberLow.value, String(null)]);
        });
        inputNumberUp.addEventListener('change', () => {
          (<API>coverPrice.noUiSlider).set([String(null), inputNumberUp.value]);
        });
      }
      getPrice();

      function onFilters() {
        const lang = localStorage.getItem('current-lang') as string;

        obj.arrFilter = products.filter((e) => Number(e.price) >= obj.coverPriceFilter[0] && Number(e.price) <= obj.coverPriceFilter[1]);
        if (obj.clothesFilter.length > 0) {
          obj.arrFilter = obj.arrFilter.filter((e) => {
            const category = {
              eng: e.category.split(':')[0],
              ru: e.category.split(':')[1],
            }
            return obj.clothesFilter.includes(category[lang as keyof typeof category].toLowerCase())

          });
        }
        if (obj.sizeFilter.length > 0) {
          obj.arrFilter = obj.arrFilter.filter((e) => {
            for (let i = 0; i < obj.sizeFilter.length; i += 1) {
              if (e.variant.includes(obj.sizeFilter[i])) {
                return e
              }
            }
          });
        }
        if (obj.colorFilter.length > 0) {
          obj.arrFilter = obj.arrFilter.filter((e) => {
            for (let i = 0; i < obj.colorFilter.length; i += 1) {
              if (e.color.includes(obj.colorFilter[i])) {
                return e
              }
            }
          });
        }
        if (obj.brandFilter.length > 0) {
          obj.arrFilter = obj.arrFilter.filter((e) => obj.brandFilter.includes(e.brand));
        }
        addCard(obj.arrFilter);
        localStorage.setItem('onFilters', JSON.stringify(obj));
      }
      onFilters();

      const elementClothes = document.querySelectorAll<HTMLInputElement>('.filter-clothes__checkbox');
      for (let i = 0; i < elementClothes.length; i += 1) {
        elementClothes[i].addEventListener("click", () => {
          if (!obj.clothesFilter.includes(elementClothes[i].value.toLowerCase())) {
            obj.clothesFilter.push(elementClothes[i].value.toLowerCase());
          }
          else {
            obj.clothesFilter = obj.clothesFilter.filter((e) => e !== elementClothes[i].value.toLowerCase());
          }
          onFilters();
        })
      }

      const elementSize = document.querySelectorAll<HTMLInputElement>('.filter-size__checkbox');
      for (let i = 0; i < elementSize.length; i += 1) {
        elementSize[i].addEventListener("click", () => {
          if (!obj.sizeFilter.includes(elementSize[i].value)) {
            obj.sizeFilter.push(elementSize[i].value);
          }
          else {
            obj.sizeFilter = obj.sizeFilter.filter((e) => e !== elementSize[i].value);
          }
          onFilters();
        })
      }

      const elementColor = document.querySelectorAll<HTMLInputElement>('.filter-color__checkbox');
      for (let i = 0; i < elementColor.length; i += 1) {
        elementColor[i].addEventListener("click", () => {
          if (!obj.colorFilter.includes(elementColor[i].value)) {
            obj.colorFilter.push(elementColor[i].value);
          }
          else {
            obj.colorFilter = obj.colorFilter.filter((e) => e !== elementColor[i].value.toLowerCase());
          }
          onFilters();
        })
      }

      const elementBrand = document.querySelectorAll<HTMLInputElement>('.filter-brand__checkbox');
      for (let i = 0; i < elementBrand.length; i += 1) {
        elementBrand[i].addEventListener("click", () => {
          if (!obj.brandFilter.includes(elementBrand[i].value.toLowerCase())) {
            obj.brandFilter.push(elementBrand[i].value.toLowerCase());
          }
          else {
            obj.brandFilter = obj.brandFilter.filter((e) => e !== elementBrand[i].value.toLowerCase());
          }
          onFilters();
        })
      }

      const coverPrice = document.getElementById('select-price') as target;
      if (coverPrice !== null)
        (<API>coverPrice.noUiSlider).on('update', () => {
          let amountMaxMin: number[] = [];
          amountMaxMin = coverPrice.noUiSlider?.get(true) as number[];
          obj.coverPriceFilter = amountMaxMin;
          onFilters();
        });

      const sortSearch = (allCard: IProduct[], valueSearch: string) => {
        const lang = localStorage.getItem('current-lang') as string;
        const allCardge: IProduct[] = allCard.filter((e) => {
          const name = {
            eng: e.name.split(':')[0],
            ru: e.name.split(':')[1],
          }
          return name[lang as keyof typeof name].toLowerCase().indexOf(valueSearch.toLowerCase()) > -1
        });
        addCard(allCardge);
        if (allCardge.length <= 0 && valueSearch.length > 0) {
          const nothingFound = document.getElementById("nothing-found") as HTMLElement;
          nothingFound.style.display = "flex";
        }
        else {
          const nothingFound = document.getElementById("nothing-found") as HTMLElement;
          nothingFound.style.display = "none";
        }
      }


      const sortProducts = () => {
        const sortParameter = localStorage.getItem('sortParam');
        const lang = localStorage.getItem('current-lang') as string;
        if (sortParameter === 'DownYear') {
          obj.arrFilter.sort((a, b) => (b.year < a.year ? -1 : 1));
        }
        if (sortParameter === 'UpYear') {
          obj.arrFilter.sort((a, b) => (b.year > a.year ? -1 : 1));
        }
        if (sortParameter === 'DownPrice') {
          obj.arrFilter.sort((a, b) => (b.price as unknown as number) - (a.price as unknown as number));
        }
        if (sortParameter === 'UpPrice') {
          obj.arrFilter.sort((a, b) => (a.price as unknown as number) - (b.price as unknown as number));
        }
        if (sortParameter === 'UpName') {
          obj.arrFilter.sort((a, b) => {
            const nameB = {
              eng: b.name.split(':')[0],
              ru: b.name.split(':')[1],
            }
            const nameA = {
              eng: a.name.split(':')[0],
              ru: a.name.split(':')[1],
            }
            return (nameB[this.lang as keyof typeof nameB].toLowerCase() > nameA[this.lang as keyof typeof nameA].toLowerCase() ? -1 : 1)
          });
        }
        if (sortParameter === 'DownName') {
          obj.arrFilter.sort((a, b) => {
            const nameB = {
              eng: b.name.split(':')[0],
              ru: b.name.split(':')[1],
            }
            const nameA = {
              eng: a.name.split(':')[0],
              ru: a.name.split(':')[1],
            }
            return (nameB[this.lang as keyof typeof nameB].toLowerCase() < nameA[this.lang as keyof typeof nameA].toLowerCase() ? -1 : 1)
          });
        }
        addCard(obj.arrFilter);
      }
      sortProducts();


      const formSearch = document.getElementsByClassName("navbar__search-line")[0] as HTMLInputElement;
      const formSearchMobile = document.getElementsByClassName("navbar__search-line")[1] as HTMLInputElement;
      const sortSelect = document.querySelector(".sort__select") as HTMLSelectElement;
      if (formSearch !== undefined)
        formSearch.oninput = () => {
          const valueSearch: string = formSearch.value;
          sortSearch(obj.arrFilter, valueSearch.toLowerCase());
        }
      if (formSearchMobile !== undefined)
        formSearchMobile.oninput = () => {
          const valueSearch: string = formSearchMobile.value;
          sortSearch(obj.arrFilter, valueSearch.toLowerCase());
        }

      if (sortSelect) {
        sortSelect.addEventListener('change', () => {
          localStorage.setItem('sortParam', sortSelect.value);
          sortProducts();
        });
      }


    })().catch(err => { console.error(err) });


    return filtersAndCards;
  }
}

export default CatalogView;