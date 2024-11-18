"use client";

import { Order, User } from "@prisma/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrics";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
  const router = useRouter();

  const rows = orders?.map((order) => ({
    id: order.id,
    customer: order.user?.name || "Unknown",
    amount: formatPrice(order.amount),
    paymentStatus: order.status,
    date: moment(order.createDate).fromNow(),
    deliveryStatus: order.deliveryStatus,
  })) || [];

  const statusMapping = {
    pending: {
      text: "Pending",
      icon: MdAccessTimeFilled,
      bg: "bg-slate-200",
      color: "text-slate-700",
    },
    dispatched: {
      text: "Dispatched",
      icon: MdDeliveryDining,
      bg: "bg-purple-200",
      color: "text-purple-700",
    },
    delivered: {
      text: "Delivered",
      icon: MdDone,
      bg: "bg-green-200",
      color: "text-green-700",
    },
  };
 
  const renderStatus = (status: string) => {
    const mapping = statusMapping[status];
    return mapping ? (
      <Status text={mapping.text} icon={mapping.icon} bg={mapping.bg} color={mapping.color} />
    ) : null;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Customer Name", width: 130 },
    {
      field: "amount",
      headerName: "Amount",
      width: 130,
      renderCell: (params) => (
        <div className="font-bold text-slate-800">{params.row.amount}</div>
      ),
    },
    {
      field: "deliveryStatus",
      headerName: "Delivery Status",
      width: 130,
      renderCell: (params) => renderStatus(params.row.deliveryStatus),
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 130,
      renderCell: (params) => renderStatus(params.row.paymentStatus),
    },
    { field: "date", headerName: "Date", width: 130 },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex justify-between gap-4 w-full">
          <ActionBtn
            icon={MdDeliveryDining}
            onClick={() => handleDispatch(params.row.id)}
          />
          <ActionBtn
            icon={MdDone}
            onClick={() => handleDeliver(params.row.id)}
          />
          <ActionBtn
            icon={MdRemoveRedEye}
            onClick={() => router.push(`/order/${params.row.id}`)}
          />
        </div>
      ),
    },
  ];

  const handleDispatch = useCallback(
    (id: string) => {
      axios
        .put("/api/order", { id, deliveryStatus: "dispatched" })
        .then(() => {
          toast.success("Order dispatched");
          router.refresh();
        })
        .catch((error) => {
          toast.error(`Error dispatching order ${id}`);
          console.error("Dispatch Error:", error);
        });
    },
    [router]
  );

  const handleDeliver = useCallback(
    (id: string) => {
      axios
        .put("/api/order", { id, deliveryStatus: "delivered" })
        .then(() => {
          toast.success("Order delivered");
          router.refresh();
        })
        .catch((error) => {
          toast.error(`Error delivering order ${id}`);
          console.error("Delivery Error:", error);
        });
    },
    [router]
  );

  return (
    <div className="max-w-[1150px] m-auto text-xl">
      <div className="mb-4 mt-8">
        <Heading title="Manage Orders" center />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default ManageOrdersClient;
