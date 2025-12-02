'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function LogoIcon() {
  return (
    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-blue-600"
      >
        <path 
          d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M9 21h6" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#features', label: 'Features' },
    { href: '/#philosophy', label: 'Philosophy' },
    { href: '/ideas', label: 'Community' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="section-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoIcon />
              <span className="font-semibold text-lg text-gray-900">
                OpenIdeas
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium transition-colors
                    ${
                      pathname === item.href
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                    }
                  `}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/ideas"
              className="hidden sm:flex text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2"
            >
              Documentation
            </Link>
            <Link
              href="/capture"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
