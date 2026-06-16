"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/me");

      if (!res.ok) return;

      const data = await res.json();

      if (data?.email) {
        setUser(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
      });

      setUser(null);

      router.refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/image.png"
              alt="Logo"
              width={100}
              height={100}
              className="object-contain w-20 sm:w-24 md:w-28 lg:w-32 h-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-8 text-base lg:text-lg font-medium">
          <Link href="/" className="text-black hover:text-blue-600 transition">
            Home
          </Link>

          <Link
            href="/#about"
            className="text-black hover:text-blue-600 transition"
          >
            About Us
          </Link>

          <Link
            href="/#services"
            className="text-black hover:text-blue-600 transition"
          >
            Services
          </Link>

          <Link
            href="/#contact"
            className="text-black hover:text-blue-600 transition"
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          {user ? (
            <>
              <span className="text-sm font-medium text-gray-700 max-w-[140px] lg:max-w-[200px] truncate">
                Welcome, {user.email}
              </span>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-4 lg:px-5 py-2 rounded-full font-semibold text-sm shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="border-2 border-blue-600 text-blue-600 px-4 lg:px-5 py-2 rounded-full font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-200"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-4 lg:px-5 py-2 rounded-full font-semibold text-sm shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-violet-300 transition-all duration-200 hover:-translate-y-0.5"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-4 text-center">
          <Link href="/" className="block hover:text-blue-600">
            Home
          </Link>

          <Link href="/#about" className="block hover:text-blue-600">
            About Us
          </Link>

          <Link href="/#services" className="block hover:text-blue-600">
            Services
          </Link>

          <Link href="/#contact" className="block hover:text-blue-600">
            Contact Us
          </Link>

          <hr />

          {user ? (
            <>
              <p className="text-sm text-gray-600 break-all">
                {user.email}
              </p>

              <button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-2.5 rounded-full font-semibold shadow-md shadow-rose-200 transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="block border-2 border-blue-600 text-blue-600 py-2.5 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white py-2.5 rounded-full font-semibold shadow-md shadow-blue-200 transition-all duration-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;