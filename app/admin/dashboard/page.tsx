import Link from "next/link";
import { Package, ArrowRight, Sparkles } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-orange-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4" />
            Admin Panel
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-orange-500 bg-clip-text text-transparent">
              Sharma Paints
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-500">
            Manage your store from one simple dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <Link
            href="/admin/orders"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6 sm:p-8 shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full" />
            <Package className="w-9 h-9 sm:w-10 sm:h-10 mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold mb-1">View Orders</h2>
            <p className="text-sm text-blue-100 mb-4">
              Track and manage customer orders
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold">
              Open <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <div className="rounded-2xl bg-white border border-dashed border-slate-200 p-6 sm:p-8 flex flex-col items-center justify-center text-center text-slate-400">
            <Sparkles className="w-8 h-8 mb-3" />
            <p className="text-sm font-medium">More tools coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}