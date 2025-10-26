import React from 'react';
import { Camera, Instagram, Twitter, Mail } from 'lucide-react';

const LinkButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      active ? 'text-red-500' : 'text-zinc-300 hover:text-red-500'
    }`}
  >
    {children}
  </button>
);

export default function Navbar({ currentPath, navigate }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-red-950/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-zinc-100">
            <Camera className="w-6 h-6 text-red-600 drop-shadow-[0_0_8px_#7f1d1d]" />
            <span className="font-semibold tracking-widest text-sm uppercase">Nafimclicks</span>
          </div>

          <nav className="flex items-center gap-1">
            <LinkButton active={currentPath === '/'} onClick={() => navigate('/')}>Home</LinkButton>
            <LinkButton active={currentPath === '/pic'} onClick={() => navigate('/pic')}>Pictures</LinkButton>
            <LinkButton active={currentPath === '/blog'} onClick={() => navigate('/blog')}>Blog</LinkButton>
            <LinkButton active={currentPath === '/admin'} onClick={() => navigate('/admin')}>Admin</LinkButton>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-red-500 transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-red-500 transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="mailto:contact@nafimclicks.com" className="text-zinc-300 hover:text-red-500 transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
