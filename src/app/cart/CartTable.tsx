import React, { useState, useEffect } from "react";
import Item from "./Item";
import { Cart } from "@/types";
import { API_ADD_TO_CART } from "@/constants";

interface CartTableProps {
  cart: Cart;
}

export default function CartTable({ cart }: CartTableProps) {
  const [ProductsQuantities, setProductsQuantities] = useState<number[]>(
    cart.products.map((product) => product.quantity)
  );

  const updateQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
    id: number
  ) => {
    const newQuantity = parseInt(event.target.value);

    const newProductsQuantities = [...ProductsQuantities];
    newProductsQuantities[index] = newQuantity;
    setProductsQuantities(newProductsQuantities);

    fetch(API_ADD_TO_CART, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        addQuantity: 1,
        productId: id,
      }),
    }).then((res) => res.json());
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
              quantity={ProductsQuantities[index]}
              price={product.price}
              index={index}
              productID={product.id}
              updateQuantity={updateQuantity}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
