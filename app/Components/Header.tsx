"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

interface User {
  email: string;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

const WHATSAPP_NUMBER = "918920324753";

const BRANDS = [
  { name: "Asian Paints", bg: "#E31E24", abbr: "AP" },
  { name: "Berger Paints", bg: "#003DA5", abbr: "BP" },
  { name: "Nerolac", bg: "#F7941D", abbr: "NRL" },
  { name: "Dulux", bg: "#C8102E", abbr: "DLX" },
  { name: "Indigo Paints", bg: "#4B0082", abbr: "IGO" },
  { name: "Shalimar", bg: "#006400", abbr: "SHL" },
  { name: "Jotun", bg: "#D62B2B", abbr: "JTN" },
  { name: "Nippon Paint", bg: "#CC0000", abbr: "NPN" },
  { name: "Sherwin-Williams", bg: "#003087", abbr: "SW" },
  { name: "Kansai Nerolac", bg: "#FF6600", abbr: "KNP" },
  { name: "British Paints", bg: "#012169", abbr: "BRP" },
  { name: "RAL", bg: "#B8860B", abbr: "RAL" },
];

/* ─── SVG Icons ─── */
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.63 3.36 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20, color = "#25D366" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
    <path fill={color} d="M16 2C8.28 2 2 8.28 2 16c0 2.46.67 4.76 1.83 6.74L2 30l7.44-1.79A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2z" />
    <path fill="#fff" d="M22.5 19.45c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.14-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.27-.2-.57-.35z" />
  </svg>
);

const GmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M6 10a2 2 0 0 1 2-2h32a2 2 0 0 1 2 2v1.5L24 27 6 11.5V10z" />
    <path fill="#4285F4" d="M6 11.5V38a2 2 0 0 0 2 2h13V24L6 11.5z" />
    <path fill="#34A853" d="M42 11.5V38a2 2 0 0 1-2 2H27V24l15-12.5z" />
    <path fill="#FBBC05" d="M27 40h-6V24l-3-2.25L6 11.5 24 27l18-15.5L27 40z" />
    <path fill="#EA4335" d="M6 11.5L24 27l18-15.5V10a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v1.5z" />
  </svg>
);

const CONTACTS = [
  {
    label: "Phone",
    value: "+91 8920324753",
    href: "tel:+918920324753",
    iconBg: "rgba(59,130,246,0.15)",
    icon: <PhoneIcon />,
  },
  {
    label: "WhatsApp",
    value: "+91 8920324753",
    href: "https://wa.me/918920324753",
    iconBg: "rgba(37,211,102,0.14)",
    icon: <WhatsAppIcon size={20} />,
    external: true,
  },
  {
    label: "Email",
    value: "bhattshrey21@gmail.com",
    href: "mailto:bhattshrey21@gmail.com",
    iconBg: "rgba(234,67,53,0.13)",
    icon: <GmailIcon />,
  },
];

