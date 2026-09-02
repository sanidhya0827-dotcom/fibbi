import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { trackEvent } from './lib/supabase';

import Announce from './components/Announce';
import Topbar from './components/Topbar';
import MobileNav from './components/MobileNav';
import MobileCta from './components/MobileCta';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Science from './pages/Science';
import Story from './pages/Story';
import Play from './pages/Play';
import Policies from './pages/Policies';

function PageViews() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    trackEvent('page_view', { path: location.pathname });
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <CartProvider>
      <PageViews />
      <Announce />
      <div className="nav-shell">
        <Topbar />
        <MobileNav />
      </div>
      <MobileCta />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/science" element={<Science />} />
          <Route path="/story" element={<Story />} />
          <Route path="/play" element={<Play />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}
