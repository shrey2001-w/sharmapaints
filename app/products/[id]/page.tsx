"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(params.id));
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950 px-4">
        <div className="text-center">
          <div className="text-6xl sm:text-8xl mb-4">🎨</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-blue-300 text-sm sm:text-base">This paint may have dried up.</p>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter((item) => item.id !== product.id);

  return (
    <section className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>

      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #e94560, #f59e0b, #22c55e, #3b82f6, #a855f7)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Breadcrumb */}
        <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-blue-400 hover:text-white transition shrink-0">Home</Link>
          <span className="text-slate-500 shrink-0">/</span>
          <Link href="/product" className="text-blue-400 hover:text-white transition shrink-0">Products</Link>
          <span className="text-slate-500 shrink-0">/</span>
          <span className="text-slate-300 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 sm:gap-8">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-5 sm:space-y-6 min-w-0">

            {/* Hero card — image + paint-chip accent */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl group" style={{ background: "#1a1a2e" }}>

              {/* Paint-chip vertical stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 sm:w-2 z-10"
                style={{ background: "linear-gradient(180deg, #e94560, #f59e0b, #22c55e)" }}
              />

              <Image
                src={product.Images[0]}
                alt={product.name}
                width={800}
                height={800}
                className="w-full h-[240px] sm:h-[340px] md:h-[420px] lg:h-[480px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Category badge floating */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5">
                <span
                  className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white shadow-lg"
                  style={{ background: "linear-gradient(135deg, #e94560, #a855f7)" }}
                >
                  {product.category}
                </span>
              </div>

              {/* Gradient overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 pointer-events-none"
                style={{ background: "linear-gradient(to top, #1a1a2e, transparent)" }} />
            </div>

            {/* Product Info Card */}
            <div
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl"
              style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight break-words">
                {product.name}
              </h1>

              <p className="mt-3 sm:mt-4 text-slate-400 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>

              {/* Divider */}
              <div className="my-5 sm:my-7 h-px" style={{ background: "linear-gradient(90deg, #e94560 0%, transparent 100%)" }} />

              {/* Size Selection */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 sm:mb-4">
                  Select Size
                </h3>
                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  {product.sizes.map((size) => {
                    const active = selectedSize?.size === size.size;
                    return (
                      <button
                        key={size.size}
                        onClick={() => setSelectedSize(size)}
                        className="relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200"
                        style={
                          active
                            ? {
                                background: "linear-gradient(135deg, #e94560, #a855f7)",
                                color: "#fff",
                                boxShadow: "0 0 20px rgba(233,69,96,0.4)",
                                transform: "translateY(-1px)",
                              }
                            : {
                                background: "rgba(255,255,255,0.06)",
                                color: "#94a3b8",
                                border: "1px solid rgba(255,255,255,0.1)",
                              }
                        }
                      >
                        {size.size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="mt-6 sm:mt-8 flex items-center gap-4 sm:gap-6 flex-wrap">
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-slate-500 mb-1">Price</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-black" style={{ color: "#22c55e" }}>
                    ₹{selectedSize?.price}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (!selectedSize) return;
                    addToCart({
                      id: product.id,
                      name: product.name,
                      image: product.Images[0],
                      selectedSize,
                      quantity: 1,
                    });
                    router.push("/checkout");
                  }}
                  className="flex-1 min-w-[160px] sm:min-w-[200px] py-3.5 sm:py-4 rounded-2xl font-bold text-white text-base sm:text-lg transition-all duration-200 flex items-center justify-center gap-2 sm:gap-3"
                  style={{
                    background: "linear-gradient(135deg, #e94560, #a855f7)",
                    boxShadow: "0 8px 32px rgba(233,69,96,0.35)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <span>🛒</span> Add to Cart
                </button>
              </div>
            </div>

            {/* Features Card */}
            <div
              className="rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl"
              style={{ background: "linear-gradient(135deg, #0f3460, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <h2 className="text-base sm:text-xl font-bold text-white mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm">
                ✦ Product Features
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: "🎨", label: "Excellent Coverage" },
                  { icon: "⏳", label: "Long Lasting Finish" },
                  { icon: "🧽", label: "Washable Surface" },
                  { icon: "🛡️", label: "Crack Resistant" },
                  { icon: "✨", label: "Smooth Premium Texture" },
                  { icon: "🌿", label: "Eco-Friendly Formula" },
                ].map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <span className="text-lg sm:text-xl shrink-0">{f.icon}</span>
                    <span className="text-xs sm:text-sm font-medium text-slate-300">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* After Application Results */}
            {product.Images.length > 1 && (
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-5 flex items-center gap-2">
                  <span
                    className="inline-block w-1 h-5 sm:h-6 rounded-full shrink-0"
                    style={{ background: "linear-gradient(180deg, #e94560, #a855f7)" }}
                  />
                  After Application Results
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {product.Images.slice(1).map((img, index) => (
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl sm:rounded-2xl shadow-lg group"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      <Image
                        src={img}
                        alt={`Result ${index + 1}`}
                        width={300}
                        height={300}
                        className="w-full h-28 sm:h-36 md:h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT COLUMN — Related Products ── */}
          <div className="min-w-0">
            <div className="lg:sticky lg:top-6">
              <div
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400 mb-4 sm:mb-5">
                  ✦ Related Products
                </h2>

                <div className="space-y-3 max-h-[420px] lg:max-h-[820px] overflow-y-auto pr-1 scrollbar-thin">
                  {relatedProducts.map((item) => (
                    <Link key={item.id} href={`/products/${item.id}`}>
                      <div
                        className="flex gap-3 sm:gap-4 p-3 rounded-2xl transition-all duration-200 cursor-pointer group"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(233,69,96,0.1)";
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(233,69,96,0.4)";
                          (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                          (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
                        }}
                      >
                        <div className="w-[64px] h-[64px] sm:w-[78px] sm:h-[78px] rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                          <Image
                            src={item.Images[0]}
                            alt={item.name}
                            width={90}
                            height={90}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wide truncate">
                            {item.category}
                          </p>
                          <p className="text-sm font-bold mt-2" style={{ color: "#22c55e" }}>
                            ₹{item.sizes[0].price}
                          </p>
                        </div>

                        <div className="flex items-center text-slate-600 group-hover:text-rose-400 transition-colors shrink-0">
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* CTA inside sidebar */}
                <div
                  className="mt-5 sm:mt-6 p-4 rounded-2xl text-center"
                  style={{ background: "linear-gradient(135deg, rgba(233,69,96,0.15), rgba(168,85,247,0.15))", border: "1px solid rgba(233,69,96,0.2)" }}
                >
                  <p className="text-xs text-slate-400 mb-2">Need help choosing?</p>
                  <button
                    className="text-sm font-semibold px-4 py-2 rounded-xl transition w-full sm:w-auto"
                    style={{ background: "rgba(255,255,255,0.08)", color: "#e2e8f0" }}
                  >
                    Talk to an Expert 💬
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 w-full mt-8 sm:mt-10" style={{ background: "linear-gradient(90deg, #a855f7, #3b82f6, #22c55e, #f59e0b, #e94560)" }} />
    </section>
  );
}