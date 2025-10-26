import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroCover from './components/HeroCover';
import ContentArea from './components/ContentArea';
import Footer from './components/Footer';

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  const navigate = (to) => {
    if (to !== path) {
      window.history.pushState({}, '', to);
      setPath(to);
    }
  };

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100 selection:bg-red-900 selection:text-zinc-100">
      <div className="pointer-events-none fixed inset-0 opacity-[0.06]" style={{backgroundImage:'radial-gradient(circle at 20% 10%, #ef4444 0, transparent 35%), radial-gradient(circle at 80% 40%, #7f1d1d 0, transparent 40%)'}} />

      <Navbar currentPath={path} navigate={navigate} />

      {path === '/' && <HeroCover />}

      <ContentArea path={path} navigate={navigate} />

      <Footer navigate={navigate} />
    </div>
  );
}
