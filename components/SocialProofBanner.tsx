"use client";

import { testimonialData } from "@/app/data";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type TestimonialProps = {
  id: number;
  name: string;
  title: string;
  company: string;
  text: string;
};

const Testimonial = ({ name, title, company, text }: TestimonialProps) => (
  <div className="flex flex-col items-center justify-center p-3">
    <h3 className="font-bold text-xl">{name}</h3>
    <p className="text-gray-400">
      {title} {company && "at"} {company}
    </p>
    <p className="text-center h-18 text-sm sm:text-base">{text}</p>
  </div>
);

const SocialProofBanner = () => {
  const [hovered, setHovered] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleHover = (e: React.MouseEvent<HTMLImageElement>) => {
    setHovered(Number(e.currentTarget.dataset.id));
    setPaused(true);
  };

  const selectedTestimonial = testimonialData.find(
    (profile) => profile.id === hovered
  );

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setHovered((prev) => (prev + 1) % testimonialData.length);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="text-white flex flex-col justify-center items-center max-w-2xl gap-3 mb-3">
      <div className="font-bold uppercase text-gray-600">
        Loved by hundreds who hate waiting
      </div>
      <div>
        <div
          className={`flex justify-center items-center h-16 mb-2
          }`}
          style={{ transform: `translateX(${-10 * testimonialData.length}px)` }}
        >
          {testimonialData.map((img, index) => (
            <Image
              key={index}
              src={img.profile}
              data-id={String(img.id)}
              width={60}
              height={60}
              className={`object-fit rounded-full absolute transition duration-600 cursor-pointer origin-center ${
                hovered === img.id
                  ? "z-100 grayscale-0 -translate-y-1"
                  : "z-10 grayscale"
              }`}
              alt={`profile picture of ${img.name}`}
              style={{
                transform: `translateX(${index * 30}px)`,
                // zIndex: `${50 - index}`,
              }}
              onMouseEnter={handleHover}
              onMouseLeave={() => setPaused(false)}
            />
          ))}
        </div>
        {selectedTestimonial && (
          <div key={selectedTestimonial.id} className="fade-in">
            <Testimonial {...selectedTestimonial} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialProofBanner;
