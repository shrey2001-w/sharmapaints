"use client";

import React, { useState } from "react";
import {
  Paintbrush,
  Home,
  ShieldCheck,
  Truck,
  Palette,
  Brush,
  X,
} from "lucide-react";

const services = [
  {
    id: 1,
    title: "Interior Painting",
    shortDescription:
      "Premium interior wall painting solutions for homes and offices.",
    fullDescription:
      "Our interior painting service provides smooth, elegant, and long-lasting finishes for your home, office, or commercial space. We use premium-quality paints with modern color combinations to give your walls a fresh and stylish look. Our expert painters ensure clean work, proper surface preparation, and perfect finishing.",
    icon: <Home className="w-10 h-10 text-orange-500" />,
  },
  {
    id: 2,
    title: "Exterior Painting",
    shortDescription:
      "Weather-resistant exterior paints for modern buildings.",
    fullDescription:
      "We provide durable exterior painting solutions designed to withstand harsh weather conditions, sunlight, and moisture. Our premium exterior coatings protect your walls from damage while enhancing the overall beauty and value of your property.",
    icon: <Paintbrush className="w-10 h-10 text-orange-500" />,
  },
  {
    id: 3,
    title: "Waterproof Coating",
    shortDescription:
      "Advanced waterproofing to prevent leakage and dampness.",
    fullDescription:
      "Our waterproof coating services help protect your walls and roofs from water leakage, dampness, and cracks. We use high-quality waterproof materials to improve durability and maintain the strength of your building for years.",
    icon: <ShieldCheck className="w-10 h-10 text-orange-500" />,
  },
  {
    id: 4,
    title: "Color Consultation",
    shortDescription:
      "Professional guidance for selecting perfect colors.",
    fullDescription:
      "Choosing the right color combination can completely transform your space. Our experts provide professional color consultation services to help you select shades that match your interiors, lighting, furniture, and personal style.",
    icon: <Palette className="w-10 h-10 text-orange-500" />,
  },
  {
    id: 5,
    title: "Texture & Designer Paints",
    shortDescription:
      "Luxury texture and designer finishes for interiors.",
    fullDescription:
      "We offer modern texture painting and designer wall finishes that add creativity and elegance to your interiors. From matte textures to stylish designer effects, we create unique wall designs that make your home stand out.",
    icon: <Brush className="w-10 h-10 text-orange-500" />,
  },
  {
    id: 6,
    title: "Fast Paint Delivery",
    shortDescription:
      "Quick delivery of paints and painting accessories.",
    fullDescription:
      "Sharma Paints provides fast and reliable delivery of paints, primers, brushes, rollers, and all painting accessories directly to your doorstep. We ensure timely delivery and genuine products at affordable prices.",
    icon: <Truck className="w-10 h-10 text-orange-500" />,
  },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<
    null | (typeof services)[0]
  >(null);

  return (
    <section  id="services" className="w-full bg-gray-100 py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Services
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            At{" "}
            <span className="font-semibold text-orange-500">
              Sharma Paints
            </span>
            , we provide high-quality painting solutions and professional
            services to make your walls beautiful, stylish, and durable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-8 border border-gray-200"
            >
              <div className="mb-5">{service.icon}</div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {service.shortDescription}
              </p>

              <button
                onClick={() => setSelectedService(service)}
                className="mt-6 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition duration-300"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-8 relative animate-fadeIn">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Icon */}
            <div className="mb-6">{selectedService.icon}</div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedService.title}
            </h2>

            {/* Full Description */}
            <p className="text-gray-600 leading-relaxed text-lg">
              {selectedService.fullDescription}
            </p>

            {/* Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="mt-8 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServicesSection;