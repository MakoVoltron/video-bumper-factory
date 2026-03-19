"use client";

import { deleteOrder } from "@/lib/actions/orders";
import { toast } from "react-toastify";

const DeleteOrderButton = ({ orderId }: { orderId: string }) => {
  const handleDelete = async () => {
    await deleteOrder(orderId);
    toast.success("Order deleted");
  };

  return (
    <button
      onClick={handleDelete}
      type="button"
      className="bg-gray-700 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md cursor-pointer"
    >
      Delete order
    </button>
  );
};

export default DeleteOrderButton;
