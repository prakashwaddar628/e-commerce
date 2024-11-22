"use client";

import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatNumber } from "@/utils/formatNumber";
import { formatPrice } from "@/utils/formatPrics";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    const totalSale = orders.reduce((acc, item) => {
      return item.status === "complete" ? acc + item.amount : acc;
    }, 0);

    const paidOrders = orders.filter((order) => order.status === "complete");
    const unpaidOrders = orders.filter((order) => order.status === "pending");

    setSummaryData({
      sale: {
        label: "Total Sale",
        digit: totalSale,
      },
      products: {
        label: "Total Products",
        digit: products.length,
      },
      orders: {
        label: "Total Orders",
        digit: orders.length,
      },
      paidOrders: {
        label: "Paid Orders",
        digit: paidOrders.length,
      },
      unpaidOrders: {
        label: "Unpaid Orders",
        digit: unpaidOrders.length,
      },
      users: {
        label: "Total Users",
        digit: users.length,
      },
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="max-w-[1150px] mx-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto">
        {summaryKeys.map((key) => (
          <div
            key={key}
            className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition-shadow hover:shadow-md"
          >
            <div className="text-xl md:text-4xl font-bold">
              {summaryData[key].label === "Total Sale" ? (
                <>{formatPrice(summaryData[key].digit)}</>
              ) : (
                <>{formatNumber(summaryData[key].digit)}</>
              )}
            </div>
            <div className="text-gray-500">{summaryData[key].label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
