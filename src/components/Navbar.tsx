'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/users', label: 'Users' },
    { href: '/posts', label: 'Posts' },
    { href: '/login', label: 'Login' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/register', label: 'Register' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-800 via-indigo-900 to-blue-950 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-lg md:text-xl font-bold text-white">Final Project</div>
        
        {/* Mobile menu toggle */}
        <div className="md:hidden">
          <button
            className="text-white p-2 rounded-md hover:bg-violet-700 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Navigation links (desktop) */}
        <div className="hidden md:flex space-x-2">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-white text-violet-700'
                    : 'text-white hover:bg-violet-600 hover:text-white'
                }`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation links (mobile dropdown) */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col space-y-2 bg-blue-900">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              <Button
                className={`w-full text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-white text-violet-700'
                    : 'text-white hover:bg-violet-600 hover:text-white'
                }`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
