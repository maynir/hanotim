"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "ראשי", href: "/" },
  { name: "פרויקטים", href: "/projects" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-sand">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="flex items-center gap-2 text-2xl font-bold text-forest font-heading hover:text-forest-light transition-colors"
          >
            <Image
              src="/logo.png"
              alt="הנוטעים לוגו"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            הנוטעים
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:gap-x-8 md:items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base font-medium text-bark hover:text-forest transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="rounded-full bg-leaf px-6 py-2.5 text-base font-semibold text-forest-dark hover:bg-leaf-dark hover:text-cream transition-all shadow-sm hover:shadow-md"
            >
              צור קשר עכשיו
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-bark hover:bg-sand hover:text-forest transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="פתח תפריט"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-sand">
            <div className="space-y-1 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-3 text-base font-medium text-bark hover:bg-sand hover:text-forest transition-colors rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#contact"
                className="mx-3 mt-4 block rounded-full bg-leaf px-6 py-3 text-center text-base font-semibold text-forest-dark hover:bg-leaf-dark hover:text-cream transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                צור קשר עכשיו
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
