"use client";

import { formatPrice } from "@/utils/formatPrics";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";

interface ItemContentProps {
  item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center">
      <div className="cols-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`} >
        <div className="relative w-[70px] aspect-square">
            <Image src={item.selectedImg.image} fill className="object-contain" alt={item.name}/>
        </div>
        </Link>
        <div className="flex flex-col justify-between">
            <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}</Link>
            <div>{item.selectedImg.color}</div>
            <div className="w-[70px]">
                <button className="text-slate-500 underline" onClick={()=>{}}>
                    Remove
                </button>
            </div>
        </div>
      </div>
      <div>{formatPrice(item.price)}</div>
      <div>{item.quantity}</div>
      <div></div>
    </div>
  );
};

export default ItemContent;
