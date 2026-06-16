"use client";

import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <section id="about" className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* Left Side Image */}
        <div className="relative w-full min-h-[500px] lg:min-h-full rounded-3xl overflow-hidden shadow-xl">
          <Image
            src="/Images/shop.png"
            alt="Sharma Paints Shop"
            fill
            className="object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            About Sharma Paints
          </h2>

          <p className="text-gray-700 text-lg leading-8 mb-6">
            Welcome to <span className="font-semibold">Sharma Paints</span>,
            your trusted destination for premium quality paints, wall coatings,
            and painting solutions. We provide a wide range of decorative and
            industrial paints designed to bring beauty, protection, and long
            lasting finish to your spaces.
          </p>

          <p className="text-gray-700 text-lg leading-8 mb-6">
            With years of experience in the paint industry, we are committed to
            delivering top-quality products, expert guidance, and exceptional
            customer service. Whether you are renovating your home, office, or
            commercial property, Sharma Paints has the perfect color and finish
            for every project.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                High-quality paints with smooth finish and long durability.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Wide Color Range
              </h3>
              <p className="text-gray-600">
                Explore modern and classic shades for every space.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Affordable Prices
              </h3>
              <p className="text-gray-600">
                Best paint solutions at budget-friendly prices.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Professional guidance for choosing the perfect paint.
              </p>
            </div>
          </div>

          {/* Button */}
          <button className="mt-8 bg-black text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-800 transition duration-300 w-fit">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;