import Api from "../api";
import Element from "../common/Element";
import Controller from "../Controller";
import { IUserData } from "../types";


class HeaderView extends Element {

  private controller: Controller;

  private api: Api;

  constructor() {
    super();
    this.api = new Api();
    this.controller = new Controller();
  }

  create() {
    const headerContainer = this.createEl('div', '', 'global-container', null);

    const topBarWrapper = this.createEl('div', '', 'header__topbar__wrapper', headerContainer);
    const topBarContent = this.createEl('div', '', 'header__topbar__content', topBarWrapper);

    const topbarContentLeft = this.createEl('div', '', 'header__topbar__content_left', topBarContent);
    this.createEl('div', 'Available 24/7 at', 'header__topbar__phone', topbarContentLeft);
    this.createEl('a', '+7(814)-233-22-11', 'header__topbar__phone__link', topbarContentLeft, 'tel:+78142332211');
    const topbarContentRight = this.createEl('div', '', 'header__topbar__content_right', topBarContent);

    const topbarContentRightLangBox = this.createEl('div', '', 'header__topbar__content_right', topbarContentRight);
    const topbarContentRightLangImg = this.createEl('img', '', 'header__topbar__lang__img', topbarContentRightLangBox) as HTMLImageElement;
    topbarContentRightLangImg.src = './/assets/images/usa_lang.png';
    const topbarContentRightLang = this.createEl('select', '', 'header__topbar__lang', topbarContentRightLangBox) as HTMLSelectElement;
    const topbarContentRightLangEng = this.createEl('option', 'Eng', 'topbar__lang__eng', topbarContentRightLang) as HTMLOptionElement;
    topbarContentRightLangEng.selected = true;
    const topbarContentRightLangRu = this.createEl('option', 'Ru', 'topbar__lang__ru', topbarContentRightLang) as HTMLOptionElement;
    topbarContentRightLangEng.value = 'Eng';
    topbarContentRightLangRu.value = 'Ru';
    let lang = '';
    topbarContentRightLang.addEventListener('change', () => {
      lang = topbarContentRightLang.value;
      if (lang === 'Ru') { topbarContentRightLangImg.src = './/assets/images/ru_lang.png'; }
      else { topbarContentRightLangImg.src = './/assets/images/usa_lang.png'; }
    });

    const topbarContentRightLogin = this.createEl('div', '', 'header__topbar__login', topbarContentRight);

    const headerNavbarWrapper = this.createEl('div', '', 'header__navbar__wrapper', headerContainer);
    const headerNavbarContent = this.createEl('div', '', 'header__navbar__content', headerNavbarWrapper);
    const navbarContentLogo = this.createEl('a', '', 'navbar__content__logo', headerNavbarContent, '#/');
    const navbarLogoImgOne = this.createEl('img', '', 'navbar__logo__img_left', navbarContentLogo) as HTMLImageElement;
    const navbarLogoImgTwo = this.createEl('img', '', 'navbar__logo__img_right', navbarContentLogo) as HTMLImageElement;
    navbarLogoImgOne.src = './/assets/images/logo_1.png';
    navbarLogoImgTwo.src = './/assets/images/logo_2.png';

    const navbarContentNav = this.createEl('nav', '', 'navbar__content__nav', headerNavbarContent);
    this.createEl('a', 'Home', 'navbar__nav__link link__home', navbarContentNav, '#/');
    this.createEl('a', 'Women', 'navbar__nav__link link__women', navbarContentNav, '#/w');
    this.createEl('a', 'Men', 'navbar__nav__link link__men', navbarContentNav, '#/m');
    this.createEl('a', 'Girls', 'navbar__nav__link link__girls', navbarContentNav, '#/g');
    this.createEl('a', 'Boys', 'navbar__nav__link link__boys', navbarContentNav, '#/b');
    this.createEl('a', 'Sale', 'navbar__nav__link link__sale', navbarContentNav, '#/s');

    const headerSearchMenuMobile = this.createEl('div', '', 'header__search__menu__mobile', headerNavbarContent);
    this.createEl('div', `<div class="hamburger-menu">
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
  </div>`, 'navbar__content__hamburger-menu', headerSearchMenuMobile);

    const navbarSearch = this.createEl('div', '', 'navbar__content__search search-desktop', headerNavbarContent);
    const navbarSearchContent = this.createEl('div', '', 'navbar__search', navbarSearch);
    const navbarSearchLine = this.createEl('input', '', 'navbar__search-line', navbarSearchContent, 'autofocus') as HTMLInputElement;
    this.createEl('button', '<i class="bi bi-search"></i>', 'navbar__search-button', navbarSearchContent);
    navbarSearchLine.placeholder = 'Search for products...';
    navbarSearchLine.type = 'search';

    const basketFavorites = this.createEl('div', '', 'navbar__content__fb', headerNavbarContent);
    const navbarFavorites = this.createEl('a', '', 'navbar__content__favorites', basketFavorites, '');
    this.createEl('div', '<i class="bi bi-heart"></i>', 'navbar__favorites__img', navbarFavorites);
    this.createEl('div', '2', 'navbar__favorites__count', navbarFavorites);
    this.createEl('div', '', 'navbar__content__fb__separator', basketFavorites);
    const navbarBasket = this.createEl('a', '', 'navbar__content__basket', basketFavorites, '#/cart');
    this.createEl('div', '<i class="bi bi-cart3"></i>', 'navbar__basket__img', navbarBasket);
    this.createEl('div', '4', 'navbar__content__count', navbarBasket);

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
    this.createEl('div', 'Up to 70% Off.', 'bottom__link-offer_left', bottomContent);
    this.createEl('a', 'Shop our latest sale styles', 'bottom__link-offer_right', bottomContent, '');

    const userData = <IUserData>JSON.parse(localStorage.getItem('userData') || 'null');
    if (userData) {
      const topbarContentProfileBox = this.createEl('div', '', 'topbar__content__profile-box', topbarContentRightLogin);

      const profileBoxWelcome = this.createEl('div', `Welcome, ${(userData.name) as string}`, 'topbar__profile-box__welcome', topbarContentProfileBox);

      const userLinks = ['Cart:cart', 'Account:account', 'Favorites:favorites', 'Purchases:purchases'];



      userLinks.forEach(item => {
        const [name, link] = item.split(':')
        this.createEl('a', name, 'topbar__profile-box__link', topbarContentProfileBox, `#/${link}`) as HTMLAnchorElement;
      })

      const logoutLink = this.createEl('a', 'Logout', 'topbar__profile-box__link topbar__profile-box__logout', topbarContentProfileBox, `/`) as HTMLAnchorElement;
      logoutLink.addEventListener('click', () => { this.controller.logoutUser(); });
      const closeProfile = this.createEl('div', '<div class="bi bi-x-lg"></div>', 'topbar__profile-box__close', profileBoxWelcome);
      closeProfile.addEventListener('click', () => { topbarContentProfileBox.style.display = 'none'; });

      const topbarContentProfile = this.createEl('a', `${(userData.name) as string}`, 'header__topbar__content__profile', topbarContentRightLogin, '');
      const topbarContentRightLoginImg = this.createEl('img', '', 'header__topbar__login__img', topbarContentProfile) as HTMLImageElement;
      topbarContentRightLoginImg.src = './/assets/images/login.png';
      topbarContentProfile.onmouseover = () => {
        topbarContentProfileBox.style.display = 'flex';
      };
      topbarContentProfileBox.onmouseleave = () => {
        topbarContentProfileBox.style.display = 'none';
      };
    } else {
      const topbarContentRightLoginLink = this.createEl('a', 'Login', 'header__topbar__login__link', topbarContentRightLogin, '#/login') as HTMLAnchorElement;
      const topbarContentRightLoginImg = this.createEl('img', '', 'header__topbar__login__img', topbarContentRightLoginLink) as HTMLImageElement;
      topbarContentRightLoginImg.src = './/assets/images/login.png';
    }

    return headerContainer;
  }
}

export default HeaderView;