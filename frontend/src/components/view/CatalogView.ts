import Api from "../api";
import Element from "../common/Element";

class CatalogView extends Element {

  private api: Api

  constructor() {
    super();
    this.api = new Api();
  }

  create() {

    const mainContent = document.getElementsByTagName('main') as HTMLCollection;
    mainContent[0].innerHTML += `
    <div class="main-top-bar">
      <div id="show-filters" class="show-filters"><i class="bi bi-sliders2-vertical"></i>Hide filters</div>
      <div id="change-view" class="change-view"><i class="bi bi-grid"></i></div>
    </div>
      `;

    const filtersAndCards = this.createEl('div', '', 'filters__and__cards', null);
    const main = this.createEl('div', '', 'item__container', filtersAndCards);

    (async () => {
      const products = await this.api.getAllProduct();
      console.log(products);
      products.forEach(item => {
        const itemEl = this.createEl('div', '', 'item', main);
        this.createEl('a', item.name, 'item__name', itemEl, `/#/p/${item._id}`);
        const image = `<img src="${item.image}" class="img-thumbnail" alt="image">`
        this.createEl('div', image, 'image-container', itemEl)
        this.createEl('div', item.year, 'item__year', itemEl);
      });

      filtersAndCards.innerHTML += `
            <section class="filters-wrapper">
              <div class="filters-content"> 
                <p class="filters-content_name">Clothes</p>
                <div id="select-clothes" class="filters-content__clother filter-box">
                </div>
                <div><hr style="border: 1px solid #E5E8ED"></div>
                <p class="filters-content_name">Size</p>
                <div id="select-size" class="filters-content__size filter-box">
                </div>
                <div><hr style="border: 1px solid #E5E8ED"></div>
                <p class="filters-content_name">Color</p>
                <div id="select-color" class="filters-content__color filter-box">
                </div>
                <div><hr style="border: 1px solid #E5E8ED"></div>
                <p class="filters-content_name">Brand</p>
                <div id="select-brand" class="filters-content__brand filter-box">
                </div>
                <div><hr style="border: 1px solid #E5E8ED"></div>
                <p class="filters-content_name">Price</p>
                <div id="select-price" class="filters-content__price filter-box">
                </div>
                <div><hr style="border: 1px solid #E5E8ED"></div>
              </div>
            </section>
            `;

      const changeView = document.getElementById('change-view') as HTMLElement;
      if (changeView !== undefined)
        changeView.addEventListener("click", () => {
          if (changeView.classList.contains('change-view__onclick')) {
            changeView.classList.remove('change-view__onclick');
            changeView.classList.add('change-view__offclick');
          }
          else {
            changeView.classList.add('change-view__onclick');
            changeView.classList.remove('change-view__offclick');
          }
        });

      const hideFilters = document.getElementById('show-filters') as HTMLElement;
      if (hideFilters !== undefined)
        hideFilters.addEventListener("click", () => {
          const filtersContent = document.getElementsByClassName("filters-wrapper")[0] as HTMLElement;
          if (filtersContent.classList.contains('hide')) {
            filtersContent.classList.remove('hide');
            filtersContent.classList.add('show');
          }
          else {
            filtersContent.classList.add('hide');
            filtersContent.classList.remove('show');
          }
        });

      function getClothes() {
        const coverClothes = document.getElementById('select-clothes') as HTMLSelectElement;
        const arrCoverClothes: string[] = [];
        for (let i = 0; i < products.length; i += 1) {
          let categoryName = products[i].category.toLowerCase();
          if (!arrCoverClothes.includes(categoryName)) {
            arrCoverClothes.push(categoryName);
            let amount = 0;
            products.forEach(e => {
              if (e.category === products[i].category) {
                amount += 1;
              }
            });
            if (coverClothes !== null)
              categoryName = categoryName[0].toUpperCase() + categoryName.slice(1);
            coverClothes.innerHTML += `
                  <input type="checkbox" id="${categoryName}" class="filter-clothes__checkbox filter-checkbox" value="${categoryName}">
                  <label for="${categoryName}" class="filter-clothes__label filter-label">${categoryName} (${amount})</label>
                  `;
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
          let amount = 0;
          products.forEach(e => {
            if (e.variant === products[i].variant) {
              amount += 1;
            }
          });
          arr.forEach(e => {
            const variantName = e.split(':')[0];
            if (!arrCoverSize.includes(variantName)) {
              arrCoverSize.push(variantName);
              if (coverSize !== null)
                coverSize.innerHTML += `
                    <input type="checkbox" id="${variantName.split(':')[0]}" class="filter-size__checkbox filter-checkbox" value="${variantName}">
                    <label for="${variantName}" class="filter-size__label filter-label">${variantName} (${amount})</label>
                    `;
            }
          })
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
          let brandName = products[i].brand.toLowerCase();
          if (!arrCoverBrand.includes(brandName)) {
            arrCoverBrand.push(brandName);
            let amount = 0;
            products.forEach(e => {
              if (e.brand === products[i].brand) {
                amount += 1;
              }
            });
            if (coverBrand !== null)
              brandName = brandName[0].toUpperCase() + brandName.slice(1);
            coverBrand.innerHTML += `
                  <input type="checkbox" id="${brandName}" class="filter-clothes__checkbox filter-checkbox" value="${brandName}">
                  <label for="${brandName}" class="filter-clothes__label filter-label">${brandName} (${amount})</label>
                  `;
          }
        }
      }
      getBrand();

    })().catch(err => { console.error(err) });
    return filtersAndCards;
  }
}

export default CatalogView;