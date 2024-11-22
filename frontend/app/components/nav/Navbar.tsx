import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import { Redressed } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NestedNav from "./NestedNav";
import SearchBar from "./SearchBar";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = async () => {

  const currentUser = await getCurrentUser();
  
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl`}
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={20}
                priority
                className="invert bg-red-50"
              />
            </Link>
            <div className="hidden md:block ">
              <SearchBar />
            </div>
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser = {currentUser}/>
            </div>
          </div>
        </Container>
      </div>
      <NestedNav />
    </div>
  );
};

export default Navbar;
