import Link from "next/link";
import Image from "next/image";
import Container from "../Container";
import { Redressed } from "next/font/google";

const redressed = Redressed({ subsets: ["latin"], weight: ["400"] });

const Navbar = () => {
  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/"
            className={`${redressed.className} font-bold text-2xl`}>
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                height={20}
                priority
                className="invert bg-red-50"
              />
            </Link>
            <div className="hidden md:block ">search</div>
            <div className="flex items-center gap-8 md:gap-12">CartCount</div>
            <div>UserMenu</div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
