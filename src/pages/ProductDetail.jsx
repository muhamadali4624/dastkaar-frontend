import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // --- UI & Submission State ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stock, setStock] = useState(null);

  // --- Product Selection State ---
  const [handOrientation, setHandOrientation] = useState('Righty');
  const [laserText, setLaserText] = useState('');
  const [walletColor, setWalletColor] = useState('Honey');
  const [extra, setExtra] = useState('None');
  const [packaging, setPackaging] = useState(0);

  // --- Product Identity Logic ---
  let productTitle = "Dastkaar Edition";
  let fixedColor = "";

  if (id === '1') { productTitle = "DASTKAAR Signature Wallet"; fixedColor = "Honey Oak"; }
  else if (id === '2') { productTitle = "DASTKAAR Signature Wallet"; fixedColor = "Old Brew"; }
  else if (id === '3') { productTitle = "DASTKAAR Signature Wallet"; fixedColor = "Obsidian Black"; }
  else if (id === '4') { productTitle = "Lefty Series"; }
  else if (id === '5') { productTitle = "The Vault Edition"; }
  else if (id === '6') { productTitle = "Customize from DASTKAAR"; }

  useEffect(() => {
    if (fixedColor) { setWalletColor(fixedColor); }
  }, [fixedColor]);

  // --- Pricing Logic ---
  const basePrice = 4000;
  const extraPrice = extra === 'Magnet' ? 500 : (extra === 'Button' ? 200 : extra === 'Vault' ? 800 : 0);
  const totalPrice = basePrice + extraPrice + Number(packaging);

  // --- Fetch Stock ---
  useEffect(() => {
    setIsLoading(true);
    if (['1', '2', '3'].includes(id)) {
      fetch(`http://127.0.0.1:8000/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setStock(Number(data.stock_quantity));
          setIsLoading(false);
        })
        .catch(() => {
          setStock(0);
          setIsLoading(false);
        });
    } else {
      setStock(999); // High stock for on-order items
      setIsLoading(false);
    }
  }, [id]);

  const isOutOfStock = stock !== null && stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      alert("This item is currently out of stock!");
      return;
    }

    const item = {
      product_id: parseInt(id), 
      wallet_type: id === '4' ? `${productTitle} (${handOrientation})` : productTitle,
      color: walletColor,
      extra_feature: extra,
      laser_name: id === '6' ? laserText : 'None',
      total_price: totalPrice,
      image: `/images/wallet${id}_main.jpg`,
      quantity: 1
    };

    addToCart(item, stock);
    alert("Added to bag!");
  };

  const orderViaWhatsApp = () => {
    const message = `*INQUIRY - DASTKAAR*%0A*Product:* ${productTitle}%0A*Color:* ${walletColor}%0A*Price:* ${totalPrice} PKR`;
    window.open(`https://wa.me/923348919487?text=${message}`, '_blank');
  };

  if (isLoading) return <div className="text-center mt-5"><div className="spinner-border text-warning"></div></div>;

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        {/* Media Section */}
        {/* Media Section */}
        <div className="col-md-6">
          {/* Main Large Image */}
          <div className="card shadow-sm border-0 mb-3 bg-dark">
            <img 
              src={`/images/wallet${id}_main.jpg`} 
              className="img-fluid rounded" 
              alt={`${productTitle} Main`} 
              style={{ maxHeight: '500px', objectFit: 'contain' }} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Main+View"; }} 
            />
          </div>

          {/* Side and Inside Views Row */}
          <div className="row g-2">
            <div className="col-6">
              <div className="card shadow-sm border-0 bg-dark">
                <img 
                  src={`/images/wallet${id}_side.jpg`} 
                  className="img-fluid rounded" 
                  alt={`${productTitle} Side`} 
                  style={{  }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Side+View"; }}
                />
                <div className="card-img-overlay d-flex align-items-end p-1">
                  <span className="badge bg-dark opacity-75 small">{productTitle}</span>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card shadow-sm border-0 bg-dark">
                <img 
                  src={`/images/wallet${id}_inside.jpg`} 
                  className="img-fluid rounded" 
                  alt={`${productTitle} Inside`} 
                  style={{  }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Inside+View"; }}
                />
                <div className="card-img-overlay d-flex align-items-end p-1">
                  <span className="badge bg-dark opacity-75 small">{productTitle}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Customization Section */}
        <div className="col-md-6">
          <h1 className="fw-bold">{productTitle}</h1>
          <hr />

          {/* Feature List with Conditional 14-Day Logic */}
          <div className="mb-4">
            <p className="mb-1">🧵 Saddle stitched by hand</p>
            <p className="mb-1">🐄 Full-grain / 100% Original leather</p>
            {['4', '5', '6'].includes(id) ? (
              <p className="mb-1 text-dark fw-bold">⌛ These will be created on order: processing may take up to 14 days</p>
            ) : (
              <p className="mb-1">⌛ Handcrafted on order</p>
            )}
          </div>

          {id === '6' && (
            <div className="mb-4 p-3 border border-warning rounded bg-light">
              <label className="form-label fw-bold">Laser Engraving Name:</label>
              <input type="text" className="form-control" placeholder="Enter name" value={laserText} onChange={(e) => setLaserText(e.target.value)} />
            </div>
          )}

          {id === '6' && (
            <div className="mb-4">
              <label className="fw-bold">Hand Orientation:</label>
              <select className="form-select" value={handOrientation} onChange={(e) => setHandOrientation(e.target.value)}>
                <option value="Righty">Righty (Standard)</option>
                <option value="Lefty">Lefty</option>
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="fw-bold">Leather Color:</label>
            {['1', '2', '3'].includes(id) ? <p className="text-primary fw-bold">{fixedColor}</p> : (
              <select className="form-select" value={walletColor} onChange={(e) => setWalletColor(e.target.value)}>
                <option value="Honey">Honey</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
              </select>
            )}
          </div>

          <div className="mb-4">
            <label className="fw-bold">Closure:</label>
            <select className="form-select" onChange={(e) => setExtra(e.target.value)}>
              <option value="None">None</option>
              <option value="Magnet">Magnet (+500)</option>
              <option value="Button">Button (+200)</option>
              {id === '6' && <option value="Vault">Vault Lock (+800)</option>}
            </select>
          </div>

          <div className="bg-dark text-white p-4 rounded shadow mb-4">
            <h3 className="text-warning fw-bold mb-3">{totalPrice} PKR</h3>
            
            <button 
              className={`btn btn-warning w-100 fw-bold py-3 mb-2 ${isOutOfStock ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "OUT OF STOCK" : "ADD TO CART"}
            </button>

            <button className="btn btn-success w-100 fw-bold py-3" onClick={orderViaWhatsApp} style={{ backgroundColor: '#25D366', border: 'none' }}>
              ORDER VIA WHATSAPP
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 mb-5 p-4 bg-dark rounded shadow">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              {/* Note: I added 'poster' here. Put your thumbnail image in /public/images/ */}
              <video controls poster="/images/ready (2).png">
                <source src="/videos/video3.mp4" />
              </video>
            </div>
            <p className="text-white mt-2 small text-center">Flap Memory</p>
          </div>
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              <video controls poster="/images/wallet1_side.jpg">
                <source src="/videos/video2.mp4" />
              </video>
            </div>
            <p className="text-white mt-2 small text-center">How To Use?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;