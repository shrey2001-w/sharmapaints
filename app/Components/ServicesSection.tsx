"use client";

import { useState } from "react";
import {
  Paintbrush,
  Home,
  ShieldCheck,
  Palette,
  Truck,
  Brush,
} from "lucide-react";

const services = [
  {
    title: "Interior Painting",
    shortDescription:
      "Transform your home interiors with premium quality paints.",
    fullDescription:
      "Our interior painting solutions provide smooth finishes, vibrant colors, and long-lasting durability. We offer premium paint brands, expert color matching, wall preparation products, primers, putty, and professional guidance to help create beautiful living spaces.",
    icon: Paintbrush,
  },
  {
    title: "Exterior Painting",
    shortDescription:
      "Weather-resistant paints for long-lasting protection.",
    fullDescription:
      "Protect your property from harsh weather conditions with high-quality exterior paints. Our solutions offer UV protection, water resistance, anti-fungal properties, and excellent color retention for years.",
    icon: Home,
  },
  {
    title: "Waterproof Coating",
    shortDescription:
      "Protect walls and surfaces from moisture damage.",
    fullDescription:
      "Our waterproof coatings prevent water seepage, dampness, and structural damage. Suitable for terraces, bathrooms, basements, and exterior walls for complete protection.",
    icon: ShieldCheck,
  },
  {
    title: "Color Consultation",
    shortDescription:
      "Professional guidance for selecting colors.",
    fullDescription:
      "Choosing the right color can transform any space. Our experts help you select colors that match your décor, lighting conditions, and personal preferences.",
    icon: Palette,
  },
  {
    title: "Paint Accessories",
    shortDescription:
      "Premium brushes, rollers, putty, and tools.",
    fullDescription:
      "We provide a complete range of painting accessories including brushes, rollers, trays, sandpaper, masking tape, putty knives, and other professional tools.",
    icon: Brush,
  },
  {
    title: "Fast Delivery",
    shortDescription:
      "Quick delivery of paints and accessories.",
    fullDescription:
      "Get your paint products delivered directly to your doorstep. We ensure timely delivery so your painting project stays on schedule without delays.",
    icon: Truck,
  },
];

export default function ServicesSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <p className="mt-4 text-gray-600">
            Click on any service to learn more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                onClick={() => handleCardClick(index)}
                className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={28} className="text-orange-600" />
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-600">
                  {activeCard === index
                    ? service.fullDescription
                    : service.shortDescription}
                </p>

                <button className="mt-4 text-orange-600 font-medium">
                  {activeCard === index
                    ? "Show Less ↑"
                    : "Read More →"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}