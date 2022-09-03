import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import { langData } from "../data-lang";
import { ICartProduct, IUserData, IWishListData } from "../types";


class HeaderView extends Element {

  private controller: Controller;

  private api: Api;


  constructor() {
    super();
    this.api = new Api();
    this.controller = new Controller();
  }

  create() {
    const cartsItems = <ICartProduct[]>JSON.parse(localStorage.getItem('cartData') || 'null');

    let cartCount = 0;
    if (cartsItems) {
      cartsItems.forEach((item) => {
        cartCount += Number(item.stock)
      })
    }


    const headerContainer = this.createEl('div', '', 'global-container', null);

    const topBarWrapper = this.createEl('div', '', 'header__topbar__wrapper', headerContainer);
    const topBarContent = this.createEl('div', '', 'header__topbar__content', topBarWrapper);
    const topbarContentLeft = this.createEl('div', '', 'header__topbar__content_left', topBarContent);
    const topbarPhone = this.createEl('div', '', 'header__topbar__phone', topbarContentLeft);
    this.createEl('a', '+7(814)-233-22-11', 'header__topbar__phone__link', topbarContentLeft, 'tel:+78142332211');
    const topbarContentRight = this.createEl('div', '', 'header__topbar__content_right', topBarContent);

    const topbarContentRightLangBox = this.createEl('div', '', 'header__topbar__content_right', topbarContentRight);
    const topbarContentRightLangImg = this.createEl('img', '', 'header__topbar__lang__img', topbarContentRightLangBox) as HTMLImageElement;
    topbarContentRightLangImg.src = './images/usa_lang.png';
    const topbarContentRightLang = this.createEl('select', '', 'header__topbar__lang', topbarContentRightLangBox) as HTMLSelectElement;
    topbarContentRightLang.addEventListener('change', () => {
      this.controller.chageLang(topbarContentRightLang.value)
    })
    let currentLang = localStorage.getItem('current-lang');
    const topbarContentRightLangEng = this.createEl('option', 'Eng', 'topbar__lang__eng', topbarContentRightLang) as HTMLOptionElement;
    const topbarContentRightLangRu = this.createEl('option', 'Ru', 'topbar__lang__ru', topbarContentRightLang) as HTMLOptionElement;
    if (currentLang) {
      if (currentLang === 'eng') {
        topbarContentRightLangEng.selected = true;
        topbarContentRightLangImg.src = './images/usa_lang.png';
      } else if (currentLang === 'ru') {
        topbarContentRightLangRu.selected = true;
        topbarContentRightLangImg.src = './images/ru_lang.png';
      }
    } else {
      localStorage.setItem('current-lang', 'eng');
      currentLang = 'eng';
      topbarContentRightLangEng.selected = true;
      topbarContentRightLangImg.src = './images/usa_lang.png';
    }
    topbarPhone.innerHTML = langData['header-phone'][currentLang as keyof typeof langData['header-phone']]
    topbarContentRightLangEng.value = 'Eng';
    topbarContentRightLangRu.value = 'Ru';
    let lang = '';
    topbarContentRightLang.addEventListener('change', () => {
      lang = topbarContentRightLang.value;
      if (lang === 'Ru') { topbarContentRightLangImg.src = './images/ru_lang.png'; }
      else { topbarContentRightLangImg.src = './images/usa_lang.png'; }
    });

    const topbarContentRightLogin = this.createEl('div', '', 'header__topbar__login', topbarContentRight);

    const headerNavbarWrapper = this.createEl('div', '', 'header__navbar__wrapper', headerContainer);
    const headerNavbarContent = this.createEl('div', '', 'header__navbar__content', headerNavbarWrapper);
    const navbarContentLogo = this.createEl('a', '', 'navbar__content__logo', headerNavbarContent, '#/');
    const navbarLogoImgOne = this.createEl('img', '', 'navbar__logo__img_left', navbarContentLogo) as HTMLImageElement;
    const navbarLogoImgTwo = this.createEl('img', '', 'navbar__logo__img_right', navbarContentLogo) as HTMLImageElement;
    navbarLogoImgOne.src = './images/logo_1.png';
    navbarLogoImgTwo.src = './images/logo_2.png';

    /*  const navbarContentNav = this.createEl('nav', '', 'navbar__content__nav', headerNavbarContent); */
    /* this.createEl('a', 'Home', 'navbar__nav__link link__home', navbarContentNav, '#/');
    this.createEl('a', 'Women', 'navbar__nav__link link__women', navbarContentNav, '#/w');
    this.createEl('a', 'Men', 'navbar__nav__link link__men', navbarContentNav, '#/m');
    this.createEl('a', 'Girls', 'navbar__nav__link link__girls', navbarContentNav, '#/g');
    this.createEl('a', 'Boys', 'navbar__nav__link link__boys', navbarContentNav, '#/b');
    this.createEl('a', 'Sale', 'navbar__nav__link link__sale', navbarContentNav, '#/s'); */

    const headerSearchMenuMobile = this.createEl('div', '', 'header__search__menu__mobile', headerNavbarContent);
    /* this.createEl('div', `<div class="hamburger-menu">
    <input id="menu__toggle" type="checkbox" />
    <label class="menu__btn" for="menu__toggle">
      <span></span>
    </label>
    <ul class="menu__box">
      <li><a class="menu__item navbar__nav__link link__home" href="#/">Home</a></li>
      <li><a class="menu__item navbar__nav__link link__women" href="#/w">Women</a></li>
      <li><a class="menu__item navbar__nav__link link__men" href="#/m">Men</a></li>
      <li><a class="menu__item navbar__nav__link link__girls" href="#/g">Girls</a></li>
      <li><a class="menu__item navbar__nav__link link__boys" href="#/b">Boys</a></li>
      <li><a class="menu__item navbar__nav__link link__sale" href="#/s">Sale</a></li>
    </ul>
  </div>`, 'navbar__content__hamburger-menu', headerSearchMenuMobile); */

    const navbarSearch = this.createEl('div', '', 'navbar__content__search search-desktop', headerNavbarContent);
    const navbarSearchContent = this.createEl('div', '', 'navbar__search', navbarSearch);
    const navbarSearchLine = this.createEl('input', '', 'navbar__search-line', navbarSearchContent, 'autofocus') as HTMLInputElement;
    this.createEl('button', '<i class="bi bi-search"></i>', 'navbar__search-button', navbarSearchContent);
    navbarSearchLine.placeholder = langData['header-search'][currentLang as keyof typeof langData['header-search']];
    navbarSearchLine.type = 'search';

    const basketFavorites = this.createEl('div', '', 'navbar__content__fb', headerNavbarContent);
    const navbarFavorites = this.createEl('a', '', 'navbar__content__favorites', basketFavorites, '#/favorites');
    this.createEl('div', '<i class="bi bi-heart header__bi-heart"></i>', 'navbar__favorites__img', navbarFavorites);
    this.getWishItemsNum().then((num) => {
      this.createEl('div', num, 'navbar__favorites__count', navbarFavorites);
    })

    this.createEl('div', '', 'navbar__content__fb__separator', basketFavorites);
    const navbarBasket = this.createEl('a', '', 'navbar__content__basket', basketFavorites, '#/cart');
    this.createEl('div', '<i class="bi bi-cart2"></i>', 'navbar__basket__img', navbarBasket);
    this.createEl('div', String(cartCount), 'navbar__content__count', navbarBasket);

    const navbarSearchMobileWrapper = this.createEl('div', '', 'navbar__search-mobile__wrapper', headerContainer);
    const navbarSearchMobile = this.createEl('div', '', 'navbar__content__search search-mobile', navbarSearchMobileWrapper);
    const navbarSearchContentMobile = this.createEl('div', '', 'navbar__search', navbarSearchMobile);
    const navbarSearchLineMobile = this.createEl('input', '', 'navbar__search-line', navbarSearchContentMobile, 'autofocus') as HTMLInputElement;
    this.createEl('button', '<i class="bi bi-search"></i>', 'navbar__search-button', navbarSearchContentMobile);
    navbarSearchLineMobile.placeholder = 'Search for products...';
    navbarSearchLineMobile.type = 'search';
    const navbarContentSearchMobile = this.createEl('label', '<div class="bi bi-search"></div>', 'navbar__content__search-mobile', headerSearchMenuMobile)
    const searchMobileInput = this.createEl('input', '', 'search-mobile__checkbox', navbarContentSearchMobile) as HTMLInputElement;
    searchMobileInput.type = 'checkbox'
    searchMobileInput.onclick = () => {
      if (searchMobileInput.checked === true) { navbarSearchMobileWrapper.style.display = 'flex'; }
      else { navbarSearchMobileWrapper.style.display = 'none'; }
    }

    const bottomBarWrapper = this.createEl('div', '', 'header__bottom__wrapper', headerContainer);
    const bottomContent = this.createEl('div', '', 'header__bottom__content', bottomBarWrapper);
    this.createEl('div', langData['header-sale'][currentLang as keyof typeof langData['header-sale']], 'bottom__link-offer_left', bottomContent);
    this.createEl('a', langData['header-salelink'][currentLang as keyof typeof langData['header-salelink']], 'bottom__link-offer_right', bottomContent, '');

    const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
    if (userData) {
      const topbarContentProfileBox = this.createEl('div', '', 'topbar__content__profile-box', topbarContentRightLogin);

      const profileBoxWelcome = this.createEl('div', `${langData['header-welcome'][currentLang as keyof typeof langData['header-welcome']]}, ${(userData.name) as string}`, 'topbar__profile-box__welcome', topbarContentProfileBox);


      this.createEl('a', langData['header-cart'][currentLang as keyof typeof langData['login-cart']], 'topbar__profile-box__link', topbarContentProfileBox, `#/cart`) as HTMLAnchorElement;
      this.createEl('a', langData['header-account'][currentLang as keyof typeof langData['login-account']], 'topbar__profile-box__link', topbarContentProfileBox, `#/account`) as HTMLAnchorElement;
      this.createEl('a', langData['header-favorites'][currentLang as keyof typeof langData['login-favorites']], 'topbar__profile-box__link', topbarContentProfileBox, `#/favorites`) as HTMLAnchorElement;
      this.createEl('a', langData['header-purchases'][currentLang as keyof typeof langData['login-purchases']], 'topbar__profile-box__link', topbarContentProfileBox, `#/purchases`) as HTMLAnchorElement;



      const logoutLink = this.createEl('a', langData['header-signout'][currentLang as keyof typeof langData['header-signout']], 'topbar__profile-box__link topbar__profile-box__logout', topbarContentProfileBox, `/`) as HTMLAnchorElement;
      logoutLink.addEventListener('click', () => { this.controller.logoutUser(); });
      const closeProfile = this.createEl('div', '<div class="bi bi-x-lg"></div>', 'topbar__profile-box__close', profileBoxWelcome);
      closeProfile.addEventListener('click', () => { topbarContentProfileBox.style.display = 'none'; });

      const topbarContentProfile = this.createEl('a', `${(userData.name) as string}`, 'header__topbar__content__profile', topbarContentRightLogin, '');
      const topbarContentRightLoginImg = this.createEl('img', '', 'header__topbar__login__img', topbarContentProfile) as HTMLImageElement;
      topbarContentRightLoginImg.src = './images/login.png';
      topbarContentProfile.onmouseover = () => {
        topbarContentProfileBox.style.display = 'flex';
      };
      topbarContentProfileBox.onmouseleave = () => {
        topbarContentProfileBox.style.display = 'none';
      };
    } else {
      const topbarContentRightLoginLink = this.createEl('a', langData['login-title'][currentLang as keyof typeof langData['login-title']], 'header__topbar__login__link', topbarContentRightLogin, '#/login') as HTMLAnchorElement;
      const topbarContentRightLoginImg = this.createEl('img', '', 'header__topbar__login__img', topbarContentRightLoginLink) as HTMLImageElement;
      topbarContentRightLoginImg.src = './images/login.png';
    }

    return headerContainer;
  }

  async getWishItemsNum() {
    const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
    let count = 0;
    if (userData) {
      const wishList = await this.api.getAllWishItems(userData) as IWishListData[];
      count = wishList.length;
    }
    return String(count);
  }
}

export default HeaderView;