import Image from "next/image";
import hero from "@/public/images/hero.jpg";

const Hero = () => {
  return (
    <section className="relative w-full h-3/5  bg-green-100 flex items-center justify-center">
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
        <div className="flex flex-col space-y-4 w-4xl m-auto p-10 ">
          <div>
            <p className="font-bold bg-purple-950  text-purple-400 inline py-1 px-3 rounded-xl">
              Professional Logo Animation Service
            </p>
          </div>
          <h1 className="font-headline text-5xl">
            Elevate Your Video Content With{" "}
            <span className="text-purple-600">Animated Logo Bumpers</span>
          </h1>
          <p className="text-xl">
            Send us your logo, and in 24 hours it’s animated and scroll-ready
            for TikTok, YouTube, and Reels. Real humans, real speed—no AI
            shortcuts, just a brand that moves and sticks.
          </p>
          {/* <div>
              <span className="font-bold bg-purple-950  text-purple-400 py-1 px-3 rounded-xl">
                For $99 ONLY!
              </span>
            </div> */}
          <div className="mt-5">
            <button className="bg-purple-950 font-bold py-3 px-5 rounded-2xl hover:bg-purple-700 transition duration-500 cursor-pointer">
              Start now only for $99
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
