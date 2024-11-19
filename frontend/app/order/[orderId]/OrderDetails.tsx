"use client";

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrics";
import { Order } from "@prisma/client";
import moment from "moment";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="max-w-[1150px] m-auto flex flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order ID:{order.id}</div>
      <div>
        Total Amount:{" "}
        <span className="font-bold">{formatPrice(order.amount / 100)}</span>
      </div>
      {/* this one is for payment status */}
      <div className="flex gap-2 items-center">
        <div>Payment Status:</div>
        <div>
          {order.status === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.status === "complete" ? (
            <Status
              text="complete"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* payment status end here */}

      {/* delivery status from here */}
      <div className="flex gap-2 items-center">
        <div>Delivery Status:</div>
        <div>
          {order.deliveryStatus === "pending" ? (
            <Status
              text="pending"
              icon={MdAccessTimeFilled}
              bg="bg-slate-200"
              color="text-slate-700"
            />
          ) : order.deliveryStatus === "dispatched" ? (
            <Status
              text="dispatched"
              icon={MdDeliveryDining}
              bg="bg-purple-200"
              color="text-purple-700"
            />
          ) : order.deliveryStatus === "delivered" ? (
            <Status
              text="delivered"
              icon={MdDone}
              bg="bg-green-200"
              color="text-green-700"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* delivery status ends here */}

      <div>Date: {moment(order.createDate).fromNow()}</div>
      {/* list the products */}
      <div className="">
        <h2 className="font-semebold mt-4 mb-2">Products Ordered</h2>
        <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QTY</div>
          <div className="justify-self-end">TOTAL</div>
        </div>

        {/* Map the products from the db that the ordered using orderID*/}
        {order.products && order.products.map(item=>{
          return (
            <OrderItem
            key={item.id}
            item={item}
            >

            </OrderItem>
          )
        })}
      </div>
    </div>
  );
};

export default OrderDetails;
