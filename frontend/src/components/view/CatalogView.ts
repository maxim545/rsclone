import noUiSlider, { target, API } from 'nouislider';
import Api from "../api";
import Element from "../common/Element";
import { IUserData, IWishListData, IProduct } from "../types";


interface AllFiltersObj {
  minStock: number,
  maxStock: number,
  coverPriceFilter: number[],
  arrFilter: IProduct[],
  sizeFilter: string[],
  clothesFilter: string[],
  colorFilter: string[],
  brandFilter: string[],
  searchFilter: string
}

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

  private api: Api

  constructor() {
    super();
    this.api = new Api();
  }

  create() {

    const mainContent = document.getElementsByTagName('main') as HTMLCollection;
    mainContent[0].innerHTML += `
    <div class="main__top-bar">
      <div id="show-filters" class="show-filters"><i class="bi bi-sliders2-vertical"></i>Hide filters</div>
      <div id="change-view" class="change-view"><i class="bi bi-grid"></i></div>
    </div>
      `;

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
        arr.forEach((item, index) => {
          getItemsContainer[0].innerHTML += `<a class="item" href="/#/p/${item._id}">
                                                    <div id="image-container-${index}" class="image-container">
                                                      <img src="http://localhost:5000${item.image}" class="item__img" alt="image">
                                                      <div id="favorites-container-${index}" class="favorites-container">
                                                      </div>
                                                    </div>
                                                    <p class="item__name">${item.category} ${item.brand} ${item.year}</p>
                                                    <div id="item__allprice-${index}" class="item__allprice">
                                                    </div>
                                                </a>`;

          const isExist = wishList.find(el => el.productId === item._id);
          const favoritesContainer = document.getElementById(`favorites-container-${index}`) as HTMLElement;
          if (isExist) {
            favoritesContainer.innerHTML = `<i class="bi bi-heart-fill"></i>`;
          }
          else {
            favoritesContainer.innerHTML = `<i class="bi bi-heart"></i>`;
          }
          const itemAllPrice = document.getElementById(`item__allprice-${index}`) as HTMLElement;
          if (Number(item.discount) && Number(item.discount) > 0) {
            const withDiscount = Number(item.price) * (100 - Number(item.discount)) / 100;
            itemAllPrice.innerHTML = `<div class="item__price item__discount-price">$${String(withDiscount)}</div>`;
            itemAllPrice.innerHTML += `<div class="item__without-discount">$${item.price}</div>`;
            const imageContainer = document.getElementById(`image-container-${index}`) as HTMLElement;
            imageContainer.innerHTML += `<div class="sale-container">-${item.discount}%</div>`;
          }
          else {
            itemAllPrice.innerHTML = `<div class="item__price">$${item.price}</div>`;
          }
        });
      }


      filtersAndCards.innerHTML += `
            <section class="filters-wrapper">
              <div class="filters-content">
                <div class="filter-container"> 
                  <p class="filters-content_name">Clothes</p>
                  <div id="select-clothes" class="filters-content__clother filter-box">
                  </div>
                </div>
                <div class="filter-container">
                  <p class="filters-content_name">Size</p>
                  <div id="select-size" class="filters-content__size filter-box">
                  </div>
                </div>
                <div class="filter-container">
                  <p class="filters-content_name">Color</p>
                  <div id="select-color" class="filters-content__color filter-box">
                  </div>
                </div>
                <div class="filter-container">
                  <p class="filters-content_name">Brand</p>
                  <div id="select-brand" class="filters-content__brand filter-box">
                  </div>
                </div>
                <div class="filter-container__price">
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
          const filtersWrapper = document.getElementsByClassName("filters-wrapper")[0] as HTMLElement;
          const filtersContent = document.getElementsByClassName("filters-content")[0] as HTMLElement;
          if (changeView.classList.contains('change-view__onclick')) {
            changeView.classList.remove('change-view__onclick');
            changeView.classList.add('change-view__offclick');
            filtersAndCards.classList.remove('filters__and__cards__custom');
            filtersWrapper.classList.remove('filters-wrapper__custom');
            filtersContent.classList.remove('filters-content__custom')
          }
          else {
            changeView.classList.add('change-view__onclick');
            changeView.classList.remove('change-view__offclick');
            filtersAndCards.classList.add('filters__and__cards__custom');
            filtersWrapper.classList.add('filters-wrapper__custom');
            filtersContent.classList.add('filters-content__custom')
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
        for (let i = 0; i < products.length; i += 1) {
          const categoryName = products[i].category.toLowerCase();
          if (!arrCoverClothes.includes(categoryName)) {
            arrCoverClothes.push(categoryName);
          }
        }
        arrCoverClothes.sort();
        for (let i = 0; i < arrCoverClothes.length; i += 1) {
          let amount = 0;
          products.forEach(e => {
            if (arrCoverClothes[i] === e.category.toLowerCase()) {
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
        const coverColor = document.getElementById('select-color') as HTMLSelectElement;
        const arrCoverColor: string[] = [];
        for (let i = 0; i < products.length; i += 1) {
          const arr = products[i].color.split(',');
          for (let j = 0; j < arr.length; j += 1) {
            arr[j] = arr[j].trim();
          }
          /* let amount = 0;
            products.forEach(e => {
              if(e.color === products[i].color) {
                amount += 1;
              }
            }); */
          arr.forEach(e => {
            const colorName = e;
            if (!arrCoverColor.includes(colorName)) {
              arrCoverColor.push(colorName);
              if (coverColor !== null)
                coverColor.innerHTML += `
                    <div class="color-wrapper">
                      <input type="checkbox" id="${colorName}" class="filter-color__checkbox" value="${colorName}">
                      <label for="${colorName}" class="filter-color__label" style="background-color: ${colorName};"></label>
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
            start: [obj.minStock, obj.maxStock],
            step: 1,
            tooltips: [true, true],
            connect: true,
            range: { 'min': minAm - minAm, 'max': maxAm + 500 }
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
        obj.arrFilter = products.filter((e) => Number(e.price) >= obj.coverPriceFilter[0] && Number(e.price) <= obj.coverPriceFilter[1]);
        if (obj.clothesFilter.length > 0) {
          obj.arrFilter = obj.arrFilter.filter((e) => obj.clothesFilter.includes(e.category.toLowerCase()));
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


    })().catch(err => { console.error(err) });
    return filtersAndCards;
  }
}

export default CatalogView;