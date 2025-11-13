"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const data = [
  {
    id: 0,
    name: "Mia Lux",
    profile: "/testimonials/Mia Lux_profile.jpg",
    title: "Digital Creator",
    company: "",
    text: "Above and beyond expectations. Improved my overall design and created a fantastic bumper that captured the feel I was looking for. Quick and professional to boot!",
  },
  {
    id: 1,
    name: "Will Hinkson",
    profile: "/testimonials/Will Hinkson_profile.jpg",
    title: "Sales Strategist",
    company: "Force Blue",
    text: "Great service. Highly recommended and quick turnaround time!",
  },
  {
    id: 2,
    name: "Jim Wendt",
    profile: "/testimonials/Jim Wendt_profile.jpg",
    title: "Marketing Expert",
    company: "",
    text: "VBF exceeded my expectations. Very easy to work with. These video bumpers will play a key part of our new branding roll out. Can't wait to slap these on some video clips. Well done Video Bumper Factory!",
  },
  {
    id: 3,
    name: "Ikmal Ezzani",
    profile: "/testimonials/Ikmal Ezzani_profile.jpg",
    title: "Shared Workshop Owner",
    company: "",
    text: "I'm so pleased with our video bumper for our build videos. It was made very promptly and yet so awesome. Really pleased to have your work with us. Thank you!",
  },
];

type TestimonialProps = {
  id: number;
  name: string;
  title: string;
  company: string;
  text: string;
};

const Testimonial = ({ name, title, company, text }: TestimonialProps) => (
  <div className="flex flex-col items-center justify-center">
    <h3 className="font-bold text-xl">{name}</h3>
    <p className="text-gray-200">
      {title} {company && "at"} {company}
    </p>
    <p className="text-center">{text}</p>
  </div>
);

const SocialProofBanner = () => {
  const [hovered, setHovered] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleHover = (e: React.MouseEvent<HTMLImageElement>) => {
    setHovered(Number(e.currentTarget.dataset.id));
    setPaused(true);
  };

  const selectedTestimonial = data.find((profile) => profile.id === hovered);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setHovered((prev) => (prev + 1) % data.length);
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <div className="text-white w-full flex flex-col justify-center items-center max-w-2xl gap-3 mb-3">
      <div className="font-bold uppercase text-gray-600">
        Loved by hundreds who hate waiting
      </div>
      <div>
        <div
          className={`flex justify-center items-center h-16
          }`}
          style={{ transform: `translateX(${-10 * data.length}px)` }}
        >
          {data.map((img, index) => (
            <Image
              key={index}
              src={img.profile}
              data-id={String(img.id)}
              width={60}
              height={60}
              className={`object-fit rounded-full absolute transition duration-600 cursor-pointer ${
                hovered === img.id
                  ? "z-100 grayscale-0 -translate-y-0.5"
                  : "z-10 grayscale"
              }`}
              alt={`profile picture of ${img.name}`}
              style={{
                transform: `translateX(${index * 30}px)`,
                zIndex: `${50 - index}`,
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
