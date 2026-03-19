import Video from "@/components/ui/Video";
import { prisma } from "@/lib/db/client";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany({
    include: { template: true },
  });

  return (
    <div className="h-screen w-full ">
      <div className="grid grid-cols-12 gap-2">
        {orders.map((order) => {
          return (
            <div
              key={order.id}
              className="col-span-4  bg-white/80 text-black h-full w-full m-4 p-2 rounded-xl space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold">{order.userEmail}</span>
                <span className="text-xs bg-purple-800 px-3 py-1 rounded-md text-white">
                  {order.status}
                </span>
              </div>
              <div className="w-full bg-amber-50">
                <Video
                  videoUrl={order.template.videoUrl}
                  posterUrl={order.template.posterUrl}
                />
              </div>
              <div className=" bg-amber-50/40 rounded-md p-1">
                <p className="text-xs">Notes</p>
                <p>{order.notes}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
