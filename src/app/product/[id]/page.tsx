"use client";
import { useState } from "react";
import useSWR from "swr";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/Spinner/Spinner";
import Messsage from "@/components/Message";
import { MessageInfo } from "@/types";
import Image from "next/image";
import { API_ADD_TO_CART, API_PRODUCTS } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

interface ResponseState {
  product: Product;
  isLoading: boolean;
}

function useProduct(id: string): ResponseState {
  const { data, isLoading } = useSWR(`${API_PRODUCTS}/${id}`, async (key) => {
    return fetch(key).then((res) => res.json());
  });

  return {
    product: data,
    isLoading,
  };
}

async function handleAddToCart(
  id: string,
  setMessage: React.Dispatch<React.SetStateAction<MessageInfo | null>>,
  push: (url: string) => void
) {
  console.log(id);

  const API_Response: Response = await fetch(API_ADD_TO_CART, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      addQuantity: 1,
      productId: id,
    }),
  }).then((res) => res.json());

  if (API_Response.status === 200) {
    setMessage({
      type: "success",
      message: "Product added to cart",
    });
  } else {
    setMessage({
      type: "error",
      message: "Something went wrong",
    });

    push("/login");
  }
}

export default function ProductView({
  params: params,
}: {
  params: { id: string };
}) {
  const { product, isLoading } = useProduct(params.id);
  const [message, setMessage] = useState<MessageInfo | null>(null);
  const { push } = useRouter();

  return (
    <>
      <NavBar />
      {message && <Messsage {...message} setMessage={setMessage} />}
      <div className=" flex flex-col items-center w-full h-screen">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className=" flex justify-between w-full text-xl font-bold">
              <Link
                href={"/"}
                className=" p-1 border-zinc-900 border-2 rounded-y-3xl rounded-bl-3xl bg-orange-500 uppercase hover:bg-orange-400 transition-colors before:content-['←']"
              >
                Back
              </Link>
              <div className=" flex p-1 bg-zinc-900 border-zinc-900 gap-1 rounded-b-3xl">
                <span className=" after:content-['$'] bg-white h-full rounded-bl-3xl p-1">
                  {product.price}
                </span>
                <button
                  onClick={() => handleAddToCart(params.id, setMessage, push)}
                  className=" bg-green-500 hover:bg-green-400 transition-colors h-full rounded-y-3xl rounded-br-3xl p-1 whitespace-nowrap uppercase"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={350}
              height={350}
              className=" rounded-lg mt-12"
            />
            <h1 className=" font-bold text-2xl mb-2">{product.title}</h1>
            <p className=" text-center h-28">{product.description}</p>
          </>
        )}
      </div>
    </>
  );
}
