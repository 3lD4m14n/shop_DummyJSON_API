import useSWR from "swr";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Spinner from "./Spinner/Spinner";
import { API_URL } from "@/constants";

interface productsProps {
  search: string;
}

interface SearchResponse {
  products: Product[];
  total: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ResponseState {
  response: SearchResponse;
  isLoading: boolean;
}

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  imageURL: string;
}

function ProductCard(props: ProductCardProps) {
  return (
    <div>
      <Link
        href={`/product/${props.id}`}
        className=" flex flex-col justify-start items-center rounded-lg w-full h-min p-1 transition-colors hover:bg-red-600"
      >
        <div className=" flex justify-center items-center overflow-hidden w-full">
          <Image
            src={props.imageURL}
            alt={props.title}
            width={300}
            height={300}
            className=" object-scale-down rounded-lg w-full h-full"
          />
        </div>
        <h3 className=" text-center">{props.title}</h3>
        <span className=" after:content-['$'] text-zinc-950">
          {props.price}
        </span>
      </Link>
    </div>
  );
}

function useProducts(search: string): ResponseState {
  const { data, isLoading } = useSWR(
    `${API_URL}/products/search?q=${search}`,
    async (key) => {
      return fetch(key).then((res) => res.json());
    }
  );

  return {
    response: data,
    isLoading,
  };
}

export default function Products(props: productsProps) {
  const { response, isLoading } = useProducts(props.search);
  const [products, setProducts] = useState<JSX.Element[]>([]);
  useEffect(() => {
    if (response) {
      let newProducts = response.products.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            imageURL={product.thumbnail}
          />
        );
      });

      setProducts(newProducts);
    }
  }, [response, props.search]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center flex-grow">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-5">{products}</div>
    );
  }
}
