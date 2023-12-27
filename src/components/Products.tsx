import 'react-responsive-pagination/themes/classic.css';
import useSWR from "swr";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import Link from "next/link";
import Image from "next/image";
import Spinner from "./Spinner/Spinner";
import { LIMIT_PRODUCTS_PER_PAGE } from "@/constants";

interface productsProps {
  request: string;
  currentPage: number;
  setCurrentPage: (number: number) => void;
  totalPages: number;
  setTotalPages: (number: number) => void;
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
        <h3 className=" text-center font-bold">{props.title}</h3>
        <span className=" after:content-['$'] text-red-950 font-bold">
          {props.price}
        </span>
      </Link>
    </div>
  );
}

function useProducts(request: string): ResponseState {
  const { data, isLoading } = useSWR(request, async (key) => {
    return fetch(key).then((res) => res.json());
  });

  return {
    response: data,
    isLoading,
  };
}

function handlePageChange(page: number, setCurrentPage: (number: number) => void) {
  setCurrentPage(page);
}

export default function Products(props: productsProps) {
  const { response, isLoading } = useProducts(props.request);
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
      props.setTotalPages(Math.floor(response.total / LIMIT_PRODUCTS_PER_PAGE));
      setProducts(newProducts);
    }
  }, [response, props]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-start flex-grow">
        <Spinner />
      </div>
    );
  } else {
    return (
      <div>
        {products.length >= 1 && (<ResponsivePagination
          total={props.totalPages}
          current={props.currentPage}
          onPageChange={page => handlePageChange(page, props.setCurrentPage)}
        />)}
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-5 h-min">
          {products}
        </div>
        {products.length >= 1 && (<ResponsivePagination
          total={props.totalPages}
          current={props.currentPage}
          onPageChange={page => handlePageChange(page, props.setCurrentPage)}
        />)}
      </div>
    );
  }
}
