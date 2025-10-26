import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-red-950/40 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 py-6 text-zinc-500 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Nafimclicks. In the dark we focus.</p>
        <p className="text-zinc-600">Accent bleeds: <span className="text-red-600">#blood</span></p>
      </div>
    </footer>
  );
}
