"use client";

import { formatPrice } from "@/utils/formatPrics";
import { truncateText } from "@/utils/truncateText";
import { CartProductType } from "@prisma/client";
import Image from "next/image";

interface OrderItemProps {
  item: CartProductType;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      {/* this contains image and the item name color */}
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <div className="relative w-[70px] aspect-square">
          <Image
            src={item.selectedImg.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(item.name)}</div>
          <div>{item.selectedImg.color}</div>
        </div>
      </div>
      {/* ends here */}
      {/* this contains quantity and price */}
      <div className="justify-self-center ">{formatPrice(item.price)}</div>
      <div className="justify-self-center ">{item.quantity}</div>
      <div className="justify-self-end font-semibold">
        &#8377;{(item.price * item.quantity).toFixed(2)}
      </div>
      {/* ends here */}
    </div>
  );
};

export default OrderItem;

// from here the ordered component image comes