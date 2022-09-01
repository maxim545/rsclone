
export interface IProduct {
  _id: string,
  name: string,
  year: string,
  color: string,
  category: string,
  price: string,
  image: string,
  brand: string,
  variant: string,
  discount: string
}

export interface IProductCreated {
  _id?: string,
  name?: string,
  year?: string,
  color?: string,
  category?: string,
  price?: string,
  image?: string,
  brand?: string,
  variant?: string,
  discount?: string
}


export interface ICartProduct {
  _id: string,
  name: string,
  year: string,
  color: string,
  category: string,
  price: string,
  image: string,
  brand: string,
  variant: string,
  discount: string
  size: string,
  stock: string,
}


export interface ILogin {
  email?: string,
  password?: string
}

export interface IRegister {
  name: string,
  email: string,
  password: string,
  repeatPassword?: string
}

export interface IUserData {
  _id?: string,
  name?: string,
  surname?: string,
  adress?: string,
  phone?: string,
  thirdname?: string,
  email?: string,
  token?: string,
  password?: string,
  role?: string,
  repeatPassword?: string,
}

export type TOptions = {
  [prop: string]: string;
};

export interface IOrder {
  _id: string,
  name: string
}

export interface IOrderUpdated {
  _id: string,
  orderStatus?: string,
}

export interface IOrderData {
  orderItems: ICartProduct[],
  status?: string,
  price?: number
}

export interface IOrders {
  _id: string,
  orderItems: ICartProduct[],
  createdAt: string,
  user: IUserData,
  orderStatus: string,
  price: number,
  __v: number,
}


export interface IWishListData {
  _id?: string,
  productId: string,
  isExist: boolean,
}

export interface ILang {
  eng: string,
  ru: string,
}

export type TLang = {
  [prop: string]: ILang;
};


export interface AllFiltersObj {
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


export interface ISort {
  DownYear: string,
  UpYear: string,
  DownName: string,
  UpName: string,
  UpPrice: string,
  DownPrice: string
};





