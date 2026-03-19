import OrderStatusBar from "@/components/order/OrderStatus";
import DeleteOrderButton from "@/components/ui/DeleteOrderButton";
import Video from "@/components/ui/Video";
import { prisma } from "@/lib/db/client";
import Image from "next/image";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: { template: true, assets: true },
  });

  console.log("orders");
  console.log(orders);

  if (!orders.length) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        No orders available
      </div>
    );
  }

  return (
    <div className="h-screen w-full ">
      <div className="grid grid-cols-12 gap-2">
        {orders.map((order) => {
          return (
            <div
              key={order.id}
              className="col-span-4 bg-white/80 text-black h-full w-full m-4 p-2 rounded-xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-amber-50/60 px-3 py-1 rounded-md text-black/80 font-semibold">
                    {order.userEmail}
                  </span>

                  <OrderStatusBar orderStatus={order.status} />
                </div>
                <div className="w-full bg-amber-50 rounded-xl overflow-hidden">
                  <Video
                    videoUrl={order.template.videoUrl}
                    posterUrl={order.template.posterUrl}
                  />
                </div>
                <div className=" bg-amber-50/40 rounded-md p-2">
                  <p className="text-xs">Notes</p>
                  <p>{order.notes}</p>
                </div>

                <div className=" bg-amber-50/40 rounded-md p-2">
                  <p className="text-xs pb-1">Uploads</p>
                  <div className="flex gap-1">
                    {order.assets.map((asset) => (
                      <div
                        key={asset.id}
                        className="h-14 w-16 relative cursor-pointer"
                      >
                        <Image
                          fill
                          sizes="100%"
                          alt={asset.id}
                          src={asset.secureUrl}
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs p-1">
                  Order created{" "}
                  {new Intl.DateTimeFormat("cs-CZ").format(
                    new Date(order.createdAt),
                  )}
                </span>
                <DeleteOrderButton orderId={order.id} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
