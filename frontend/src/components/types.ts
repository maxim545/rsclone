export interface IVariant {
  size: string;
  stock: number
}

export interface IProduct {
  id: string,
  name: string,
  year: string,
  color: string,
  category: string,
  price: string,
  image: string,
  brand: string,
  variant: IVariant,
}

export interface ILogin {
  email?: string,
  password?: string

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
  password?: string
}

export type TOptions = {
  [prop: string]: string;
};


export interface IOrder {
  _id: string,
  name: string
}

export interface IOrders {
  _id: string,
  orderItems: IOrder[],
  updatedAt: string,
  user: string,
  __v: number,
}