/* ─── Expert Modal ─── */
const ExpertModal = ({ onClose }: { onClose: () => void }) => (
  <div
    className="fixed inset-0 z-[80] flex items-center justify-center p-4"
    style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <div
      className="relative w-full max-w-sm rounded-2xl overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        aria-label="Close modal"
      >
        ✕
      </button>

      {/* Header */}
      <div
        className="flex flex-col items-center pt-8 pb-5 px-6 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(233,69,96,0.13), rgba(168,85,247,0.13))",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          className="p-[3px] rounded-full mb-3"
          style={{ background: "linear-gradient(135deg, #e94560, #a855f7)" }}
        >
          <div
            className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: "#2a2a3e" }}
          >
            <img
              src="/experts/priya.jpg"
              alt="Shrey Bhatt"
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
                if (el.parentElement) {
                  el.parentElement.innerHTML = `<span style="font-size:32px;">👩‍🎨</span>`;
                }
              }}
            />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">SHREY BHATT</h2>
        <p className="text-[11px] uppercase tracking-widest mb-3" style={{ color: "#a78bfa" }}>
          Senior Color Expert
        </p>
        <span
          className="flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-full"
          style={{
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.25)",
            color: "#86efac",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          Available now
        </span>
      </div>

      {/* Contact rows */}
      <div className="p-5 flex flex-col gap-2.5">
        {CONTACTS.map(({ label, value, href, iconBg, icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 p-3 rounded-xl no-underline transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(233,69,96,0.09)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(233,69,96,0.28)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(0)";
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: iconBg }}
            >
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: "#475569" }}>
                {label}
              </p>
              <p className="text-[13px] font-semibold truncate" style={{ color: "#e2e8f0" }}>
                {value}
              </p>
            </div>
            <span className="text-lg leading-none" style={{ color: "#475569" }}>›</span>
          </a>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="px-5 pb-6">
        <a
          href="https://wa.me/918920324753"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2.5 transition-all duration-200 hover:-translate-y-0.5 no-underline"
          style={{
            background: "#25D366",
            boxShadow: "0 6px 20px rgba(37,211,102,0.32)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
            <path fill="rgba(255,255,255,0.22)" d="M16 2C8.28 2 2 8.28 2 16c0 2.46.67 4.76 1.83 6.74L2 30l7.44-1.79A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2z" />
            <path fill="#fff" d="M22.5 19.45c-.3-.15-1.78-.88-2.06-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.14-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.91-2.2-.24-.57-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.27-.2-.57-.35z" />
          </svg>
          Start WhatsApp Chat
        </a>
        <p className="text-center text-[11px] mt-3" style={{ color: "#475569" }}>
          Mon – Sat &nbsp;·&nbsp; 9:00 AM – 6:00 PM IST
        </p>
      </div>
    </div>
  </div>
);

/* ─── Brand Ticker ─── */
const BrandTicker = () => {
  const repeated = [...BRANDS, ...BRANDS];
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-orange-50 via-white to-orange-50 border-t border-b border-orange-200 py-3 relative">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-orange-50 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-orange-50 to-transparent" />
      <div
        className="flex w-max items-center"
        style={{ animation: "brand-ticker 35s linear infinite" }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {repeated.map((brand, i) => (
          <div key={i} className="flex items-center gap-2.5 px-6 whitespace-nowrap group cursor-default">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md transition-transform duration-200 group-hover:scale-110 text-white text-xs font-bold"
              style={{ background: brand.bg }}
            >
              {brand.abbr}
            </div>
            <span className="text-sm font-bold tracking-wide" style={{ color: brand.bg }}>
              {brand.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full shrink-0 opacity-40" style={{ background: brand.bg }} />
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes brand-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

/* ─── Cart Drawer ─── */
const CartDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.selectedSize.price * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal + deliveryFee;

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] z-[70] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-400 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <h2 className="text-[17px] font-bold text-gray-900">Your Cart</h2>
            {cartItems.length > 0 && (
              <span className="text-xs font-semibold text-white bg-orange-500 px-2 py-0.5 rounded-full">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-orange-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <p className="text-[15px] font-semibold text-gray-700 mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-400 mb-6">Add some products to get started</p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border-2 border-orange-300 text-orange-600 font-semibold text-sm hover:bg-orange-50 transition-colors"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize.size}`}
                className="flex gap-3 items-start bg-gray-50 rounded-xl p-3 border border-gray-100"
              >
                <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden bg-white shrink-0">
                  <Image src={item.image} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-gray-900 truncate">{item.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Size: {item.selectedSize.size} · Qty: {item.quantity}</p>
                  <p className="text-[13px] font-bold text-gray-800 mt-1">
                    ₹{(item.selectedSize.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 transition-colors shrink-0 text-xs font-bold"
                  aria-label={`Remove ${item.name}`}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 space-y-4 bg-white">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery</span>
                <span className={deliveryFee === 0 ? "text-emerald-600 font-medium" : ""}>
                  {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-[11px] text-orange-500">
                  Add ₹{(999 - subtotal).toLocaleString("en-IN")} more for free delivery
                </p>
              )}
              <div className="flex justify-between text-[16px] font-bold text-gray-900 pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-[15px] font-semibold shadow-md shadow-orange-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="flex justify-center gap-5">
              {["Secure checkout", "Free returns", "Easy refunds"].map((t) => (
                <span key={t} className="text-[10px] text-gray-400">{t}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

/* ─── Cart Icon Button ─── */
const CartButton = ({ onClick }: { onClick: () => void }) => {
  const { cartItems } = useCart();
  const totalQty = cartItems.reduce((s, i) => s + i.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative flex items-center justify-center w-10 h-10 rounded-xl border-2 border-orange-200 hover:border-orange-400 text-orange-600 hover:bg-orange-50 transition-all duration-150"
      aria-label="View cart"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {totalQty > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-orange-400 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
          {totalQty > 99 ? "99+" : totalQty}
        </span>
      )}
    </button>
  );
};

/* ─── Main Header ─── */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [expertOpen, setExpertOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = (cartOpen || expertOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen, expertOpen]);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me");
      if (!res.ok) return;
      const data = await res.json();
      if (data?.email) setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      setUser(null);
      setMenuOpen(false);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/97 backdrop-blur-md shadow-[0_2px_20px_rgba(234,88,12,0.12)]"
            : "bg-white border-b-2 border-orange-100"
        }`}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0 group">
              <Image
                src="/Images/image.png"
                alt="Logo"
                width={200}
                height={70}
                className="object-contain h-16 w-auto transition-all duration-200 group-hover:scale-[1.03]"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="relative px-5 py-2.5 text-[15px] font-semibold text-gray-700 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-all duration-150 group"
                >
                  {label}
                  <span className="absolute bottom-1.5 left-5 right-5 h-0.5 bg-gradient-to-r from-red-500 to-orange-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
                </Link>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2.5 bg-orange-50 border border-orange-200 rounded-full pl-1.5 pr-4 py-1.5">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-400 text-white text-sm font-bold shrink-0 shadow-sm">
                      {user.email[0].toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold text-gray-700 max-w-[160px] truncate">
                      {user.email}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: "#25D366", boxShadow: "0 2px 8px rgba(37,211,102,0.35)" }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp Us
                  </a>
                  <Link
                    href="/login"
                    className="px-5 py-2.5 text-[15px] font-semibold text-orange-600 hover:text-orange-700 rounded-xl border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50 transition-all duration-150"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="px-6 py-2.5 text-[15px] font-semibold text-white rounded-xl bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Get Started →
                  </Link>
                </>
              )}

              <button
                onClick={() => setExpertOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #e94560, #a855f7)",
                  boxShadow: "0 2px 10px rgba(233,69,96,0.35)",
                }}
              >
                <span>💬</span>
                Talk to Expert
              </button>

              <CartButton onClick={() => setCartOpen(true)} />
            </div>

            {/* Mobile Right Actions */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl text-white"
                style={{ background: "#25D366", boxShadow: "0 2px 8px rgba(37,211,102,0.3)" }}
                aria-label="Chat on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              <button
                onClick={() => setExpertOpen(true)}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-white"
                style={{
                  background: "linear-gradient(135deg, #e94560, #a855f7)",
                  boxShadow: "0 2px 8px rgba(233,69,96,0.3)",
                }}
                aria-label="Talk to expert"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>

              <CartButton onClick={() => setCartOpen(true)} />

              <button
                className="flex items-center justify-center w-10 h-10 rounded-xl text-orange-600 hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400 transition-all duration-150"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t-2 border-orange-100 shadow-xl">
            <nav className="px-4 pt-3 pb-2 space-y-1">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-base font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all duration-150 border border-transparent hover:border-orange-100"
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => { setMenuOpen(false); setExpertOpen(true); }}
                className="w-full flex items-center gap-2 px-4 py-3 text-base font-semibold text-white rounded-xl transition-all duration-150"
                style={{ background: "linear-gradient(135deg, #e94560, #a855f7)" }}
              >
                <span>💬</span> Talk to an Expert
              </button>
            </nav>

            <div className="px-4 pt-2 pb-5 border-t-2 border-orange-50 mt-1">
              {user ? (
                <div className="space-y-3 pt-3">
                  <div className="flex items-center gap-3 px-4 py-3 bg-orange-50 rounded-xl border border-orange-200">
                    <span className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-orange-400 text-white text-sm font-bold shrink-0 shadow-sm">
                      {user.email[0].toUpperCase()}
                    </span>
                    <div>
                      <p className="text-xs text-orange-500 font-semibold uppercase tracking-wide">Signed in as</p>
                      <p className="text-sm font-semibold text-gray-800 truncate max-w-[200px]">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-100 transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3 pt-3">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center justify-center px-4 py-3 text-base font-semibold text-orange-600 border-2 border-orange-300 hover:border-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-150"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="w-full flex items-center justify-center px-4 py-3 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-xl shadow-md shadow-orange-200 transition-all duration-150"
                  >
                    Get Started →
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        <BrandTicker />
      </header>

      {/* Cart Drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Expert Modal */}
      {expertOpen && <ExpertModal onClose={() => setExpertOpen(false)} />}
    </>
  );
};

export default Header;