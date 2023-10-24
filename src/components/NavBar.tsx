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
  categories?: string[];
  setMenuIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

function useSessionCheck(): { session: sessionResponse; isLoading: boolean } {
  const { data, isLoading } = useSWR(API_CHECK_SESSION, async (key) => {
    return fetch(key).then((res) => res.json());
  });

  return {
    session: data,
    isLoading,
  };
}

export default function NavBar({
  height = 50,
  setSearch,
  setMenuIsOpen,
}: NavBarProps) {
  const componentsHeight = height / 1.5;
  const { session, isLoading } = useSessionCheck();

  return (
    <>
      <nav style={{ height: height }} className="bg-red-500 w-full px-2 z-50">
        <ul className=" w-full h-full flex flex-row justify-between">
          <li className=" flex justify-center items-center rounded-full hover:bg-red-400">
            {setMenuIsOpen && (
              <button
                onClick={() => setMenuIsOpen(true)}
                className=" h-full w-[50px] flex justify-center items-center"
              >
                <Image
                  src={MenuIcon}
                  alt="Menu"
                  className="md:hidden"
                  width={height}
                  height={height}
                />
              </button>
            )}
            <Link
              href="/"
              className={` ${
                setMenuIsOpen ? "hidden" : ""
              } md:block w-full h-full`}
            >
              <Image src={Logo} alt="Logo" width={height} height={height} />
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
                className={` -z-10 absolute w-[90%] text-red-950 text-center md:w-[400px] md:-z-0 md:static rounded-md md:rounded-r-none border-red-950 border-2 md:border-r-0 focus:translate-y-[50px] md:focus:translate-y-0 transition-transform`}
              />
              <a href="#search">
                <Image
                  src={SearchIcon}
                  alt="Search"
                  width={componentsHeight}
                  height={componentsHeight}
                  className=" border-red-950 bg-red-50 rounded-full md:rounded-md md:rounded-l-none border-2"
                />
              </a>
            </li>
          ) : null}
          <li>
            {isLoading ? (
              <Spinner />
            ) : session.session ? (
              <Link
                href="/cart"
                className=" relative flex justify-center items-center h-full w-full rounded-xl p-3 hover:bg-red-400"
              >
                <h3 className=" hidden lg:block text-lg w-min">Your Cart</h3>
                <Image
                  src={CartIcon}
                  alt="Cart"
                  width={height}
                  height={height}
                />
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
    </>
  );
}
