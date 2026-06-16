"use client";

import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen min-h-[500px]">
      {/* Background Image */}
      <div className="relative w-full h-screen">
  <Image
    src="/Images/background.png"
    alt="Background"
    fill
    priority
    className="object-cover"
  />
</div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8">
        <h1 className="text-white text-center font-bold leading-tight
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          xl:text-7xl">
          
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;