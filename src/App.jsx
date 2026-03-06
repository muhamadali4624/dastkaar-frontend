import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './CartContext';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx'; 
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
  const [showPrice, setShowPrice] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <CartProvider>
      <Router>
        {/* Main Layout Container */}
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="flex-grow-1">
            <ScrollToTop /> 
            <Routes>
              <Route path="/" element={<Home setShowPopup={setShowPopup} showPrice={showPrice} />} />
              <Route path="/product/:id" element={<ProductDetail setShowPopup={setShowPopup} showPrice={showPrice} />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>

      {/* --- MODAL MOVED OUTSIDE THE MAIN LAYOUT --- */}
      {showPopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup-content-modal">
            <div className="modal-header-custom">
              <span className="fw-bold text-uppercase">The Value of Dastkaar</span>
              <button className="close-x" onClick={() => setShowPopup(false)}>&times;</button>
            </div>
            
            <div className="modal-body-custom">
              <div className="info-box-grey mb-3">Hand-stitched premium top-grain leather</div>
              <div className="form-style-text mb-3">
                Our Vault Wallet is an investment built to last a lifetime. Each piece is saddle-stitched by hand for maximum durability.
              </div>
              <div className="premium-choice-list text-start mb-4">
                <div className="form-style-text small mb-2">✅ 100% Full-grain Original Leather</div>
                <div className="form-style-text small mb-2">✅ Specialized Left/Right Hand Orientations</div>
                <div className="form-style-text small">✅ 30-Day Money Back Guarantee</div>
              </div>
              <button 
                className="reveal-btn-green w-100 fw-bold py-3" 
                onClick={() => { setShowPrice(true); setShowPopup(false); }}
              >
                I UNDERSTAND, REVEAL PRICE
              </button>
            </div>
          </div>
        </div>
      )}
    </CartProvider>
  );
}

export default App;