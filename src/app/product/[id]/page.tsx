"use client";
import useSWR from "swr";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/Spinner/Spinner";
import Image from "next/image";
import { API_URL } from "@/constants";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

interface Response {
  product: Product;
  isLoading: boolean;
}

function useProduct(id: string): Response {
  const { data, isLoading } = useSWR(
    `${API_URL}/products/${id}`,
    async (key) => {
      return fetch(key).then((res) => res.json());
    }
  );

  return {
    product: data,
    isLoading,
  };
}

export default function ProductView({
  params: params,
}: {
  params: { id: string };
}) {
  const { product, isLoading } = useProduct(params.id);

  return (
    <>
      <NavBar />
      <div className=" flex flex-col items-center mt-5 w-full h-screen">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className=" flex justify-around w-full ">
              <Link
                href={"/"}
                className=" p-1 border-zinc-900 border-2 rounded-y-3xl rounded-l-3xl bg-orange-500 uppercase hover:bg-orange-400 transition-colors before:content-['←']"
              >
                Back
              </Link>
              <div className=" flex p-1 bg-zinc-900 border-zinc-900 gap-1 rounded-3xl">
                <span className=" after:content-['$'] bg-white h-full rounded-y-3xl rounded-l-3xl p-1">
                  {product.price}
                </span>
                <button className=" bg-green-500 hover:bg-green-400 transition-colors h-full rounded-y-3xl rounded-r-3xl p-1 whitespace-nowrap uppercase">
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
