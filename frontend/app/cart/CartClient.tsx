"use client";

import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import Heading from "../components/Heading";
import Button from "../components/Button";
import ItemContent from "./ItemContent";
import { formatPrice } from "@/utils/formatPrics";
import { SafeUser } from "@/types";
import { useRouter } from "next/navigation";

interface CartClientProps {
  currentUser: SafeUser | null;
}

const CartClient: React.FC<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleClearCart, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="text-2xl">Your cart is empty</div>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack aria-label="Back to shopping" />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">PRODUCT</div>
        <div className="justify-self-center">PRICE</div>
        <div className="justify-self-center">QUANTITY</div>
        <div className="justify-self-end">TOTAL</div>
      </div>
      <div>
        {cartProducts &&
          cartProducts.map((item, index) => (
            <ItemContent key={item.id || index} item={item} />
          ))}
      </div>
      <div className="border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4">
        <div className="w-[90px]">
          <Button label="Clear Cart" onClick={handleClearCart} small outline />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between w-full text-base font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount || 0)}</span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping are calculated at checkout
          </p>
          <Button
            label={currentUser ? "Checkout" : "Login to Checkout"}
            outline={currentUser ? false : true}
            onClick={() => {
              if (currentUser) {
                router.push("/checkout");
              } else {
                router.push("/login");
              }
            }}
          />
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <span>Continue Shopping</span>
            <MdArrowForward aria-label="Continue shopping" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;