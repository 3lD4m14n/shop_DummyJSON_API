"use client";
import Aside from "@/components/Aside";
import NavBar from "@/components/NavBar";
import Products from "@/components/Products";
import { API_CATEGORIES, API_PRODUCTS, API_SEARCH_PRODUCTS, LIMIT_PRODUCTS_PER_PAGE } from "@/constants";
import { useEffect, useState } from "react";
import useSWR from "swr";

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
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (search) {
      setRequest(`${API_SEARCH_PRODUCTS}/${currentPage}/${search}`);
    } else {
      setRequest(`${API_PRODUCTS}/${currentPage}`);
    }
  }, [search, currentPage]);

  return (
    <>
      <div
        onClick={() => setMenuIsOpen(false)}
        className={` ${menuIsOpen ? "opacity-50 z-30" : "opacity-0 -z-30"
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
        <Products
          request={request}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
        />
      </div>
    </>
  );
}
