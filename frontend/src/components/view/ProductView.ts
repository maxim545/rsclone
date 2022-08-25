import { ICartProduct, IProduct } from "../types";
import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";

class ProductView extends Element {

  private api: Api

  private controller: Controller;

  constructor() {
    super();
    this.api = new Api();
    this.controller = new Controller();
  }

  create() {
    const id = window.location.hash.replace("#", "").slice(3);


    const productEl = this.createEl('div', '', 'main-container', null);
    (async () => {
      const product = await this.api.getProduct(id) as IProduct;
      const productData: ICartProduct = {
        ...product,
        color: '',
        size: '',
        stock: '',
      }
      const itemEl = this.createEl('div', '', 'item', productEl);
      if (product) {
        const temp = product?.variant?.split(`, `)[0].split(`:`)[1];
        const stockNumber = +temp;
        itemEl.innerHTML = `
                    <div class='item__heading'>
                      <h3>${product.name}</h3>
                      <span>Art. No. ${product._id.slice(0, 10)}</span>
                    </div>
                    <div class="item__content">
                      <div class="item__imgs">
                        <img src="${product.image}" alt="Product photo">
                      </div>
                      <div class="item__text">
                        <div class="item__prices">
                          <b>$${product.price}</b>
                        </div>
                        <form>
                        <div class="item__colors">
                          <span>Color</span>
                          <div class="item__radios">
                            ${this.getColorBtns(product.color)}
                          </div>
                        </div>
                        <div class="item__sizes">
                          <span>Size</span>
                          ${this.getSizesSelect(product.variant)}
                        </div>
                        <div class="item__btns">
                          <input class="item__stock" type="number" name="stock-number" min="1" max="${stockNumber}" value="1">
                          ${this.getAddBtn()}
                          ${this.getFavBtn()}
                        </div>
                        </form>
                        <div class="item__delivery">
                          <h4>Delivery</h4>
                          <span>Free standard shipping on orders <b>over $35</b> before tax, plus free returns.</span>
                          <table>
                            <tr>
                              <th>Type</th>
                              <th>How Long</th>
                              <th>How Much</th>
                            </tr>
                            <tr>
                              <td>Standard delivery</td>
                              <td>1-4 business days</td>
                              <td>$4.50</td>
                            </tr>
                            <tr>
                              <td>Express delivery</td>
                              <td>1 business day</td>
                              <td>$10.00</td>
                            </tr>
                            <tr>
                              <td>Pick up in store</td>
                              <td>1-3 business days</td>
                              <td>Free</td>
                            </tr>
                          </table>
                        </div>
                        <div class="item__socials">
                          <b>Share:</b>
                          ${this.getSocials()}
                        </div>
                        <div class="item__pays">
                          ${this.getPayIcons()}
                        </div>
                      </div>
                    </div>
                `;
        const colorSpan = document.querySelector(`.item__color-span`);
        const colorBtns = document.querySelector(`.item__colors`);
        colorBtns?.addEventListener(`click`, (e) => {
          const ev = e?.target as HTMLElement;
          const radio = ev?.closest(`input`) as HTMLInputElement;
          if (radio && colorSpan) {
            colorSpan.textContent = radio.value;
          }
        })
        const colorRadios = colorBtns?.querySelectorAll(`.item__radio`) as NodeListOf<HTMLInputElement>;

        for (const radio of colorRadios) {
          radio.style.setProperty('--color', `${radio.value}`);
        }
        const addCartBtn = document.querySelector(`.item .item__cart`);


        const sizeSelect = document.querySelector(`.item__size`);
        sizeSelect?.addEventListener(`change`, (event) => {
          const select = event.currentTarget as HTMLSelectElement;
          const arr = product.variant.split(/:|, /);
          const ind = arr.indexOf(String(select.value));
          const stock = document.querySelector(`.item__stock`) as HTMLInputElement;
          if (stock) {
            stock.max = arr[ind + 1];
            stock.value = String(Math.min(+stock.value, +arr[ind + 1]));
          }
          productData.size = select.value;
          productData.stock = stock.value;
        });

        addCartBtn?.addEventListener('click', () => {
          if (typeof colorSpan?.textContent === 'string' && productData.size && productData.stock) {
            productData.color = colorSpan?.textContent;
            this.controller.addToCart(productData)
            alert('Product successfully added')
          } else {
            alert('Please choose color, size and amount')
          }
        });
      }
    })().catch(err => { console.error(err) });
    return productEl;
  }

  getColorBtns(colors: string) {
    if (typeof colors !== `string` || colors.length === 0) {
      console.log('Error in ProductView getColorBtns');
      return ``;
    }
    const arr = colors.split(`, `);
    let res = `<input class="item__radio" type="radio" id="good-color-${arr[0]}" name="good-colors" value="${arr[0]}" checked>`;
    let i = 1;
    while (i !== arr.length) {
      res = `${res}
              <input class="item__radio" type="radio" id="good-color-${arr[i]}" name="good-colors" value="${arr[i]}">
              `;
      i += 1;
    }
    res = `${res}
              <span class="item__color-span">${arr[0]}</span>
              `;
    return res;
  }

  getSizesSelect(sizes: string) {
    const arr = sizes.split(`, `);
    let res = `<select class="item__size" name="select-size">
            <option value="" disabled selected>Please select</option>
            `;
    for (const size of arr) {
      res = `${res}
              <option value="${size.split(`:`)[0]}">${size.split(`:`)[0]}</option>
              `;
    }
    res = `${res}
          </select>
          `;
    return res;
  }

