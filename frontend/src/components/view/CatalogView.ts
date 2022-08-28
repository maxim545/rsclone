import noUiSlider, { target, API } from 'nouislider';
import Api from "../api";
import Element from "../common/Element";
import { IUserData, IWishListData } from "../types";


interface AllFiltersObj {
  minStock: number,
  maxStock: number,
}

export const obj: AllFiltersObj = {
  minStock: 0,
  maxStock: 0,
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
    const itemsContainer = this.createEl('div', '', 'item__container', filtersAndCards);
    const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');


    (async () => {
      const products = await this.api.getAllProduct();
      const wishList = await this.api.getAllWishItems(userData) as IWishListData[];
      console.log(products);
      products.forEach(item => {
        const itemEl = this.createEl('a', '', 'item', itemsContainer, `/#/p/${item._id}`);

        const image = `<img src="http://localhost:5000${item.image}" class="item__img" alt="image">`
        const imageContainer = this.createEl('div', image, 'image-container', itemEl);
        const isExist = wishList.find(el => el.productId === item._id);
        if (isExist) {
          this.createEl('div', '<i class="bi bi-heart-fill"></i>', 'favorites-container', imageContainer);
        }
        else {
          this.createEl('div', '<i class="bi bi-heart"></i>', 'favorites-container', imageContainer);
        }

        this.createEl('p', item.name, 'item__name', itemEl);
        const allPrice = this.createEl('div', '', 'item__allprice', itemEl);

        if (Number(item.discount) && Number(item.discount) > 0) {
          const withDiscount = Number(item.price) * (100 - Number(item.discount)) / 100;
          const discountPrice = this.createEl('div', `$${String(withDiscount)}`, 'item__price', allPrice);
          discountPrice.classList.add('item__discount-price');
          this.createEl('div', `$${item.price}`, 'item__without-discount', allPrice);
          this.createEl('div', `-${item.discount}%`, 'sale-container', imageContainer);
        }
        else {
          this.createEl('div', `$${item.price}`, 'item__price', allPrice);
        }
      });

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
                  <input type="checkbox" id="${arrCoverBrand[i]}" class="filter-clothes__checkbox filter-checkbox" value="${arrCoverBrand[i]}">
                  <label for="${arrCoverBrand[i]}" class="filter-clothes__label filter-label">${arrCoverBrand[i]} (${amount})</label>
                  `;
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
          // [obj.minStock, obj.maxStock] = onFiltersStorage.amountFilter;
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

    })().catch(err => { console.error(err) });
    return filtersAndCards;
  }
}

export default CatalogView;