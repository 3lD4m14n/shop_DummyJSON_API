"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import { API_URL } from "@/constants";
import Menu from "@/components/Menu";
import Products from "@/components/Products";

interface Response {
  categories: string[];
  isLoading: boolean;
}

function useCategories(): Response {
  const { data, isLoading } = useSWR(
    `${API_URL}/products/categories`,
    async (key) => {
      return fetch(key).then((res) => res.json());
    }
  );

  return {
    categories: data,
    isLoading,
  };
}

function Category(props: { category: string }) {
  return (
    <li className="flex flex-grow items-center justify-center text-center uppercase w-full min-h-[50px] text-zinc-50 bg-red-700 hover:bg-red-400 hover:text-zinc-900 transition-colors last:rounded-b-xl first:border-t-4 border-black">
      <Link href={`/category/${props.category}`} className=" h-full w-full">
        {props.category}
      </Link>
    </li>
  );
}

export default function Home() {
  const { categories, isLoading } = useCategories();
  const [categoriesList, setCategoriesList] = useState<JSX.Element[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (categories) {
      let newCategoriesList = categories.map((category) => {
        return <Category key={category} category={category} />;
      });

      setCategoriesList(newCategoriesList);
    }
  }, [categories]);

  return (
    <>
      <NavBar setSearch={setSearch} />
      <Menu categories={categoriesList} isLoading={isLoading} />
      <div className=" flex mt-5 ml-3 gap-5 p-5">
        <Aside categories={categoriesList} isLoading={isLoading} />
        <Products search={search} />
      </div>
    </>
  );
}
