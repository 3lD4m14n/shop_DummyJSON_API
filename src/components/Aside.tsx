"use client";
import { API_PRODUCTS_BY_CATEGORY } from "@/constants";
import Spinner from "./Spinner/Spinner";

export interface asideProps {
  categories: string[];
  isLoading: boolean;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
}

function Category(props: {
  category: string;
  setRequest: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <li className="flex flex-grow items-center justify-center text-center uppercase w-full min-h-[50px] text-red-50 bg-red-500 hover:bg-red-300 hover:text-red-950 transition-colors last:rounded-b-xl first:border-t-4 border-red-950">
      <button
        onClick={() =>
          props.setRequest(`${API_PRODUCTS_BY_CATEGORY}/${props.category}`)
        }
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
        />
      ))
    : null;

  return (
    <div className=" hidden bg-red-500 md:flex items-center flex-col max-w-[200px] h-min rounded-xl border-4 border-red-950">
      <button
        onClick={() => props.setRequest("")}
        className=" text-3xl font-bold p-2 text-red-50"
      >
        Categories
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
