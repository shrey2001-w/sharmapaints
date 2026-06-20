"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

const images = [
  { src: "/Images/shop.png", alt: "Shop 1" },
  { src: "/Images/shop2.png", alt: "Shop 2" },
  { src: "/Images/shop3.png", alt: "Shop 3" },
  { src: "/Images/shop4.png", alt: "Shop 4" },
  { src: "/Images/shop5.png", alt: "Shop 5" },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setCurrent((index + images.length) % images.length);
      setTimeout(() => setAnimating(false), 700);
    },
    [animating]
  );

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <section className="relative w-full h-screen min-h-[500px] overflow-hidden">
      {/* Crossfade Images */}
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Left Arrow */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 flex items-center justify-center
          bg-white/20 hover:bg-white/40 backdrop-blur-sm
          rounded-full border border-white/30
          transition-all duration-200 hover:scale-110 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="white"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20
          w-12 h-12 flex items-center justify-center
          bg-white/20 hover:bg-white/40 backdrop-blur-sm
          rounded-full border border-white/30
          transition-all duration-200 hover:scale-110 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="white"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 cursor-pointer
              ${i === current
                ? "w-8 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
              }`}
          />
        ))}
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8 z-10">
        <h1
          className="text-white text-center font-bold leading-tight
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
        >
          {/* Your heading text here */}
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;