import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import SearchIcon from "@/assets/search.svg";
import CartIcon from "@/assets/shopping-cart.svg";
import Logo from "@/assets/shopping-bag.svg";
import Link from "next/link";
import useSWR from "swr";
import Spinner from "@/components/Spinner/Spinner";
import { sessionResponse } from "@/app/api/session/route";
import { API_CHECK_SESSION } from "@/constants";

interface NavBarProps {
  height?: number;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  productsInCart?: number;
}

function useSessionCheck(): sessionResponse & { isLoading: boolean } {
  const { data, isLoading } = useSWR(API_CHECK_SESSION, async (key) => {
    return fetch(key).then((res) => res.json());
  });

  return {
    session: data,
    isLoading,
  };
}

export default function NavBar({ height = 50, setSearch }: NavBarProps) {
  const componentsHeight = height / 1.5;
  const { session, isLoading } = useSessionCheck();

  return (
    <nav style={{ height: height }} className="bg-red-500 w-full px-2">
      <ul className=" w-full h-full flex flex-row justify-between">
        <li className=" flex justify-center items-center rounded-full hover:bg-red-400">
          <Image
            src={MenuIcon}
            alt="Menu"
            className=" lg:hidden"
            width={height}
            height={height}
          />
          <Link href="/" className=" w-full h-full">
            <Image
              src={Logo}
              alt="Logo"
              className=" hidden lg:block"
              width={height}
              height={height}
            />
          </Link>
        </li>
        {setSearch ? (
          <li className=" flex justify-center items-center">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Product"
              onChange={(e) => setSearch(e.target.value)}
              style={{ height: componentsHeight }}
              className={` hidden text-zinc-950 text-center w-[400px] lg:block rounded-l-md border-black border-y-2 border-l-2`}
            />

            <Image
              src={SearchIcon}
              alt="Search"
              width={componentsHeight - 2}
              height={componentsHeight - 2}
              className=" border-black rounded-r-md border-y-2 border-r-2"
            />
          </li>
        ) : null}
        <li>
          {isLoading ? (
            <Spinner />
          ) : session ? (
            <Link
              href="/cart"
              className=" relative flex justify-center items-center h-full w-full rounded-xl p-3 hover:bg-red-400"
            >
              <h3 className=" hidden lg:block text-lg w-min">Your Cart</h3>
              <Image src={CartIcon} alt="Cart" width={height} height={height} />
            </Link>
          ) : (
            <Link
              href={"/login"}
              className=" flex justify-center items-center h-full w-full rounded-xl p-3 hover:bg-red-400"
            >
              LogIn
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