  getAddBtn() {
    return `
          <button type="button" class="item__cart">
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M2.5944 2.00567C2.52929 2.00077 2.43894 2.00033 2.2695 2.00033H1.16667C0.798477 2.00033 0.5 1.70185 0.5 1.33366C0.5 0.965472 0.798477 0.666995 1.16667 0.666995H2.2695C2.27578 0.666995 2.28207 0.666995 2.28835 0.666994C2.43146 0.666976 2.57315 0.666959 2.69458 0.676108C2.82971 0.686289 2.9867 0.710203 3.14911 0.782649C3.37767 0.884606 3.57293 1.04883 3.71254 1.25655C3.81174 1.40415 3.8622 1.55472 3.89538 1.6861C3.9252 1.80417 3.94946 1.94377 3.97397 2.08476C3.97504 2.09095 3.97612 2.09714 3.9772 2.10334L4.13605 3.01672L12.812 3.27354C13.152 3.28359 13.4458 3.29228 13.6878 3.31893C13.9436 3.34709 14.1971 3.40006 14.4404 3.52964C14.809 3.726 15.1068 4.03282 15.2922 4.40704C15.4145 4.65401 15.46 4.90903 15.4805 5.16551C15.5 5.40816 15.5 5.7021 15.5 6.04223V6.0914C15.5 6.41104 15.5 6.68832 15.4821 6.91825C15.4631 7.16209 15.4213 7.40428 15.3095 7.64159C15.1395 8.0028 14.8653 8.30485 14.5221 8.50888C14.2967 8.64293 14.0597 8.70794 13.8188 8.75033C13.5917 8.79029 13.3157 8.81699 12.9975 8.84777L6.50826 9.47576C6.18213 9.50733 5.89956 9.53469 5.66381 9.53884C5.41403 9.54323 5.1636 9.52383 4.91219 9.43147C4.53514 9.29296 4.20854 9.04413 3.97491 8.71737C3.81913 8.49949 3.73395 8.2632 3.67188 8.02121C3.6133 7.79282 3.56467 7.51313 3.50854 7.19033L2.66358 2.33179C2.63455 2.16486 2.61864 2.07591 2.60265 2.01261C2.60208 2.01036 2.60153 2.00822 2.601 2.0062C2.59891 2.00602 2.59672 2.00585 2.5944 2.00567ZM4.36923 4.35754L4.81796 6.93772C4.8795 7.29156 4.9195 7.51875 4.96341 7.68995C5.00529 7.85324 5.03842 7.91236 5.05953 7.94188C5.1374 8.0508 5.24627 8.13375 5.37195 8.17992C5.40602 8.19243 5.47181 8.20868 5.64036 8.20571C5.81708 8.2026 6.04674 8.18086 6.40421 8.14627L12.8451 7.52296C13.1941 7.48919 13.4178 7.46706 13.5877 7.43717C13.7495 7.40869 13.8099 7.38114 13.8407 7.36283C13.9551 7.29482 14.0465 7.19413 14.1032 7.07373C14.1184 7.0413 14.1401 6.97853 14.1528 6.81474C14.1662 6.64279 14.1667 6.41791 14.1667 6.06733C14.1667 5.695 14.1662 5.45509 14.1515 5.2722C14.1374 5.0972 14.1136 5.03159 14.0974 4.99887C14.0356 4.87412 13.9363 4.77185 13.8135 4.7064C13.7812 4.68923 13.7164 4.66346 13.5418 4.64424C13.3595 4.62416 13.1197 4.61656 12.7475 4.60554L4.36923 4.35754Z"
                      fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M6.16667 11.667C5.79848 11.667 5.5 11.9655 5.5 12.3337C5.5 12.7018 5.79848 13.0003 6.16667 13.0003C6.53486 13.0003 6.83333 12.7018 6.83333 12.3337C6.83333 11.9655 6.53486 11.667 6.16667 11.667ZM4.16667 12.3337C4.16667 11.2291 5.0621 10.3337 6.16667 10.3337C7.27124 10.3337 8.16667 11.2291 8.16667 12.3337C8.16667 13.4382 7.27124 14.3337 6.16667 14.3337C5.0621 14.3337 4.16667 13.4382 4.16667 12.3337Z"
                      fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M12.5 11.667C12.1318 11.667 11.8333 11.9655 11.8333 12.3337C11.8333 12.7018 12.1318 13.0003 12.5 13.0003C12.8682 13.0003 13.1667 12.7018 13.1667 12.3337C13.1667 11.9655 12.8682 11.667 12.5 11.667ZM10.5 12.3337C10.5 11.2291 11.3954 10.3337 12.5 10.3337C13.6046 10.3337 14.5 11.2291 14.5 12.3337C14.5 13.4382 13.6046 14.3337 12.5 14.3337C11.3954 14.3337 10.5 13.4382 10.5 12.3337Z"
                      fill="white"/>
            </svg>
            <span>Add to cart</span>
          </button>
        `;
  }

  getFavBtn() {
    return `
          <button type="button" class="item__favourite">
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.99925 12.2715C4.93321 10.5252 3.22318 8.78955 2.39626 7.28361C1.54992 5.74228 1.62377 4.4441 2.0934 3.52273C3.05872 1.62892 5.80378 1.02333 7.4763 3.13865L7.99921 3.80001L8.52217 3.13868C10.195 1.02327 12.9402 1.62896 13.9055 3.52273C14.3751 4.44409 14.4489 5.74226 13.6025 7.28359C12.7756 8.78954 11.0654 10.5252 7.99925 12.2715ZM7.99928 1.73726C5.64647 -0.498482 2.17555 0.425546 0.905488 2.91723C0.20846 4.2847 0.198939 6.05212 1.22753 7.92536C2.247 9.78198 4.2796 11.7417 7.67675 13.6194L7.99924 13.7976L8.32173 13.6194C11.719 11.7417 13.7517 9.78199 14.7712 7.92538C15.7999 6.05214 15.7904 4.28472 15.0934 2.91723C13.8233 0.425498 10.3523 -0.498448 7.99928 1.73726Z"
                      fill="#17696A"/>
            </svg>
            <span>Favourite</span>
          </button>
        `;
  }

