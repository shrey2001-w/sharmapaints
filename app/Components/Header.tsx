"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUser();

    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md shadow-[0_2px_20px_rgba(234,88,12,0.12)]"
          : "bg-white border-b-2 border-orange-100"
      }`}
    >
      {/* Top brand accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">

          {/* Logo — large and prominent */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/Images/image.png"
              alt="Logo"
              width={200}
              height={70}
              className="object-contain h-16 w-auto transition-all duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Desktop Auth */}
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
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-orange-600 hover:bg-orange-50 border-2 border-orange-200 hover:border-orange-400 transition-all duration-150"
            onClick={() => setMenuOpen(!menuOpen)}
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white border-t-2 border-orange-100 shadow-xl"
        >
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
    </header>
  );
};

export default Header;