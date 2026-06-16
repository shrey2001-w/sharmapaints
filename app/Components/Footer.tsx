"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";



const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side - Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Sharma Paints Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>

        {/* Center - Terms & Privacy */}
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-xl font-semibold">Sharma Paints</h2>

          <div className="flex items-center gap-4 text-sm text-gray-300">
          <Link
  href="/terms"
  className="hover:text-orange-400 transition"
>
  Terms & Conditions
</Link>

            <span>|</span>

            <Link
  href="/PrivacyPolicy"
  className="hover:text-orange-400 transition"
>
  Privacy Policy
</Link>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            © 2026 Sharma Paints. All rights reserved.
          </p>
        </div>

        {/* Right Side - Contact Info */}
        <div className="text-center md:text-right space-y-2">
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:info@sharmapaints.com"
              className="text-orange-400 hover:underline"
            >
              info@sharmapaints.com
            </a>
          </p>

          <p className="text-sm">
            Phone:{" "}
            <a
              href="tel:+919876543210"
              className="text-orange-400 hover:underline"
            >
              +91 8920324753
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;