"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { VideoPreviewProps } from "@/types/video";
import { cn } from "@/lib/utils";

const Video = ({
  id = "preview-video",
  videoUrl,
  posterUrl,
  mute = true,
  mode = "hover",
  actions,
}: VideoPreviewProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(mode === "loop");

  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current?.play();
  };

  const handleStop = () => {
    if (mode === "hover") {
      const video = videoRef.current;
      if (!video) return;

      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="col-span-4 relative group/video">
      <div className="absolute right-0">
        {actions && actions.length > 0 && (
          <div className="flex">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={` ${action.variant === "danger" ? "bg-rose-500 hover:bg-slate-900/80 hover:text-red-500" : "bg-slate-900/30 hover:bg-slate-900/80"} transition duration-500  right-0 rounded-md p-2 m-1 cursor-pointer z-10 opacity-0  group-hover/video:opacity-100 size-8 `}
              >
                <div className="flex justify-center items-center w-full h-full">
                  {action.icon}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* posterUrl */}
      <Image
        src={posterUrl}
        alt=""
        fill
        sizes="(max-width: 500px) 100vw, 33vw"
        className={cn(
          "object-cover group-hover/video:opacity-0 grayscale hover:grayscale-0 transition-opacity duration-200 pointer-events-none",
          isPlaying ? "opacity-0" : "opacity-100",
        )}
        priority={false}
      />

      <video
        ref={videoRef}
        key={id}
        src={videoUrl}
        preload="metadata"
        autoPlay={mode === "loop"}
        loop={mode === "loop"}
        playsInline
        muted={mute}
        className="w-full h-full object-cover"
        onMouseEnter={mode === "hover" ? handlePlay : undefined}
        onMouseLeave={mode === "hover" ? handleStop : undefined}
        onPlay={() => setIsPlaying(true)}
        // onMouseEnter={(e) => e.currentTarget.play()}
        // onMouseLeave={(e) => {
        //   const video = e.currentTarget;
        //   video.pause();
        //   video.currentTime = 0;
        //   // video.load();
        // }}
      />
    </div>
  );
};

export default Video;
