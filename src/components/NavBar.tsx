import Image from "next/image";
import MenuIcon from "@/assets/menu.svg";
import SearchIcon from "@/assets/search.svg";
import CartIcon from "@/assets/shopping-cart.svg";
import Logo from "@/assets/shopping-bag.svg";
import Link from "next/link";

interface NavBarProps {
  height?: number;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  productsInCart?: number;
}

export default function NavBar({ height = 50, setSearch }: NavBarProps) {
  const componentsHeight = height / 1.5;

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
          <Link
            href="/cart/1"
            className=" relative flex justify-center items-center h-full w-full rounded-xl p-3 hover:bg-red-400"
          >
            <h3 className=" hidden lg:block text-lg w-min">Your Cart</h3>
            <Image src={CartIcon} alt="Cart" width={height} height={height} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

/*
<span className=" absolute top-0 right-0 m-auto flex justify-center items-center bg-green-400 rounded-full opacity-80 text-xl w-6 h-6">
  {productsInCart}
</span> 
*/
