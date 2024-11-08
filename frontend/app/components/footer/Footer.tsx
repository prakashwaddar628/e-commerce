import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import Image from "next/image";
import { BsInstagram } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Shop Categories</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktops</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Customer Service</h3>
            <Link href="#">Contact Us</Link>
            <Link href="#">Shopping Policy</Link>
            <Link href="#">Returns & Exchanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <FooterList>
            <Image
              src="/logo.png"
              // fill
              width={250}
              height={50}
              alt="Logo"
              className="invert shadow-xl sm:w-36 md:w-44"
            />
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-4">
              <Link
                href="#"
                aria-label="Instagram"
                className="text-slate-200 hover:text-slate-300 hover:filter hover:brightness-125 hover:drop-shadow-lg"
              >
                <BsInstagram size={24} />
              </Link>
              <Link
                href="#"
                aria-label="GitHub"
                className="text-slate-200 hover:text-slate-300 hover:filter hover:brightness-125 hover:drop-shadow-lg"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-slate-200 hover:text-slate-300 hover:filter hover:brightness-125 hover:drop-shadow-lg"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
        <div className="max-w-7xl mx-auto text-center py-6 border-t border-gray-300">
          <p>© 2024 Your Company. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
