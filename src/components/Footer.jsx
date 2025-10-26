import React from 'react';

export default function Footer({ navigate }) {
  return (
    <footer className="mt-16 border-t border-red-950/40 bg-black/40">
      <div className="max-w-6xl mx-auto px-4 py-6 text-zinc-500 text-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Nafimclicks. In the dark we focus.</p>
        <div className="flex items-center gap-4">
          <p className="text-zinc-600">Accent bleeds: <span className="text-red-600">#blood</span></p>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="uppercase tracking-wider text-[6px] text-red-400/80 hover:text-red-300 bg-red-900/10 hover:bg-red-900/20 border border-red-900/30 hover:border-red-800 rounded px-2 py-1 transition-colors"
            aria-label="admins"
          >
            admins
          </button>
        </div>
      </div>
    </footer>
  );
}
