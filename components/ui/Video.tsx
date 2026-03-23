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
  title,
}: VideoPreviewProps) => {
  const playIntenRef = useRef(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [hoverSrc, setHoverSrc] = useState<string | null>(null);
  const resolvedSrc = mode === "loop" ? videoUrl : hoverSrc;

  const [isPlaying, setIsPlaying] = useState(mode === "loop");

  const handleStop = () => {
    if (mode === "hover") {
      const video = videoRef.current;
      if (!video) return;

      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handlePointerEnter = () => {
    if (mode !== "hover") return;

    playIntenRef.current = true;

    if (!hoverSrc) {
      setHoverSrc(videoUrl);
      return;
    }

    videoRef.current?.play().catch(() => {});
  };

  const handlePointerLeave = () => {
    if (mode !== "hover") return;
    playIntenRef.current = false;

    requestAnimationFrame(() => {
      if (!containerRef.current?.matches(":hover")) {
        handleStop();
      }
    });
  };

  const handleVideoLoadedData = () => {
    if (mode !== "hover") return;
    if (playIntenRef.current) {
      videoRef.current?.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className="col-span-12 md:col-span-6 lg:col-span-4 relative group/video aspect-video w-full"
      onPointerEnter={mode === "hover" ? handlePointerEnter : undefined}
      onPointerLeave={mode === "hover" ? handlePointerLeave : undefined}
    >
      <div className="absolute right-0 z-30">
        {actions && actions.length > 0 && (
          <div className="flex">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className={` ${action.variant === "danger" ? "bg-rose-500 hover:bg-slate-900/80 hover:text-red-500" : "bg-slate-900/30 hover:bg-slate-900/80"} transition duration-500  right-0 rounded-md p-2 m-1 cursor-pointer z-10 opacity-40  group-hover/video:opacity-100 size-8 `}
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
        alt={title ?? "poster"}
        fill
        sizes="(max-width: 500px) 100vw, 33vw"
        className={cn(
          "object-cover z-20 grayscale hover:grayscale-0 transition-opacity duration-200 pointer-events-none",
          isPlaying ? "opacity-0" : "opacity-100",
        )}
        priority={false}
      />

      <video
        ref={videoRef}
        key={id}
        src={resolvedSrc ?? undefined}
        preload={mode === "loop" ? "metadata" : "auto"}
        autoPlay={mode === "loop"}
        loop={mode === "loop"}
        playsInline
        muted={mute}
        className="absolute inset-0 w-full h-full object-cover"
        onLoadedData={mode === "hover" ? handleVideoLoadedData : undefined}
        onPlay={() => setIsPlaying(true)}
      />
    </div>
  );
};

export default Video;
