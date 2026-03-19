"use client";

import { OrderStatus } from "@prisma/client";
import { useState } from "react";

const statusDictionary = {
  PAID_AWAITING_ASSETS: { message: "Paid", className: "bg-amber-600" },
  ASSET_UPLOADED: {
    message: "In Production",
    className: "bg-sky-600",
  },
  DELIVERED: {
    message: "Done",
    className: "bg-emerald-600",
  },
};

type StatusOptions = keyof typeof statusDictionary;

const OrderStatusBar = ({ orderStatus }: { orderStatus: OrderStatus }) => {
  const [status, setStatus] = useState<StatusOptions>(
    orderStatus as StatusOptions,
  );
  const [hovered, setHovered] = useState(false);

  const statusOrder: StatusOptions[] = ["ASSET_UPLOADED", "DELIVERED"];
  const currentIndex = statusOrder.indexOf(status);
  const otherStatus = statusOrder[(currentIndex + 1) % statusOrder.length];

  // Is the "other" status ahead or behind in the order?
  const isForward = statusOrder.indexOf(otherStatus) > currentIndex;

  const transition = { transition: "transform 0.4s ease" };

  return (
    <div
      className="grid overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className={`[grid-area:1/1] text-xs ${statusDictionary[status].className}  px-3 py-1 rounded-md text-white cursor-pointer`}
        style={{
          transform: hovered
            ? isForward
              ? "translateY(-100%)"
              : "translateY(100%)"
            : "translateY(0)",
          ...transition,
        }}
      >
        {statusDictionary[status].message}
      </button>

      {/* Other — slides in from bottom if forward, top if backward */}
      <button
        className={`[grid-area:1/1] text-xs ${statusDictionary[otherStatus].className} px-3 py-1 rounded-md text-white cursor-pointer`}
        style={{
          transform: hovered
            ? "translateY(0)"
            : isForward
              ? "translateY(100%)"
              : "translateY(-100%)",
          ...transition,
        }}
        onClick={() => {
          setStatus(otherStatus);
          setHovered(false);
        }}
      >
        {statusDictionary[otherStatus].message}
      </button>
    </div>
  );
};

export default OrderStatusBar;
