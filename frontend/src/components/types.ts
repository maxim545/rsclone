
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
  orderItems: IOrder[],
  status?: string
}

export interface IOrders {
  _id: string,
  orderItems: IOrder[],
  updatedAt: string,
  user: IUserData,
  orderStatus: string,
  __v: number,
}





