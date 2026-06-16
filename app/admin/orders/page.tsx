"use client";

import { useEffect, useState } from "react";

const PALETTES = [
  {
    header: "bg-purple-50 border-b border-purple-200",
    id: "text-purple-800",
    label: "text-purple-700",
    size: "bg-purple-100 text-purple-900",
    total: "text-purple-800",
  },
  {
    header: "bg-teal-50 border-b border-teal-200",
    id: "text-teal-800",
    label: "text-teal-700",
    size: "bg-teal-100 text-teal-900",
    total: "text-teal-800",
  },
  {
    header: "bg-orange-50 border-b border-orange-200",
    id: "text-orange-800",
    label: "text-orange-700",
    size: "bg-orange-100 text-orange-900",
    total: "text-orange-800",
  },
  {
    header: "bg-blue-50 border-b border-blue-200",
    id: "text-blue-800",
    label: "text-blue-700",
    size: "bg-blue-100 text-blue-900",
    total: "text-blue-800",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const totalRevenue = orders.reduce((s, o) => s + (o.total ?? 0), 0);
  const paidCount = orders.filter((o) => o.paymentStatus === "paid").length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-baseline gap-3 mb-6">
        <h1 className="text-xl font-medium">Orders</h1>
        <span className="text-sm text-gray-400">{orders.length} total</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <p className="text-xs font-medium text-purple-700 mb-1">Total orders</p>
          <p className="text-xl font-medium text-purple-900">{orders.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-xs font-medium text-green-700 mb-1">Revenue</p>
          <p className="text-xl font-medium text-green-900">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-teal-50 rounded-lg p-4">
          <p className="text-xs font-medium text-teal-700 mb-1">Paid</p>
          <p className="text-xl font-medium text-teal-900">{paidCount}</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-4">
          <p className="text-xs font-medium text-amber-700 mb-1">Pending</p>
          <p className="text-xl font-medium text-amber-900">{orders.length - paidCount}</p>
        </div>
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-3">
        {orders.map((order, idx) => {
          const p = PALETTES[idx % PALETTES.length];
          return (
            <div key={order._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              {/* Header */}
              <div className={`flex items-center justify-between px-5 py-3 ${p.header}`}>
                <span className={`text-xs font-medium font-mono ${p.id}`}>
                  #{order._id?.slice(-6).toUpperCase()}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-red-100 text-red-800 border-red-300"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="grid md:grid-cols-2 gap-4 px-5 py-4">
                <div>
                  <p className={`text-[11px] font-medium uppercase tracking-wide mb-2 ${p.label}`}>Customer</p>
                  {[["Name", order.name], ["Email", order.email], ["Phone", order.phone]].map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-sm mb-1">
                      <span className="text-gray-400 w-12 shrink-0">{k}</span>
                      <span className="text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className={`text-[11px] font-medium uppercase tracking-wide mb-2 ${p.label}`}>Delivery</p>
                  {[["Address", order.address], ["City", order.city]].map(([k, v]) => (
                    <div key={k} className="flex gap-2 text-sm mb-1">
                      <span className="text-gray-400 w-14 shrink-0">{k}</span>
                      <span className="text-gray-800">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div className="px-5 pb-4 border-t border-gray-100 pt-4">
                <p className={`text-[11px] font-medium uppercase tracking-wide mb-3 ${p.label}`}>Items</p>
                <table className="w-full text-sm table-fixed">
                  <thead>
                    <tr>
                      <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-2 w-[44%]">Product</th>
                      <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-2 w-[16%]">Size</th>
                      <th className="text-left text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-2 w-[12%]">Qty</th>
                      <th className="text-right text-[11px] font-medium text-gray-400 uppercase tracking-wide pb-2 w-[28%]">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items?.map((item: any, i: number) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="py-2 text-gray-800">{item.name}</td>
                        <td className="py-2">
                          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${p.size}`}>{item.size}</span>
                        </td>
                        <td className="py-2 text-gray-400">{item.quantity}</td>
                        <td className="py-2 text-right font-medium text-gray-800">₹{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-5 px-5 py-3 border-t border-gray-100 text-sm">
                <span className="text-gray-400">Subtotal <span className="text-gray-700">₹{order.subtotal}</span></span>
                <span className="text-gray-400">Delivery <span className="text-gray-700">₹{order.deliveryFee}</span></span>
                <span className="text-gray-400">Discount <span className="text-gray-700">−₹{order.discount}</span></span>
                <span className={`text-base font-medium ${p.total}`}>₹{order.total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}