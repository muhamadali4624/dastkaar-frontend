import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

function ProductDetail({ setShowPopup, showPrice }) {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  
  const [walletColor, setWalletColor] = useState('Honey');
  const [extra, setExtra] = useState('None');

  let productTitle = "Dastkaar Edition";
  let fixedColor = "";

  // Product Logic
  if (id === '1') { productTitle = "DASTKAAR Signature Wallet"; fixedColor = "Honey Oak"; }
  else if (id === '2') { productTitle = "DASTKAAR Signature Wallet"; fixedColor = "Old Brew"; }
  else if (id === '3') { productTitle = "DASTKAAR Signature Wallet"; fixedColor = "Obsidian Black"; }
  else if (id === '4') { productTitle = "Lefty Series"; }
  else if (id === '5') { productTitle = "The Vault Edition"; }
  else if (id === '6') { productTitle = "Customize from DASTKAAR"; }

  useEffect(() => {
    if (fixedColor) setWalletColor(fixedColor);
    setIsLoading(false);
  }, [fixedColor]);

  const basePrice = 2999;
  const extraPrice = extra === 'Magnet' ? 500 : (extra === 'Button' ? 200 : extra === 'Vault' ? 800 : 0);
  const totalPrice = basePrice + extraPrice;

  const orderViaWhatsApp = () => {
    const message = `*INQUIRY - DASTKAAR*%0A*Product:* ${productTitle}%0A*Color:* ${walletColor}%0A*Price:* ${totalPrice} PKR`;
    window.open(`https://wa.me/923348919487?text=${message}`, '_blank');
  };

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-6">
          <img src={`/images/wallet${id}_main.jpg`} className="img-fluid rounded bg-dark" alt={productTitle} />
        </div>
        
        <div className="col-md-6">
          <h1 className="fw-bold">{productTitle}</h1>
          <hr />
          
          <div className="mb-4">
            <p>🧵 Saddle stitched by hand</p>
            <p>🐄 100% Original leather</p>
            <p>🛡️ 30 Day Test Drive</p>
          </div>

          <div className="bg-dark text-white p-4 rounded shadow mb-4 text-center">
            {!showPrice ? (
              <div className="mb-3">
                <p className="text-secondary small">Premium Craftsmanship Inside</p>
                <button className="btn btn-outline-warning fw-bold py-2 px-4" onClick={() => setShowPopup(true)}>
                  REVEAL PRICE
                </button>
              </div>
            ) : (
              <div className="mb-3">
                <h2 className="fw-bold text-success">Rs. {totalPrice}</h2>
                <p className="text-muted small">Handcrafted just for you</p>
              </div>
            )}

            <button className="btn btn-success w-100 fw-bold py-3" onClick={orderViaWhatsApp} style={{ backgroundColor: '#25D366', border: 'none' }}>
              ORDER VIA WHATSAPP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;