"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Synthetic Enamel Paint",
    category: "Oil Based",
    price: 449,
    originalPrice: 599,
    image: "/Images/enamel1.png",
  },
  {
    id: 2,
    name: "Wood Finish Paint",
    category: "Oil Based",
    price: 629,
    originalPrice: 699,
    image: "/Images/wood2.png",
  },
  {
    id: 3,
    name: "Interior Emulsion",
    category: "Water Based",
    price: 499,
    originalPrice: 649,
    image: "/Images/interior.png",
  },
  {
    id: 4,
    name: "Exterior Emulsion",
    category: "Water Based",
    price: 699,
    originalPrice: 899,
    image: "/Images/exterior.png",
  },
  {
    id: 5,
    name: "Wall Putty",
    category: "Cement Based",
    price: 399,
    originalPrice: 450,
    image: "/Images/birla.png",
  },
  {
    id: 6,
    name: "White Cement",
    category: "Cement Based",
    price: 499,
    originalPrice: 550,
    image: "/Images/cement.png",
  },
  {
    id: 7,
    name: "Waterproof Coating",
    category: "Waterproofing",
    price: 799,
    originalPrice: 1099,
    image: "/Images/water.png",
  },
  {
    id: 8,
    name: "Roof Waterproof Solution",
    category: "Waterproofing",
    price: 999,
    originalPrice: 1399,
    image: "/Images/urp.png",
  },
  {
    id: 9,
    name: "Paint Brush",
    category: "Accessories",
    price: 99,
    originalPrice: 120,
    image: "/Images/brush.png",
  },
  {
    id: 10,
    name: "Paint Roller",
    category: "Accessories",
    price: 199,
    originalPrice: 250,
    image: "/Images/roller.png",
  },
];

export default function ProductsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    let priceMatch = true;
    switch (priceRange) {
      case "0-500":
        priceMatch = product.price <= 500;
        break;
      case "501-700":
        priceMatch = product.price >= 501 && product.price <= 700;
        break;
      case "701-900":
        priceMatch = product.price >= 701 && product.price <= 900;
        break;
      case "901+":
        priceMatch = product.price >= 901;
        break;
    }

    const searchMatch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return categoryMatch && priceMatch && searchMatch;
  });

  const getDiscount = (price: number, originalPrice: number) =>
    Math.round((1 - price / originalPrice) * 100);

  return (
    <section className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            Our Products
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Quality paints, coatings &amp; accessories
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8 max-w-3xl mx-auto">

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-800 text-sm focus:outline-none focus:border-blue-400 transition"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm border transition font-medium ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count + Price Filter Row */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </span>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-blue-400 transition"
            >
              <option value="All">All prices</option>
              <option value="0-500">Under ₹500</option>
              <option value="501-700">₹501 – ₹700</option>
              <option value="701-900">₹701 – ₹900</option>
              <option value="901+">₹901+</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.map((product) => {
              const discount = getDiscount(product.price, product.originalPrice);
              const savings = product.originalPrice - product.price;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-300 hover:-translate-y-1 transition-all duration-200 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative h-36 bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {discount > 0 && (
                      <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3">
                      {product.name}
                    </h3>

                    {/* Pricing */}
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      </div>
                      {savings > 0 && (
                        <span className="inline-block text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mb-3">
                          Save ₹{savings}
                        </span>
                      )}

                      <Link href={`/products/${product.id}`}>
                        <button className="w-full py-2 rounded-xl border border-gray-200 text-sm text-gray-700 font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-150">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <svg
              className="w-12 h-12 mx-auto mb-4 opacity-40"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <p className="text-base">No products match your filters.</p>
            <p className="text-sm mt-1">Try adjusting your search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
