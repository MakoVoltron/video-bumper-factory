"use client";

import { ShoppingCartIcon } from "lucide-react";

type VideoPreviewProps = {
  id: number;
  name?: string;
  poster: string;
  preview: string;
  onClick?: () => void;
};

const Video = ({ id, preview, poster, onClick }: VideoPreviewProps) => {
  return (
    <div className="col-span-4 relative group/video">
      <button
        onClick={onClick}
        className="bg-slate-900/30 hover:bg-slate-900/80 transition duration-500 absolute right-0 rounded-md p-2 m-1 cursor-pointer z-10  group group-hover/video:opacity-100 size-8"
      >
        <div className="scale-100 group-hover:scale-115 transition duration-500 flex justify-center items-center">
          <ShoppingCartIcon size={18} />
        </div>
      </button>
      <video
        key={id}
        src={preview}
        poster={poster}
        preload="none"
        playsInline
        muted
        className="grayscale hover:filter-none "
        onMouseEnter={(e) => e.currentTarget.play()}
        onMouseLeave={(e) => {
          const video = e.currentTarget;
          video.pause();
          video.currentTime = 0;
          video.load();
        }}
      />
    </div>
  );
};

export default Video;
