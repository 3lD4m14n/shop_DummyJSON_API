"use client";
import { API_PRODUCTS_BY_CATEGORY, API_PRODUCTS } from "@/constants";
import Spinner from "./Spinner/Spinner";

export interface asideProps {
  categories: string[];
  isLoading: boolean;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
  menuIsOpen: boolean;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Category(props: {
  category: string;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
  setMenuIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <li className="flex flex-grow items-center justify-center text-center uppercase w-full min-h-[50px] text-red-50 bg-red-500 hover:bg-red-300 hover:text-red-950 transition-colors last:rounded-b-xl first:border-t-4 border-red-950">
      <button
        onClick={() => {
          props.setRequest(`${API_PRODUCTS_BY_CATEGORY}/${props.category}`);
          props.setMenuIsOpen(false);
        }}
        className=" h-full w-full"
      >
        {props.category}
      </button>
    </li>
  );
}

export default function Aside(props: asideProps) {
  const categoriesList = props.categories
    ? props.categories.map((category) => (
      <Category
        key={category}
        category={category}
        setRequest={props.setRequest}
        setMenuIsOpen={props.setMenuIsOpen}
      />
    ))
    : null;

  return (
    <div
      className={` fixed overflow-hidden top-0 left-0 m-auto md:m-0 z-50 h-screen w-[150px] md:static bg-red-500 md:flex md:basis-[150px] md:grow-1 md:shrink-0 items-center flex-col md:h-min rounded-xl border-4 border-red-950 transition-transform origin-left ${props.menuIsOpen ? "scale-100" : "scale-0 md:scale-100"}`}
    >
      <button
        onClick={() => {
          props.setRequest(API_PRODUCTS);
          props.setMenuIsOpen(false);
        }}
        className=" text-2xl md:text-xl font-bold p-2 text-red-50 hover:bg-red-300 hover:text-red-950"
      >
        Categories 🔄
      </button>
      {props.isLoading ? (
        <Spinner />
      ) : (
        <ul className=" flex flex-col items-center text-lg w-full gap-1 bg-red-950 rounded-b-xl">
          {categoriesList}
        </ul>
      )}
    </div>
  );
}
