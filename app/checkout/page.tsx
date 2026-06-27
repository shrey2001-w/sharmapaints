"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

type DeliveryDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

type FieldErrors = Partial<Record<keyof DeliveryDetails, string>>;

export default function CheckoutPage() {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const [details, setDetails] = useState<DeliveryDetails>({
    name: "", email: "", phone: "", address: "", city: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const subtotal = cartItems.reduce(
    (total, item) => total + item.selectedSize.price * item.quantity,
    0
  );
  const deliveryFee = subtotal >= 999 ? 0 : 99;
  const grandTotal = subtotal - discount + deliveryFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof DeliveryDetails]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateDetails = (): boolean => {
    const errors: FieldErrors = {};
    if (!details.name.trim()) errors.name = "Full name is required";
    if (!details.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email))
      errors.email = "Enter a valid email";
    if (!details.phone.trim()) errors.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(details.phone))
      errors.phone = "Enter a valid 10-digit mobile number";
    if (!details.address.trim()) errors.address = "Address is required";
    if (!details.city.trim()) errors.city = "City is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const applyPromo = () => {
    setPromoError("");
    setPromoSuccess("");
    const code = promoCode.trim().toUpperCase();
    if (code === "SAVE10") {
      const d = Math.round(subtotal * 0.1);
      setDiscount(d);
      setPromoSuccess(`10% off applied — you save Rs.${d}`);
    } else if (code === "FLAT200") {
      setDiscount(200);
      setPromoSuccess("Rs.200 flat discount applied");
    } else {
      setPromoError("Invalid promo code. Try SAVE10 or FLAT200.");
      setDiscount(0);
    }
  };

  const handleProceed = async () => {
    if (!validateDetails()) return;
  
    try {
      // Check authentication
      const authRes = await fetch("/api/me");
      const user = await authRes.json();
  
      if (!user) {
        router.push("/register");
        return;
      }
  
      // Create Stripe session
      const response = await fetch(
        "/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
  
          body: JSON.stringify({
            customer: {
              name: details.name,
              email: details.email,
              phone: details.phone,
              address: details.address,
              city: details.city,
            },
  
            items: cartItems.map((item) => ({
              productId: item.id,
              name: item.name,
              size: item.selectedSize.size,
              price: item.selectedSize.price,
              quantity: item.quantity,
              image: item.image,
            })),
  
            subtotal,
            deliveryFee,
            discount,
            grandTotal,
          }),
        }
      );
  
      const data = await response.json();
  
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Stripe URL not found", data);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      router.push("/register");
    }
  };

  const inputClass = (field: keyof DeliveryDetails) =>
    `w-full text-[13px] px-3 py-2.5 border rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition-colors ${
      fieldErrors[field]
        ? "border-red-300 focus:border-red-400"
        : "border-gray-200 focus:border-gray-400"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-1">
            Step 2 of 3
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">
            Review your order
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} · Free delivery on orders above Rs.999
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-16 text-center">
            <p className="text-5xl mb-4">🛒</p>
            <h2 className="text-lg font-medium text-gray-800 mb-1">Your cart is empty</h2>
            <p className="text-sm text-gray-400 mb-6">Add some items to get started</p>
            <button
              onClick={() => router.push("/product")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Browse products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* Left: Cart Items + Delivery Details */}
            <div className="flex-1 w-full flex flex-col gap-6">

              {/* Cart Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs tracking-widest text-gray-400 uppercase">Cart items</p>
                  <button
                    onClick={() => router.push("/product")}
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-300 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <span>+</span> Add more items
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize.size}`}
                      className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 items-start"
                    >
                      <div className="w-20 h-20 rounded-xl border border-gray-100 overflow-hidden flex-shrink-0 bg-gray-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-medium text-gray-900 truncate mb-2">{item.name}</p>
                        <div className="flex gap-2 flex-wrap mb-3">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                            Size: {item.selectedSize.size}
                          </span>
                          <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                            Qty: {item.quantity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            Rs.{item.selectedSize.price.toLocaleString("en-IN")} each
                          </span>
                          <span className="text-[15px] font-semibold text-gray-800">
                            Rs.{(item.selectedSize.price * item.quantity).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:border-red-400 hover:text-red-500 transition-colors flex-shrink-0"
                        aria-label={`Remove ${item.name}`}
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-base">📦</span>
                  <p className="text-[15px] font-semibold text-gray-900">Delivery details</p>
                </div>

                <div className="flex flex-col gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1">Full name</label>
                    <input
                      type="text"
                      name="name"
                      value={details.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className={inputClass("name")}
                    />
                    {fieldErrors.name && (
                      <p className="text-[11px] text-red-500 mt-1">{fieldErrors.name}</p>
                    )}
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-medium text-gray-500 mb-1">Email address</label>
                      <input
                        type="email"
                        name="email"
                        value={details.email}
                        onChange={handleChange}
                        placeholder="rahul@example.com"
                        className={inputClass("email")}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{fieldErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-gray-500 mb-1">Phone number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-[13px] text-gray-500 bg-gray-100 border border-r-0 border-gray-200 rounded-l-lg">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={details.phone}
                          onChange={handleChange}
                          placeholder="9876543210"
                          maxLength={10}
                          className={`${inputClass("phone")} rounded-l-none`}
                        />
                      </div>
                      {fieldErrors.phone && (
                        <p className="text-[11px] text-red-500 mt-1">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1">Street address</label>
                    <input
                      type="text"
                      name="address"
                      value={details.address}
                      onChange={handleChange}
                      placeholder="Flat 4B, Rose Apartments, MG Road"
                      className={inputClass("address")}
                    />
                    {fieldErrors.address && (
                      <p className="text-[11px] text-red-500 mt-1">{fieldErrors.address}</p>
                    )}
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-[12px] font-medium text-gray-500 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={details.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      className={inputClass("city")}
                    />
                    {fieldErrors.city && (
                      <p className="text-[11px] text-red-500 mt-1">{fieldErrors.city}</p>
                    )}
                  </div>

                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div className="w-full lg:w-[360px] lg:sticky lg:top-10">
              <p className="text-xs tracking-widest text-gray-400 uppercase mb-3">Order summary</p>

              <div className="bg-white border border-gray-100 rounded-2xl p-6">

                {/* Per-item breakdown */}
                <div className="flex flex-col divide-y divide-gray-50 mb-4">
                  {cartItems.map((item) => (
                    <div
                      key={`summary-${item.id}-${item.selectedSize.size}`}
                      className="flex justify-between items-start py-3"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-medium text-gray-800">{item.name}</span>
                        <span className="text-[11px] text-gray-400">
                          Size {item.selectedSize.size} · Qty {item.quantity} · Rs.{item.selectedSize.price.toLocaleString("en-IN")} each
                        </span>
                      </div>
                      <span className="text-[13px] font-medium text-gray-800 ml-4 flex-shrink-0">
                        Rs.{(item.selectedSize.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-gray-100 mb-4" />

                {/* Promo code */}
                <div className="flex gap-2 mb-1">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo / gift code"
                    className="flex-1 text-[13px] px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400"
                  />
                  <button
                    onClick={applyPromo}
                    className="text-[12px] font-medium px-4 py-2 border border-gray-200 rounded-lg bg-transparent text-gray-700 hover:bg-gray-50 whitespace-nowrap transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-red-500 mb-3">{promoError}</p>}
                {promoSuccess && <p className="text-[11px] text-green-600 mb-3">{promoSuccess}</p>}

                <div className="h-px bg-gray-100 my-4" />

                {/* Totals */}
                <div className="flex flex-col gap-2 mb-5">
                  <div className="flex justify-between text-[13px] text-gray-500">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>Rs.{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[13px] text-gray-500">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-medium" : ""}>
                      {deliveryFee === 0 ? "Free" : `Rs.${deliveryFee}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[13px] text-green-600">
                      <span>Promo discount</span>
                      <span>-Rs.{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="h-px bg-gray-100 my-1" />
                  <div className="flex justify-between text-[17px] font-semibold text-gray-900">
                    <span>Total</span>
                    <span>Rs.{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Delivery preview (shows once user starts filling) */}
                {details.name && details.city && (
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 mb-4">
                    <p className="text-[11px] text-gray-400 mb-1">Delivering to</p>
                    <p className="text-[13px] font-medium text-gray-800">{details.name}</p>
                    {details.address && (
                      <p className="text-[12px] text-gray-500 truncate">
                        {details.address}, {details.city}
                      </p>
                    )}
                  </div>
                )}

                {/* CTA */}
                <button
                  onClick={handleProceed}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[15px] font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  Proceed to payment
                </button>

                {/* Trust badges */}
                <div className="flex justify-center gap-5 mt-4">
                  {["Secure", "Free delivery", "Easy returns"].map((t) => (
                    <span key={t} className="text-[11px] text-gray-400">{t}</span>
                  ))}
                </div>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}