  getSocials() {
    return `
          <a href="https://www.facebook.com/">
          <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.63733 0.836822L7.32294 0.833008C4.72281 0.833008 3.04249 2.60392 3.04249 5.34487V7.42513H0.715477C0.514396 7.42513 0.351562 7.59259 0.351562 7.79915V10.8132C0.351562 11.0198 0.514582 11.187 0.715477 11.187H3.04249V18.7925C3.04249 18.9991 3.20532 19.1663 3.4064 19.1663H6.44249C6.64357 19.1663 6.80641 18.9989 6.80641 18.7925V11.187H9.52723C9.72831 11.187 9.89114 11.0198 9.89114 10.8132L9.89225 7.79915C9.89225 7.69997 9.85382 7.60499 9.78568 7.5348C9.71754 7.46461 9.6247 7.42513 9.52815 7.42513H6.80641V5.66166C6.80641 4.81407 7.00303 4.38379 8.07788 4.38379L9.63696 4.38322C9.83785 4.38322 10.0007 4.21576 10.0007 4.00939V1.21065C10.0007 1.00447 9.83804 0.837204 9.63733 0.836822Z"
                    fill="#787A80"/>
          </svg>
          </a>
          <a href="https://twitter.com/">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.75 1.8106C17.1059 2.08388 16.4148 2.26922 15.6887 2.35196C16.4301 1.92683 16.9976 1.25252 17.2666 0.451489C16.5711 0.845186 15.8035 1.13106 14.9855 1.28603C14.3305 0.616946 13.3988 0.200195 12.3653 0.200195C10.3827 0.200195 8.77523 1.73942 8.77523 3.63674C8.77523 3.90583 8.80694 4.16865 8.86819 4.41997C5.88501 4.2765 3.23973 2.90797 1.46928 0.828429C1.1598 1.33523 0.983743 1.92576 0.983743 2.55613C0.983743 3.74878 1.618 4.8011 2.58033 5.41677C1.992 5.39793 1.43866 5.24296 0.954233 4.98537V5.0283C0.954233 6.69317 2.19213 8.08265 3.83353 8.39888C3.5328 8.47637 3.21568 8.5193 2.88761 8.5193C2.6558 8.5193 2.43161 8.49732 2.2118 8.45542C2.66889 9.82188 3.99429 10.8156 5.56463 10.8428C4.33657 11.7642 2.7881 12.3119 1.10624 12.3119C0.816463 12.3119 0.53103 12.2951 0.25 12.2647C1.83893 13.2417 3.7253 13.8113 5.75273 13.8113C12.3566 13.8113 15.9665 8.57376 15.9665 4.0315L15.9544 3.5865C16.6597 3.1048 17.2699 2.49959 17.75 1.8106Z"
                    fill="#787A80"/>
          </svg>
          </a>
          <a href="https://ru.pinterest.com/">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.25117 0.833008C3.19014 0.833772 0.5 4.05361 0.5 7.56449C0.5 9.19236 1.4162 11.2236 2.8832 11.8675C3.30168 12.0547 3.24629 11.8263 3.60631 10.4589C3.63478 10.3451 3.62016 10.2465 3.52785 10.1404C1.43082 7.73179 3.1186 2.78019 7.95192 2.78019C14.9469 2.78019 13.6399 12.3916 9.16891 12.3916C8.01654 12.3916 7.15803 11.4932 7.42959 10.3818C7.75883 9.05792 8.40348 7.63477 8.40348 6.68066C8.40348 4.2759 4.7956 4.63264 4.7956 7.81887C4.7956 8.80354 5.14639 9.46813 5.14639 9.46813C5.14639 9.46813 3.98556 14.1249 3.77017 14.9949C3.40553 16.4677 3.8194 18.8519 3.85556 19.0574C3.87787 19.1704 4.00556 19.2063 4.07711 19.1131C4.19173 18.9642 5.59488 16.9765 5.98797 15.5396C6.13106 15.0163 6.71801 12.8927 6.71801 12.8927C7.10495 13.5863 8.2204 14.1669 9.40892 14.1669C12.9445 14.1669 15.5 11.0807 15.5 7.25129C15.4877 3.57999 12.3237 0.833008 8.25117 0.833008V0.833008Z"
                    fill="#787A80"/>
          </svg>
          </a>
        `;
  }

