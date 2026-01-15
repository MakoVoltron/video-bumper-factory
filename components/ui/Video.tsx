"use client";

import Image from "next/image";

import { ShoppingCartIcon } from "lucide-react";

type VideoPreviewProps = {
  id?: number;
  name?: string;
  poster: string;
  preview: string;
  onClick?: () => void;
  overlay?: boolean;
  mute?: boolean;
};

const Video = ({
  id,
  preview,
  poster,
  onClick,
  overlay = true,
  mute = false,
}: VideoPreviewProps) => {
  return (
    <div className="col-span-4 relative group/video">
      {overlay && (
        <button
          onClick={onClick}
          className="bg-slate-900/30 hover:bg-slate-900/80 transition duration-500 absolute right-0 rounded-md p-2 m-1 cursor-pointer z-10 opacity-0  group-hover/video:opacity-100 size-8"
        >
          <div className="flex justify-center items-center">
            <ShoppingCartIcon size={18} />
          </div>
        </button>
      )}

      {/* Poster */}
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover group-hover/video:opacity-0 grayscale hover:grayscale-0 transition-opacity duration-200 pointer-events-none"
        priority={false}
      />

      <video
        key={id}
        src={preview}
        preload="metadata"
        playsInline
        muted={mute}
        className="w-full h-full object-cover"
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
