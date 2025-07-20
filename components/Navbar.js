'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const middleLinks = [
    { name: "Home", href: "/#firstpart" },
    { name: "Products", href: "/#secondpart" },
    { name: "Experience", href: "/#thirdpart" },
    { name: "Contact", href: "/#fourthpart" },
  ];

  if (status === "loading" || !isMounted) {
    return null;
  }

  return (
    <nav className="bg-black text-white py-4 shadow-lg z-50 w-full fixed top-0">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold text-[#4ED7F1]">
          ShoeSmiths
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex flex-1 justify-center space-x-6 text-sm font-medium">
          {middleLinks.map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className="hover:text-[#4ED7F1] transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Buttons - Client-side only */}
        <div className="hidden md:flex space-x-4 text-sm font-medium">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="flex justify-center items-center text-white border-2 border-[#4ED7F1] px-4 py-2 rounded-xl hover:shadow-[0_0_20px_#4ED7F1] transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex justify-center items-center text-white border-2 border-[#4ED7F1] px-4 py-2 rounded-xl hover:shadow-[0_0_20px_#4ED7F1] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="flex justify-center items-center text-white border-2 border-[#4ED7F1] px-4 py-2 rounded-xl hover:shadow-[0_0_20px_#4ED7F1] transition"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
            className="text-[#4ED7F1] focus:outline-none"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black px-6 py-4 space-y-2 text-sm font-medium">
          {middleLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-2 text-white hover:text-[#4ED7F1]"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 text-white hover:text-[#4ED7F1]"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                  setIsOpen(false);
                }}
                className="block py-2 text-white hover:text-[#4ED7F1] w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="block py-2 text-white hover:text-[#4ED7F1]"
              onClick={() => setIsOpen(false)}
            >
              Log in
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
