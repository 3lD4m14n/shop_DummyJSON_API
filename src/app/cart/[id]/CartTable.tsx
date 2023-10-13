import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Item from "./Item";
import { API_URL } from "@/constants";

interface Product {
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

interface CartTableProps {
  cart: Cart;
}

export default function CartTable({ cart }: CartTableProps) {
  const [quantity, setQuantity] = useState<number[]>(
    cart.products.map((product) => product.quantity)
  );

  const updateQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newQuantity = [...quantity];
    newQuantity[index] = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  return (
    <div className="cart">
      <table className=" w-screen">
        <thead>
          <tr>
            <th className=" text-center font-bold border-2 border-zinc-700 bg-red-700">
              Product
            </th>
            <th className=" text-center font-bold border-2 border-zinc-700 bg-red-700">
              Quantity
            </th>
            <th className=" text-center font-bold border-2 border-zinc-700 bg-red-700">
              Total Price
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.products.map((product, index) => (
            <Item
              key={product.id}
              title={product.title}
              quantity={quantity[index]}
              price={product.price}
              index={index}
              updateQuantity={updateQuantity}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
