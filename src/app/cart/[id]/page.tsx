"use client";
import useSWR from "swr";
import NavBar from "@/components/NavBar";
import CartTable from "./CartTable";
import Spinner from "@/components/Spinner/Spinner";
import { API_URL } from "@/constants";
import { Cart } from "./CartTable";

interface Params {
  id: string;
}

interface Response {
  cart: Cart;
  isLoading: boolean;
}

function useCartProducts(): Response {
  const { data, isLoading } = useSWR(`${API_URL}/carts/1`, async (key) => {
    return await fetch(key).then((res) => res.json());
  });

  return {
    cart: data,
    isLoading: isLoading,
  };
}

function BuyButton() {
  return (
    <button className=" p-3 bg bg-yellow-600 rounded-3xl w-full animate-pulse active:bg-yellow-700">
      Buy
    </button>
  );
}

export default function Cart({ params }: { params: Params }) {
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
