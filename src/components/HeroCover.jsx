import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] w-full overflow-hidden bg-[#080808]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fvh1rcczCU4MCcKH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#080808] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 h-full flex items-end pb-10">
        <div className="text-left">
          <h1 className="text-zinc-100 text-4xl sm:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_20px_rgba(220,38,38,0.25)]">
            Shadows Captured
          </h1>
          <p className="mt-3 text-zinc-300 max-w-xl">
            I am Nafim — I hunt moments in the liminal dark. Welcome to my vault of images and words.
          </p>
          <div className="mt-6 h-px w-40 bg-gradient-to-r from-red-700/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
