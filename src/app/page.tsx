"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Aside from "@/components/Aside";
import { API_PRODUCTS, API_SEARCH_PRODUCTS, API_CATEGORIES } from "@/constants";
import Products from "@/components/Products";

interface Response {
  categories: string[];
  isLoading: boolean;
}

function useCategories(): Response {
  const { data, isLoading } = useSWR(API_CATEGORIES, async (key) => {
    return fetch(key).then((res) => res.json());
  });

  return {
    categories: data,
    isLoading,
  };
}

export default function Home() {
  const { categories, isLoading } = useCategories();
  const [search, setSearch] = useState<string>("");
  const [request, setRequest] = useState<string>("");
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (search) {
      setRequest(`${API_SEARCH_PRODUCTS}/${search}`);
    } else {
      setRequest(API_PRODUCTS);
    }
  }, [search]);

  return (
    <>
      <div
        onClick={() => setMenuIsOpen(false)}
        className={` ${
          menuIsOpen ? "opacity-50 z-30" : "opacity-0 -z-30"
        } fixed h-screen w-screen bg-red-950 blur-md transition-opacity`}
      ></div>
      <NavBar setSearch={setSearch} setMenuIsOpen={setMenuIsOpen} />
      <div className=" flex mt-5 ml-3 gap-5 p-5">
        <Aside
          setRequest={setRequest}
          categories={categories}
          isLoading={isLoading}
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
        />
        <Products request={request} />
      </div>
    </>
  );
}
