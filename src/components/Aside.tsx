import Link from "next/link";
import { API_URL } from "@/constants";
import Spinner from "./Spinner/Spinner";

export interface asideProps {
  categories: JSX.Element[];
  isLoading: boolean;
}

export default function Aside(props: asideProps) {
  return (
    <div className=" hidden bg-red-700 md:flex items-center flex-col max-w-[200px] h-min rounded-xl border-red-500">
      <h2 className=" text-3xl font-bold p-2 text-zinc-50">Categories</h2>
      {props.isLoading ? (
        <Spinner />
      ) : (
        <ul className=" flex flex-col items-center text-lg w-full gap-1 bg-black rounded-b-xl">
          {props.categories}
        </ul>
      )}
    </div>
  );
}
