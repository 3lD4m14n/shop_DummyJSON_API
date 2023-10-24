import { JWTPayload } from "jose";

export interface UserData extends JWTPayload {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Cart {
  id: number;
  products: Product[];
  total: number;
  userID: number;
  totalProducts: number;
  totalQuantity: number;
}

export type CartsResponse = {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
};

export type MessageInfo = {
  message: string;
  type: "success" | "error";
};
