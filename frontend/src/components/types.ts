export interface IProduct {
  id: string,
  name: string,
  count: string,
  year: string,
  color: string,
  size: string,
  type: string,
  price: string,
  brand: string,
  popular: boolean,
}

export interface ILogin {
  email: string,
  password: string

}

export interface IUserData {
  _id?: string,
  name: string,
  email: string,
  isAdmin?: boolean,
  token: string
}

export type TOptions = {
  [prop: string]: string;
};





