import Link from "next/link";
import Aside from "./Aside";
import { asideProps } from "./Aside";

export default function Menu(props: asideProps) {
  return (
    <div className=" fixed w-[150px] h-screen bg-red-500 right-0 top-0 m-auto md:hidden">
      <Link href={"/"}>
        <h1 className=" text-2xl">Home</h1>
      </Link>
      <Aside {...props} />
    </div>
  );
}
