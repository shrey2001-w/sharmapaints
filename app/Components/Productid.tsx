"use client";

import Image from "next/image";
import { useState } from "react";

interface Size {
  size: string;
  price: number;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  sizes: Size[];
}

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]
  );

  const [quantity, setQuantity] = useState(1);

  const totalPrice = (selectedSize?.price || 0) * quantity;

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          product,
          quantity,
          size: selectedSize?.size,
          totalPrice,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-white">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            className="object-cover hover:scale-105 transition duration-500"
          />
        </div>

        {/* Details */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-5 text-lg leading-8">
            {product.description}
          </p>

          {/* Selected Price */}
          <div className="mt-8">
            <span className="text-gray-500 text-lg">
              Selected Price
            </span>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              ₹{selectedSize?.price}
            </h2>
          </div>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Select Size
            </h3>

            <div className="flex flex-wrap gap-4">
              {product.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(item)}
                  className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                    selectedSize?.size === item.size
                      ? "bg-blue-600 text-white border-blue-600 scale-105"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Select Quantity
            </h3>

            <div className="flex items-center gap-4">
              <button
                onClick={decreaseQuantity}
                className="w-12 h-12 rounded-xl bg-gray-200 text-2xl font-bold"
              >
                -
              </button>

              <div className="w-16 h-12 flex items-center justify-center border rounded-xl text-xl font-semibold">
                {quantity}
              </div>

              <button
                onClick={increaseQuantity}
                className="w-12 h-12 rounded-xl bg-blue-600 text-white text-2xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5">
            <h3 className="text-xl font-semibold text-gray-800">
              Total Price
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-2">
              ₹{totalPrice}
            </p>
          </div>

          {/* Size Price List */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Price According to Size
            </h3>

            <div className="space-y-4">
              {product.sizes.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 border rounded-xl px-5 py-4"
                >
                  <span>{item.size}</span>

                  <span className="font-bold text-blue-600">
                    ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-lg font-semibold"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
}