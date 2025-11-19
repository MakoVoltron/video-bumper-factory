import Image from "next/image";
import hero from "@/public/images/hero.jpg";
import Button from "./ui/Button";

const Hero = () => {
  return (
    <section className="relative w-full sm:h-3/5  flex items-center justify-center">
      {/* Background image */}
      <Image
        src={hero}
        alt="hero image background"
        fill
        className="object-cover"
        loading="eager"
        placeholder="blur"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Content */}
      <div className="relative ">
        <div className="flex flex-col space-y-4 max-w-4xl m-auto p-10 ">
          <div>
            <p className="font-bold bg-purple-950 text-sm sm:text-base text-purple-400 inline py-1 px-3 rounded-xl">
              Professional Logo Animation Service
            </p>
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl">
            Elevate Your Video Content With{" "}
            <span className="text-purple-600">Animated Logo Bumpers</span>
          </h1>
          <p className="text-md sm:text-xl">
            Send us your logo, and within 48 hours we&apos;ll send it back
            animated and scroll-ready for TikTok, YouTube, and Reels. Real
            humans, real speed—no AI shortcuts, just a brand that moves and
            sticks.
          </p>
          {/* <div>
              <span className="font-bold bg-purple-950  text-purple-400 py-1 px-3 rounded-xl">
                For $99 ONLY!
              </span>
            </div> */}
          <div className="mt-5">
            <Button text="Start now only for $99" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
