"use client";
import useSWR from "swr";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import CartTable from "./CartTable";
import Spinner from "@/components/Spinner/Spinner";
import { API_CART } from "@/constants";
import { Cart } from "@/types";
import { API_BUY } from "@/constants";
import { redirect } from "next/navigation";

interface Response {
  cart: Cart;
  isLoading: boolean;
}

function useCartProducts(): Response {
  const { data, isLoading } = useSWR(API_CART, async (key) => {
    return await fetch(key).then((res) => res.json());
  });

  console.log(data, isLoading);

  return {
    cart: data,
    isLoading: isLoading,
  };
}

function handleBuy() {
  fetch(API_BUY);

  redirect("/");
}

function BuyButton() {
  return (
    <button
      onClick={handleBuy}
      className=" p-3 bg bg-yellow-600 rounded-3xl w-full animate-pulse active:bg-yellow-700"
    >
      Buy
    </button>
  );
}

export default function Cart() {
  const { cart, isLoading } = useCartProducts();

  return (
    <>
      <NavBar />
      <main>
        <div className=" flex flex-col justify-center">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <CartTable cart={cart} />
              <BuyButton />
            </>
          )}
        </div>
      </main>
    </>
  );
}
