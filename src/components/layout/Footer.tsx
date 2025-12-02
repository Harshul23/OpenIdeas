import Link from 'next/link';
import { LogoIcon, ExternalLinkIcon, GitHubIcon } from '@/components/ui/Icons';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="section-container py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <LogoIcon />
              <span className="font-semibold text-lg text-gray-900">OpenIdeas</span>
            </Link>
            <p className="text-gray-600 text-sm max-w-sm mb-4">
              A builder ecosystem designed to turn raw thoughts into real, working products.
            </p>
            <p className="text-sm text-gray-500 italic">
              &ldquo;Ideas deserve execution-level respect.&rdquo;
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#philosophy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href="/ideas" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/capture" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Capture Ideas
                </Link>
              </li>
              <li>
                <Link href="/ideas" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  Browse Ideas
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/Harshul23/OpenIdeas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
                >
                  GitHub
                  <ExternalLinkIcon />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} OpenIdeas. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/Harshul23/OpenIdeas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <GitHubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
