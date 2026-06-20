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
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>
        <div className="text-center">
          <div className="text-7xl mb-5">🎨</div>
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-slate-400 mb-6">This paint may have dried up.</p>
          <Link href="/product" className="px-6 py-3 rounded-xl font-semibold text-white text-sm" style={{ background: "linear-gradient(135deg, #e94560, #a855f7)" }}>
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 6);

  const FEATURES = [
    { icon: "🎨", label: "Excellent Coverage", desc: "Even coat in fewer strokes" },
    { icon: "⏳", label: "Long Lasting", desc: "Stays vibrant for years" },
    { icon: "🧽", label: "Washable", desc: "Easy to clean surface" },
    { icon: "🛡️", label: "Crack Resistant", desc: "Flexible polymer base" },
    { icon: "✨", label: "Smooth Finish", desc: "Premium velvety texture" },
    { icon: "🌿", label: "Eco-Friendly", desc: "Low VOC formula" },
  ];

  const SPECS = [
    { label: "Finish Type", value: "Matte / Silk" },
    { label: "Dry Time", value: "2–4 hours" },
    { label: "Coverage", value: "120–140 sq ft/L" },
    { label: "Coats Required", value: "2 coats" },
    { label: "Dilution", value: "10–15% water" },
    { label: "Shelf Life", value: "3 years" },
  ];

  return (
    <section className="min-h-screen" style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>

      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #e94560, #f59e0b, #22c55e, #3b82f6, #a855f7)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
          <Link href="/" className="text-blue-400 hover:text-white transition shrink-0">Home</Link>
          <span className="text-slate-600 shrink-0">/</span>
          <Link href="/product" className="text-blue-400 hover:text-white transition shrink-0">Products</Link>
          <span className="text-slate-600 shrink-0">/</span>
          <span className="text-slate-300 font-medium truncate">{product.name}</span>
        </nav>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 lg:gap-8">

          {/* ── LEFT ── */}
          <div className="space-y-5">

            {/* Top product block: image + purchase panel side by side on md+ */}
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[340px_1fr] gap-5">

              {/* Image gallery */}
              <div className="flex flex-col gap-3">
                {/* Main image — reduced height */}
                <div
                  className="relative rounded-2xl overflow-hidden group"
                  style={{ background: "#1a1a2e", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 z-10 rounded-l-2xl"
                    style={{ background: "linear-gradient(180deg, #e94560, #f59e0b, #22c55e)" }} />

                  <Image
                    src={product.Images[activeImage] ?? product.Images[0]}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="w-full h-[220px] sm:h-[260px] md:h-[300px] object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />

                  {/* Category badge */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
                      style={{ background: "linear-gradient(135deg, #e94560, #a855f7)" }}>
                      {product.category}
                    </span>
                  </div>

                  {/* Bottom fade */}
                  <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                    style={{ background: "linear-gradient(to top, #1a1a2e, transparent)" }} />
                </div>

                {/* Thumbnail strip */}
                {product.Images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {product.Images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-150"
                        style={{
                          border: activeImage === i
                            ? "2px solid #e94560"
                            : "2px solid rgba(255,255,255,0.08)",
                          opacity: activeImage === i ? 1 : 0.55,
                        }}
                      >
                        <Image src={img} alt={`View ${i + 1}`} width={80} height={80} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Purchase panel */}
              <div
                className="rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-5"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Name + desc */}
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-tight tracking-tight">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2 mt-2 mb-3">
                    {/* Star rating (static display) */}
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} className="w-3.5 h-3.5" fill={s <= 4 ? "#f59e0b" : "none"} stroke="#f59e0b" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">4.0 (128 reviews)</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Size selection */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2.5">Select Size</p>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => {
                      const active = selectedSize?.size === size.size;
                      return (
                        <button
                          key={size.size}
                          onClick={() => setSelectedSize(size)}
                          className="px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-150"
                          style={active
                            ? { background: "linear-gradient(135deg, #e94560, #a855f7)", color: "#fff", boxShadow: "0 0 16px rgba(233,69,96,0.35)" }
                            : { background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }
                          }
                        >
                          {size.size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price + CTA */}
                <div>
                  <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, #e94560, transparent)" }} />
                  <div className="flex items-end justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-0.5">Price</p>
                      <p className="text-4xl font-black" style={{ color: "#22c55e" }}>₹{selectedSize?.price}</p>
                      <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes</p>
                    </div>
                    <div className="flex flex-col gap-2 flex-1 min-w-[140px]">
                      <button
                        onClick={() => {
                          if (!selectedSize) return;
                          addToCart({ id: product.id, name: product.name, image: product.Images[0], selectedSize, quantity: 1 });
                          router.push("/checkout");
                        }}
                        className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5"
                        style={{ background: "linear-gradient(135deg, #e94560, #a855f7)", boxShadow: "0 6px 24px rgba(233,69,96,0.3)" }}
                      >
                        🛒 Add to Cart
                      </button>
                      <button
                        className="w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-150"
                        style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        ♡ Save for Later
                      </button>
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5 flex-wrap">
                    {[
                      { icon: "🚚", text: "Free Delivery" },
                      { icon: "↩️", text: "Easy Returns" },
                      { icon: "✅", text: "Genuine Product" },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-1.5 text-xs text-slate-400">
                        <span>{icon}</span>
                        <span>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Features + Specs row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Features */}
              <div className="rounded-2xl p-5 sm:p-6"
                style={{ background: "linear-gradient(135deg, #0f3460, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <span style={{ color: "#e94560" }}>✦</span> Product Features
                </h2>
                <div className="grid grid-cols-1 gap-2.5">
                  {FEATURES.map((f) => (
                    <div key={f.label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="text-lg shrink-0">{f.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-white">{f.label}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specs */}
              <div className="rounded-2xl p-5 sm:p-6"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <span style={{ color: "#22c55e" }}>✦</span> Technical Specs
                </h2>
                <div className="space-y-2.5">
                  {SPECS.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-xs text-slate-500 font-medium">{label}</span>
                      <span className="text-xs font-semibold text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>

                {/* How to Apply mini section */}
                <div className="mt-5 pt-4 border-t border-white/5">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">How to Apply</p>
                  <div className="space-y-2">
                    {["Clean & prime the surface", "Apply first coat evenly", "Allow to dry 4 hrs", "Apply second coat"].map((step, i) => (
                      <div key={step} className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                          style={{ background: "linear-gradient(135deg, #e94560, #a855f7)" }}>
                          {i + 1}
                        </span>
                        <span className="text-xs text-slate-400">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* After Application Results */}
            {product.Images.length > 1 && (
              <div className="rounded-2xl p-5 sm:p-6"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <span style={{ color: "#f59e0b" }}>✦</span> After Application Results
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {product.Images.slice(1).map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-xl group cursor-pointer"
                      style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Image
                        src={img}
                        alt={`Result ${index + 1}`}
                        width={300}
                        height={200}
                        className="w-full h-24 sm:h-28 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT — Related Products ── */}
          <div>
            <div className="xl:sticky xl:top-6 space-y-4">
              <div className="rounded-2xl p-4 sm:p-5"
                style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <span style={{ color: "#3b82f6" }}>✦</span> Related Products
                </h2>

                <div className="space-y-2.5 max-h-[560px] xl:max-h-[680px] overflow-y-auto pr-0.5">
                  {relatedProducts.map((item) => (
                    <Link key={item.id} href={`/products/${item.id}`}>
                      <div
                        className="flex gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer group"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(233,69,96,0.1)";
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(233,69,96,0.35)";
                          (e.currentTarget as HTMLDivElement).style.transform = "translateX(3px)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                          (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)";
                        }}
                      >
                        {/* Larger image */}
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-lg">
                          <Image
                            src={item.Images[0]}
                            alt={item.name}
                            width={120}
                            height={120}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                          <div>
                            <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wide">
                              {item.category}
                            </p>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-base font-black" style={{ color: "#22c55e" }}>
                              ₹{item.sizes[0].price}
                            </p>
                            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                              style={{ background: "rgba(59,130,246,0.15)", color: "#93c5fd", border: "1px solid rgba(59,130,246,0.2)" }}>
                              {item.sizes.length} sizes
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center text-slate-600 group-hover:text-rose-400 transition-colors shrink-0 self-center">
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Expert CTA card */}
              <div className="rounded-2xl p-4 text-center"
                style={{ background: "linear-gradient(135deg, rgba(233,69,96,0.12), rgba(168,85,247,0.12))", border: "1px solid rgba(233,69,96,0.2)" }}>
                <div className="text-2xl mb-2">💬</div>
                <p className="text-sm font-semibold text-white mb-1">Need help choosing?</p>
                <p className="text-xs text-slate-400 mb-3">Our color experts are available Mon–Sat, 9am–6pm</p>
                <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-150 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #e94560, #a855f7)", boxShadow: "0 4px 16px rgba(233,69,96,0.25)" }}>
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 w-full mt-8"
        style={{ background: "linear-gradient(90deg, #a855f7, #3b82f6, #22c55e, #f59e0b, #e94560)" }} />
    </section>
  );
}