  getPayIcons() {
    return `
          <div>
            <svg width="72" height="24" viewBox="0 0 72 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.8266 22.6849H25.0242L28.6506 0.398231H34.4536L30.8266 22.6849ZM20.1429 0.398231L14.6112 15.7272L13.9566 12.4263L13.9572 12.4274L12.0048 2.40489C12.0048 2.40489 11.7687 0.398231 9.25233 0.398231H0.107308L0 0.775597C0 0.775597 2.79656 1.35744 6.06945 3.32297L11.1105 22.6855H17.1561L26.3876 0.398231H20.1429ZM65.7815 22.6849H71.1094L66.4641 0.397635H61.7998C59.6459 0.397635 59.1213 2.05852 59.1213 2.05852L50.4675 22.6849H56.5161L57.7257 19.3744H65.1019L65.7815 22.6849ZM59.3967 14.8013L62.4454 6.46113L64.1606 14.8013H59.3967ZM50.9212 5.75766L51.7492 0.971731C51.7492 0.971731 49.1941 0 46.5305 0C43.6511 0 36.8132 1.25848 36.8132 7.37801C36.8132 13.1357 44.8386 13.2072 44.8386 16.2315C44.8386 19.2558 37.64 18.7139 35.2644 16.8068L34.4017 21.8109C34.4017 21.8109 36.9926 23.0694 40.9511 23.0694C44.9107 23.0694 50.8842 21.0192 50.8842 15.4392C50.8842 9.6446 42.7866 9.10508 42.7866 6.58573C42.7872 4.06578 48.4382 4.38949 50.9212 5.75766Z"
                      fill="#2566AF"/>
                <path d="M13.9572 12.4267L12.0048 2.40412C12.0048 2.40412 11.7687 0.397461 9.25233 0.397461H0.107308L0 0.774827C0 0.774827 4.39545 1.68575 8.61146 5.09874C12.6427 8.3609 13.9572 12.4267 13.9572 12.4267Z"
                      fill="#E6A540"/>
            </svg>
          </div>
          <div>
            <svg width="55" height="42" viewBox="0 0 55 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M53.1984 41.4262V41.5341H53.2991C53.318 41.5344 53.3366 41.5297 53.3531 41.5204C53.3596 41.5157 53.3649 41.5095 53.3684 41.5023C53.372 41.4951 53.3736 41.4871 53.3733 41.4791C53.3736 41.4712 53.372 41.4634 53.3684 41.4563C53.3649 41.4493 53.3596 41.4433 53.3531 41.4388C53.3368 41.4291 53.318 41.4243 53.2991 41.4251H53.1984V41.4262ZM53.3002 41.3498C53.3433 41.3471 53.386 41.3595 53.4211 41.3849C53.4351 41.3964 53.4463 41.411 53.4536 41.4276C53.461 41.4442 53.4643 41.4623 53.4634 41.4804C53.4641 41.496 53.4614 41.5116 53.4555 41.5261C53.4496 41.5405 53.4408 41.5536 53.4294 41.5643C53.4024 41.5878 53.3685 41.6019 53.3328 41.6046L53.4678 41.7584H53.3638L53.2397 41.6056H53.1995V41.7584H53.1126V41.35H53.3015L53.3002 41.3498ZM53.2732 41.8993C53.3187 41.8997 53.3639 41.8905 53.4057 41.8723C53.446 41.855 53.4826 41.8301 53.5136 41.7992C53.5447 41.7682 53.5696 41.7316 53.5868 41.6912C53.6222 41.6057 53.6222 41.5095 53.5868 41.424C53.5693 41.3838 53.5445 41.3472 53.5136 41.316C53.4826 41.2851 53.446 41.2603 53.4057 41.2429C53.3636 41.2257 53.3186 41.217 53.2732 41.2175C53.227 41.2171 53.1811 41.2257 53.1382 41.2429C53.097 41.2599 53.0596 41.2848 53.0278 41.316C52.9801 41.365 52.9478 41.427 52.935 41.4941C52.9222 41.5613 52.9294 41.6308 52.9558 41.6939C52.9722 41.7344 52.9967 41.7711 53.0278 41.8019C53.0596 41.8331 53.0971 41.858 53.1382 41.875C53.1809 41.8932 53.2268 41.9024 53.2732 41.902V41.8993ZM53.2732 41.1193C53.3918 41.1192 53.5057 41.1657 53.5903 41.2488C53.6311 41.2888 53.6636 41.3364 53.6858 41.3889C53.7089 41.4429 53.7208 41.5009 53.7208 41.5596C53.7208 41.6183 53.7089 41.6764 53.6858 41.7303C53.663 41.7826 53.6306 41.8301 53.5903 41.8704C53.5489 41.9101 53.5007 41.9421 53.4481 41.9649C53.3928 41.9884 53.3332 42.0003 53.2732 42C53.2124 42.0004 53.1521 41.9885 53.0961 41.9649C53.0429 41.9426 52.9942 41.9106 52.9528 41.8704C52.9125 41.8286 52.8805 41.7795 52.8586 41.7257C52.8355 41.6718 52.8236 41.6137 52.8236 41.555C52.8236 41.4964 52.8355 41.4383 52.8586 41.3843C52.8809 41.3318 52.9134 41.2842 52.9541 41.2443C52.995 41.2034 53.0438 41.1712 53.0975 41.1498C53.1535 41.1262 53.2137 41.1143 53.2745 41.1147L53.2732 41.1193ZM11.9469 39.5423C11.9469 38.7636 12.457 38.124 13.2907 38.124C14.0874 38.124 14.625 38.7361 14.625 39.5423C14.625 40.3485 14.0874 40.9606 13.2907 40.9606C12.457 40.9606 11.9469 40.3209 11.9469 39.5423ZM15.5332 39.5423V37.3265H14.57V37.8662C14.2645 37.4673 13.801 37.2172 13.1708 37.2172C11.9293 37.2172 10.955 38.1909 10.955 39.5434C10.955 40.8958 11.9288 41.8696 13.1708 41.8696C13.8008 41.8696 14.2645 41.6191 14.57 41.2205V41.7584H15.5322V39.5423H15.5332ZM48.0804 39.5423C48.0804 38.7636 48.5905 38.124 49.4245 38.124C50.222 38.124 50.7588 38.7361 50.7588 39.5423C50.7588 40.3485 50.222 40.9606 49.4245 40.9606C48.5908 40.9606 48.0804 40.3209 48.0804 39.5423ZM51.6678 39.5423V35.5479H50.7038V37.8662C50.3982 37.4673 49.9348 37.2172 49.3046 37.2172C48.0631 37.2172 47.0888 38.1909 47.0888 39.5434C47.0888 40.8958 48.0626 41.8696 49.3046 41.8696C49.9348 41.8696 50.3982 41.6191 50.7038 41.2205V41.7584H51.6678V39.5423ZM27.4885 38.0784C28.1093 38.0784 28.5079 38.4676 28.6096 39.1528H26.3112C26.414 38.5132 26.8024 38.0784 27.4888 38.0784H27.4885ZM27.5079 37.2147C26.2097 37.2147 25.3015 38.1594 25.3015 39.5409C25.3015 40.9495 26.2462 41.8672 27.5724 41.8672C28.2396 41.8672 28.8507 41.7006 29.3883 41.2464L28.9162 40.5325C28.5449 40.8294 28.072 40.9959 27.6275 40.9959C27.0067 40.9959 26.4416 40.7085 26.3026 39.911H29.5918C29.6012 39.7911 29.6109 39.6702 29.6109 39.5407C29.6012 38.1596 28.7473 37.2145 27.5074 37.2145L27.5079 37.2147ZM39.1372 39.5407C39.1372 38.762 39.6473 38.1224 40.481 38.1224C41.2777 38.1224 41.8153 38.7345 41.8153 39.5407C41.8153 40.3469 41.2777 40.959 40.481 40.959C39.6473 40.959 39.1369 40.3193 39.1369 39.5407H39.1372ZM42.7232 39.5407V37.3265H41.7605V37.8662C41.4539 37.4673 40.9916 37.2172 40.3614 37.2172C39.1199 37.2172 38.1456 38.1909 38.1456 39.5434C38.1456 40.8958 39.1193 41.8696 40.3614 41.8696C40.9916 41.8696 41.4539 41.6191 41.7605 41.2205V41.7584H42.7235V39.5423L42.7232 39.5407ZM33.6974 39.5407C33.6974 40.8845 34.6329 41.8669 36.0606 41.8669C36.7278 41.8669 37.1723 41.7185 37.653 41.3387L37.1904 40.5601C36.8287 40.82 36.449 40.959 36.0299 40.959C35.2609 40.9495 34.6955 40.3935 34.6955 39.5407C34.6955 38.6878 35.2609 38.1321 36.0299 38.1224C36.4479 38.1224 36.8277 38.2614 37.1904 38.5213L37.653 37.7426C37.1715 37.3629 36.727 37.2145 36.0606 37.2145C34.6329 37.2145 33.6974 38.1966 33.6974 39.5407ZM46.1153 37.2145C45.5596 37.2145 45.1976 37.4744 44.9474 37.8636V37.3265H43.9928V41.756H44.9572V39.2729C44.9572 38.5399 45.2721 38.1326 45.9018 38.1326C46.108 38.1297 46.3127 38.1675 46.5042 38.2441L46.8011 37.3362C46.5879 37.2522 46.3099 37.2153 46.1147 37.2153L46.1153 37.2145ZM20.2955 37.6787C19.8321 37.3732 19.1935 37.2153 18.4891 37.2153C17.3669 37.2153 16.6444 37.7532 16.6444 38.6333C16.6444 39.3555 17.1823 39.8011 18.1728 39.9401L18.6278 40.0049C19.156 40.0791 19.4054 40.2181 19.4054 40.4683C19.4054 40.8108 19.0545 41.0062 18.3957 41.0062C17.7286 41.0062 17.2471 40.793 16.9224 40.5428L16.4698 41.2939C16.998 41.6831 17.6651 41.8688 18.3876 41.8688C19.6669 41.8688 20.4083 41.2664 20.4083 40.423C20.4083 39.6443 19.8248 39.237 18.8608 39.098L18.4068 39.0322C17.9898 38.9782 17.6557 38.8943 17.6557 38.5974C17.6557 38.2735 17.9707 38.0787 18.4991 38.0787C19.0645 38.0787 19.6119 38.2919 19.8802 38.4584L20.2971 37.6798L20.2955 37.6787ZM32.7245 37.2161C32.1687 37.2161 31.8068 37.476 31.5577 37.8652V37.3265H30.6031V41.756H31.5663V39.2729C31.5663 38.5399 31.8813 38.1326 32.511 38.1326C32.7172 38.1297 32.9219 38.1675 33.1134 38.2441L33.4103 37.3362C33.197 37.2522 32.919 37.2153 32.7239 37.2153L32.7245 37.2161ZM24.5045 37.3265H22.9294V35.9827H21.9556V37.3265H21.0572V38.2069H21.9556V40.2276C21.9556 41.2553 22.3546 41.8674 23.494 41.8674C23.9121 41.8674 24.3936 41.7379 24.6991 41.5249L24.4209 40.7001C24.1334 40.8667 23.8185 40.9506 23.568 40.9506C23.0865 40.9506 22.9294 40.6537 22.9294 40.2092V38.2077H24.5045V37.3265ZM10.1032 41.7571V38.9771C10.1032 37.9302 9.43604 37.2258 8.36051 37.2163C7.79508 37.2069 7.21183 37.3829 6.80348 38.0044C6.49796 37.5132 6.01647 37.2163 5.33957 37.2163C4.86645 37.2163 4.40412 37.3553 4.04219 37.8741V37.3265H3.07812V41.756H4.04975V39.2999C4.04975 38.531 4.47618 38.1224 5.13472 38.1224C5.77437 38.1224 6.09798 38.5394 6.09798 39.2902V41.7554H7.07176V39.2994C7.07176 38.5305 7.51628 38.1218 8.15566 38.1218C8.81339 38.1218 9.12728 38.5388 9.12728 39.2897V41.7549L10.1032 41.7571Z"
                      fill="#231F20"/>
                <path d="M53.7496 27.0218V26.374H53.5809L53.3858 26.8185L53.1918 26.374H53.0225V27.0218H53.1424V26.5338L53.3248 26.9548H53.449L53.6314 26.5327V27.0218H53.7502H53.7496ZM52.6795 27.0218V26.485H52.8954V26.3756H52.3438V26.485H52.5597V27.0218H52.6784H52.6795Z"
                      fill="#F79410"/>
                <path d="M34.578 29.8012H19.9805V3.56738H34.5783L34.578 29.8012Z" fill="#FF5F00"/>
                <path d="M20.9051 16.6841C20.9051 11.3626 23.3968 6.62216 27.2768 3.56722C24.3398 1.25138 20.7073 -0.0055082 16.9671 1.81463e-05C7.75369 1.81463e-05 0.285156 7.46963 0.285156 16.6841C0.285156 25.8986 7.75369 33.3682 16.9671 33.3682C20.7073 33.3738 24.34 32.1169 27.2771 29.801C23.3973 26.7466 20.9051 22.0059 20.9051 16.6841Z"
                      fill="#EB001B"/>
                <path d="M54.2706 16.6841C54.2706 25.8986 46.8021 33.3682 37.5887 33.3682C33.848 33.3737 30.2149 32.1168 27.2773 29.801C31.1584 26.7461 33.6501 22.0059 33.6501 16.6841C33.6501 11.3623 31.1584 6.62216 27.2773 3.56722C30.2149 1.25145 33.8478 -0.00541134 37.5884 1.75133e-05C46.8018 1.75133e-05 54.2703 7.46963 54.2703 16.6841"
                      fill="#F79E1B"/>
            </svg>
          </div>
          <div>
            <svg width="78" height="21" viewBox="0 0 78 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.2745 2.38137C13.3584 1.3372 11.7024 0.889542 9.58398 0.889542H3.43554C3.22583 0.889429 3.02296 0.964169 2.86345 1.10031C2.70394 1.23645 2.59825 1.42505 2.5654 1.63217L0.00642579 17.8698C-0.0054398 17.9452 -0.000834347 18.0222 0.0199251 18.0956C0.0406846 18.1689 0.0771046 18.2369 0.126676 18.2949C0.176247 18.3528 0.237791 18.3993 0.307067 18.4312C0.376344 18.4631 0.451706 18.4796 0.527962 18.4795H4.32374L5.27706 12.4328L5.24751 12.6222C5.27973 12.4155 5.38471 12.2271 5.54354 12.0909C5.70237 11.9548 5.90461 11.8798 6.11382 11.8796H7.91758C11.4611 11.8796 14.2357 10.4403 15.0462 6.27675C15.0702 6.15361 15.091 6.03376 15.1091 5.91665C15.3499 4.37776 15.1074 3.33031 14.2751 2.38191"
                      fill="#003087"/>
                <path d="M60.7441 10.108C60.5121 11.6316 59.3486 11.6316 58.2234 11.6316H57.5831L58.0324 8.78693C58.0598 8.6151 58.2076 8.48868 58.3816 8.48868H58.6755C59.4416 8.48868 60.1651 8.48868 60.5383 8.92484C60.7611 9.18589 60.8284 9.57334 60.7441 10.108ZM60.2543 6.13274H56.0098C55.8692 6.13281 55.7332 6.18298 55.6263 6.27425C55.5194 6.36552 55.4485 6.49192 55.4264 6.63074L53.7113 17.5141C53.7034 17.5645 53.7065 17.6161 53.7204 17.6652C53.7343 17.7143 53.7587 17.7599 53.7919 17.7987C53.825 17.8376 53.8662 17.8688 53.9126 17.8902C53.9589 17.9116 54.0094 17.9228 54.0604 17.9229H56.2385C56.4416 17.9229 56.6145 17.7751 56.6462 17.5748L57.1333 14.4883C57.1782 14.202 57.4255 13.9903 57.7156 13.9903H59.0585C61.855 13.9903 63.4683 12.638 63.8897 9.95588C64.0796 8.78365 63.8974 7.86207 63.3485 7.21685C62.7449 6.50761 61.675 6.13219 60.2548 6.13219"
                      fill="#009CDE"/>
                <path d="M30.4707 10.1081C30.2387 11.6317 29.0752 11.6317 27.9495 11.6317H27.3092L27.7585 8.78704C27.7859 8.6152 27.9337 8.48878 28.1077 8.48878H28.4016C29.1677 8.48878 29.8912 8.48878 30.2644 8.92495C30.4877 9.18599 30.555 9.57345 30.4707 10.1081ZM29.981 6.13284H25.7364C25.4464 6.13284 25.199 6.34408 25.1536 6.63084L23.4379 17.5142C23.43 17.5646 23.433 17.6162 23.4469 17.6654C23.4607 17.7146 23.4851 17.7602 23.5183 17.799C23.5515 17.8379 23.5927 17.8691 23.6391 17.8905C23.6855 17.9119 23.736 17.9229 23.7871 17.923H25.8141C26.1042 17.923 26.351 17.7117 26.3964 17.4249L26.8599 14.4889C26.9048 14.2022 27.1522 13.9909 27.4422 13.9909H28.7852C31.5817 13.9909 33.195 12.6381 33.6164 9.95598C33.8063 8.78375 33.624 7.86217 33.0751 7.21696C32.4715 6.50771 31.4016 6.13229 29.9815 6.13229L29.981 6.13284ZM39.8354 14.0155C39.6384 15.1768 38.7174 15.9567 37.5413 15.9567C36.9519 15.9567 36.4796 15.7668 36.1765 15.4078C35.8755 15.052 35.7627 14.5447 35.858 13.9805C36.0407 12.8291 36.9776 12.0246 38.1356 12.0246C38.713 12.0246 39.1809 12.2162 39.4906 12.5784C39.802 12.9435 39.9246 13.4535 39.8354 14.0155ZM42.668 10.0589H40.6355C40.551 10.0588 40.4693 10.0889 40.405 10.1438C40.3408 10.1987 40.2983 10.2747 40.2853 10.3582L40.1966 10.9263L40.0543 10.7205C39.6143 10.0818 38.6331 9.86787 37.6535 9.86787C35.4081 9.86787 33.49 11.5698 33.1167 13.9559C32.9225 15.1473 33.1983 16.285 33.8736 17.0791C34.4936 17.8086 35.3786 18.1123 36.4331 18.1123C38.2434 18.1123 39.2471 16.9499 39.2471 16.9499L39.1563 17.5147C39.1483 17.5652 39.1513 17.6169 39.1652 17.6661C39.1791 17.7153 39.2036 17.7609 39.2368 17.7998C39.2701 17.8386 39.3113 17.8698 39.3578 17.8912C39.4043 17.9126 39.4548 17.9236 39.506 17.9235H41.336C41.626 17.9235 41.8734 17.7128 41.9188 17.4255L43.0177 10.4682C43.0256 10.4177 43.0225 10.366 43.0085 10.3168C42.9945 10.2676 42.9701 10.222 42.9368 10.1831C42.9035 10.1443 42.8622 10.1131 42.8157 10.0917C42.7692 10.0704 42.7186 10.0594 42.6675 10.0594"
                      fill="#003087"/>
                <path d="M70.1076 14.0155C69.9106 15.1768 68.9896 15.9567 67.8135 15.9567C67.2241 15.9567 66.7518 15.7668 66.4486 15.4078C66.1476 15.052 66.0349 14.5447 66.1301 13.9805C66.3129 12.8291 67.2493 12.0246 68.4078 12.0246C68.9852 12.0246 69.4531 12.2162 69.7628 12.5784C70.0742 12.9435 70.1968 13.4535 70.1076 14.0155ZM72.9402 10.0589H70.9077C70.8232 10.0588 70.7414 10.0889 70.6772 10.1438C70.613 10.1987 70.5705 10.2747 70.5574 10.3582L70.4688 10.9263L70.3265 10.7205C69.8865 10.0818 68.9053 9.86787 67.9257 9.86787C65.6808 9.86787 63.7627 11.5698 63.3889 13.9559C63.1946 15.1473 63.471 16.285 64.1463 17.0791C64.7664 17.8086 65.6513 18.1123 66.7058 18.1123C68.5167 18.1123 69.5204 16.9499 69.5204 16.9499L69.4295 17.5147C69.4214 17.5652 69.4243 17.6168 69.438 17.666C69.4518 17.7152 69.4761 17.7609 69.5093 17.7997C69.5424 17.8386 69.5837 17.8699 69.6301 17.8912C69.6765 17.9126 69.727 17.9236 69.7781 17.9235H71.6076C71.8977 17.9235 72.145 17.7128 72.191 17.4255L73.2899 10.4682C73.2978 10.4177 73.2947 10.366 73.2807 10.3168C73.2667 10.2676 73.2423 10.222 73.209 10.1831C73.1757 10.1443 73.1344 10.1131 73.0879 10.0917C73.0414 10.0704 72.9908 10.0594 72.9397 10.0594"
                      fill="#009CDE"/>
                <path d="M53.4941 10.0592H51.4506C51.2553 10.0592 51.073 10.1561 50.9636 10.3181L48.1452 14.4685L46.9505 10.4801C46.9141 10.3584 46.8394 10.2517 46.7376 10.1758C46.6358 10.0999 46.5122 10.0589 46.3852 10.0587H44.3773C44.321 10.0587 44.2655 10.0722 44.2155 10.0979C44.1654 10.1237 44.1222 10.161 44.0895 10.2068C44.0567 10.2526 44.0354 10.3056 44.0272 10.3613C44.019 10.417 44.0242 10.4738 44.0424 10.5271L46.2916 17.1303L44.176 20.1156C44.1386 20.1686 44.1164 20.2309 44.112 20.2956C44.1076 20.3603 44.121 20.4249 44.1508 20.4825C44.1806 20.5401 44.2257 20.5884 44.2811 20.6222C44.3365 20.6559 44.4001 20.6738 44.4649 20.6738H46.5062C46.6988 20.6738 46.8799 20.5792 46.9905 20.4204L53.7842 10.6147C53.821 10.5617 53.8427 10.4996 53.8468 10.4351C53.8509 10.3707 53.8372 10.3064 53.8073 10.2491C53.7775 10.1919 53.7325 10.1439 53.6772 10.1104C53.622 10.077 53.5587 10.0592 53.4941 10.0592Z"
                      fill="#003087"/>
                <path d="M75.3366 6.43252L73.5941 17.515C73.5862 17.5655 73.5893 17.6171 73.6033 17.6663C73.6172 17.7155 73.6416 17.7611 73.6749 17.7999C73.7081 17.8388 73.7493 17.8699 73.7958 17.8913C73.8422 17.9127 73.8927 17.9238 73.9438 17.9238H75.6956C75.9856 17.9238 76.233 17.7126 76.2784 17.4258L77.9962 6.54197C78.0042 6.49145 78.0012 6.4398 77.9873 6.39059C77.9734 6.34137 77.949 6.29575 77.9157 6.25689C77.8825 6.21802 77.8412 6.18684 77.7947 6.16548C77.7482 6.14412 77.6977 6.13309 77.6465 6.13317H75.6863C75.6019 6.13295 75.5202 6.16297 75.4561 6.21779C75.3919 6.2726 75.3495 6.34859 75.3366 6.43197"
                      fill="#009CDE"/>
                <path d="M14.2745 2.38137C13.3584 1.3372 11.7024 0.889542 9.58398 0.889542H3.43554C3.22583 0.889429 3.02296 0.964169 2.86345 1.10031C2.70394 1.23645 2.59825 1.42505 2.5654 1.63217L0.00642579 17.8698C-0.0054398 17.9452 -0.000834347 18.0222 0.0199251 18.0956C0.0406846 18.1689 0.0771046 18.2369 0.126676 18.2949C0.176247 18.3528 0.237791 18.3993 0.307067 18.4312C0.376344 18.4631 0.451706 18.4796 0.527962 18.4795H4.32374L5.27706 12.4328L5.24751 12.6222C5.27973 12.4155 5.38471 12.2271 5.54354 12.0909C5.70237 11.9548 5.90461 11.8798 6.11382 11.8796H7.91758C11.4611 11.8796 14.2357 10.4403 15.0462 6.27675C15.0702 6.15361 15.091 6.03376 15.1091 5.91665C15.3499 4.37776 15.1074 3.33031 14.2751 2.38191"
                      fill="#003087"/>
                <path d="M6.30162 5.93647C6.33038 5.75549 6.4227 5.59069 6.56201 5.47163C6.70132 5.35258 6.8785 5.28708 7.06176 5.28688H11.882C12.4528 5.28688 12.9853 5.32409 13.4718 5.4018C13.7378 5.44459 14.0009 5.50344 14.2598 5.57802C14.5538 5.66068 14.8383 5.77403 15.1086 5.91622C15.3505 4.37679 15.1075 3.32988 14.2752 2.38094C13.3585 1.33732 11.703 0.889662 9.58461 0.889662H3.43563C3.22611 0.889811 3.0235 0.964668 2.86421 1.10078C2.70493 1.2369 2.5994 1.42535 2.56658 1.63229L0.00651227 17.8683C-0.00543363 17.9436 -0.00090687 18.0207 0.0197809 18.0941C0.0404687 18.1675 0.0768255 18.2355 0.126346 18.2935C0.175866 18.3515 0.237373 18.3981 0.306627 18.43C0.375882 18.462 0.451237 18.4785 0.527501 18.4785H4.32383L5.27715 12.4313L6.30162 5.93647Z"
                      fill="#003087"/>
                <path d="M15.1084 5.91594C15.0896 6.03634 15.0686 6.15639 15.0455 6.27603C14.235 10.439 11.4604 11.8789 7.91689 11.8789H6.11259C5.90341 11.879 5.70119 11.9539 5.54242 12.0901C5.38366 12.2263 5.27882 12.4148 5.24683 12.6215L4.32305 18.4782L4.06037 20.1397C4.04993 20.2057 4.05391 20.2731 4.07205 20.3374C4.09018 20.4017 4.12204 20.4612 4.16543 20.512C4.20881 20.5628 4.26269 20.6035 4.32335 20.6315C4.38401 20.6594 4.45 20.6739 4.51678 20.6738H7.7166C8.0953 20.6738 8.41709 20.398 8.47674 20.0242L8.50793 19.8612L9.11101 16.0391L9.14932 15.8279C9.17799 15.6467 9.27036 15.4818 9.40981 15.3627C9.54926 15.2436 9.72663 15.1782 9.91001 15.1783H10.3889C13.4885 15.1783 15.9156 13.9196 16.6249 10.277C16.9204 8.75565 16.7671 7.48438 15.9846 6.5918C15.7361 6.31507 15.4392 6.08603 15.1084 5.91594Z"
                      fill="#009CDE"/>
                <path d="M14.2589 5.57887C14.1352 5.5422 14.0077 5.50937 13.8763 5.48036C13.745 5.45136 13.6093 5.42564 13.4703 5.40374C12.9832 5.32439 12.4513 5.28718 11.8799 5.28718H7.06025C6.8768 5.28695 6.69932 5.35238 6.5599 5.47162C6.42049 5.59086 6.32834 5.75605 6.30011 5.93732L5.27565 12.4333L5.24609 12.6221C5.27808 12.4154 5.38293 12.2269 5.54169 12.0907C5.70046 11.9545 5.90268 11.8796 6.11185 11.8794H7.91616C11.4597 11.8794 14.2343 10.4402 15.0447 6.27662C15.0688 6.15349 15.0891 6.03419 15.1077 5.91653C14.8936 5.80453 14.6707 5.71044 14.4411 5.63523C14.3815 5.61553 14.3207 5.59693 14.2589 5.57832"
                      fill="#012169"/>
            </svg>
          </div>
        `;
  }
}

export default ProductView;