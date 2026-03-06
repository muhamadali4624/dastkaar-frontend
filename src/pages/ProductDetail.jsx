import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stock, setStock] = useState(null);

 
  const [handOrientation, setHandOrientation] = useState('Righty');
  const [laserText, setLaserText] = useState('');
  const [walletColor, setWalletColor] = useState('Honey');
  const [extra, setExtra] = useState('None');
  const [packaging, setPackaging] = useState(0);
const [showPriceModal, setShowPriceModal] = useState(false);
  
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

 
  const basePrice = 2999;
  const extraPrice = extra === 'Magnet' ? 500 : (extra === 'Button' ? 500 : extra === 'Vault' ? 1000 : 0);
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
      setStock(999); 
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
       
        <div className="col-md-6">
          
          <div className="card shadow-sm border-0 mb-3 bg-dark">
            <img 
              src={`/images/wallet${id}_main.jpg`} 
              className="img-fluid rounded" 
              alt={`${productTitle} Main`} 
              style={{ maxHeight: '500px', objectFit: 'contain' }} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Main+View"; }} 
            />
          </div>



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
        
        <div className="col-md-6">
          <h1 className="fw-bold">{productTitle}</h1>
          <hr />

          
          <div className="mb-4">    
    
            <p className="mb-1">🐄 Full-grain / 100% Original leather</p>
            <p className="mb-1">🤝 5-Years Warranty</p>
            <p className="mb-1">🚚 Free Dilivery All Over Pakistan</p>
            <p className="mb-1">🧵 Saddle stitched by hand</p>
          
            {['4', '5', '6'].includes(id) ? (
              <p className="mb-1 text-dark fw-bold">⌛ These will be created on order: processing may take up to 14 days</p>
            ) : (
              <p className="mb-1">⌛ Handcrafted</p>
              
            )}<p className="mb-1">🛡️30 Day Test Drive.</p>
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

          {id === '6' && <div className="mb-4">
            <label className="fw-bold">Closure:</label>
            <select className="form-select" onChange={(e) => setExtra(e.target.value)}>
              {id === '6' && <option value="None">None</option>}
              {id === '6' && <option value="Magnet">Magnet (+500)</option>}
              {id === '6' && <option value="Button">Button (+500)</option>}
              {id === '6' && <option value="Vault">Vault Lock (+1000)</option>}
            </select>
          </div>}

          <div className="bg-dark text-white p-4 rounded shadow mb-4">
  {/* REVEAL PRICE BUTTON */}
  <button 
    className="btn btn-outline-warning w-100 fw-bold py-3 mb-3" 
    onClick={() => setShowPriceModal(true)}
    style={{ borderStyle: 'dashed', borderWidth: '2px' }}
  >
    REVEAL PRICE & DETAILS
  </button>
  
  <button 
    className="btn btn-success w-100 fw-bold py-3" 
    onClick={orderViaWhatsApp} 
    style={{ backgroundColor: '#25D366', border: 'none' }}
  >
    SEND ORDER
  </button>
</div>


        </div>
      </div>
      <div className="mt-5 mb-5 p-4 bg-dark rounded shadow">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="ratio ratio-16x9">
              
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
      {showPriceModal && (
  <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 1050 }}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content border-0">
        <div className="modal-header bg-black text-white px-4">
          <h5 className="modal-title fw-bold">PRICING BREAKDOWN</h5>
          <button type="button" className="btn-close btn-close-white" onClick={() => setShowPriceModal(false)}></button>
        </div>
        
        <div className="modal-body p-4 bg-light">
          {/* Scrollable Description Section */}
          <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '20px', paddingRight: '10px' }} className="text-muted small">
            <h6 className="text-dark fw-bold">Why this price?</h6>
            <p>Every <strong>{productTitle}</strong> is different from regular market wallets for several important reasons.
<hr />
First, the design is unique and minimal not a mass-produced common style you see everywhere.<hr />
Second, we use 100% Full Grain Vegetable-Tanned Leather.
<br /><hr />
This leather is not sanded, corrected, or artificially coated. It keeps its natural grain and natural imperfections which leather lovers actually prefer. Over time, it develops a rich patina and character that synthetic or corrected leather can never achieve.
<br /><hr />
Most wallets in the 1500–2000 range use bonded leather, corrected grain, or synthetic material. They may look similar at first, but they don’t age beautifully and usually don’t last beyond a year.
<br /><hr />
Our wallet is built to last 5–10 years (lifetime support).<br /><hr />
We provide written warranty on the receipt. If any structural issue happens under normal use, we repair, redo, or replace it.
We also offer something very rare in Pakistan:<br /><hr />
30-Day Test Drive.<br />
Once delivered, you have a full month to use it properly. If you genuinely feel it’s not for you, you can return it. No pressure.
<br /><hr />

Additionally: <br />
* Saddle stitched (one of the most durable stitching techniques)<br />
* Fully durable structure<br />
* Eco-friendly vegetable tanning process<br />
* Designed for long-term everyday carry<br /><hr />
Now about the price:
<br />
If someone spends 1000–2000 on a wallet that lasts 1 year, they’ll keep replacing it.<br />
If you invest once in something that lasts 5–10 years and develops beautiful aging over time, it becomes part of your story almost a memory piece.
<br />
This is not a disposable wallet.<br />
It’s an investment piece for people who value craftsmanship.<hr />
<br />
We are not targeting low-end synthetic market.<br />
Our focus is customers who appreciate premium, authentic leather goods.<hr />
<br />
For comparison, Some brands using the same type of leather sell similar wallets between 40,000 – 110,000 PKR.
<br />
We are offering handcrafted quality at a fraction of that price.<br /><hr />
That’s why our pricing reflects value, durability, and authenticity not mass production.</p>
            <hr />
            <p className="mb-0"><strong>Base Price:</strong> 2999 PKR</p>
            {extra !== 'None' && <p className="mb-0"><strong>{extra} Feature:</strong> +{extraPrice} PKR</p>}
          </div>

          {/* Final Price Highlight */}
          <div className="bg-dark text-center text-warning p-3 rounded shadow-sm">
            <small className="text-white-50 d-block mb-1">With Free Dilivery</small>
            <h2 className="fw-bold mb-0">{totalPrice} PKR</h2>
          </div>

          <button 
            className="btn btn-dark w-100 py-3 fw-bold mt-3" 
            onClick={() => setShowPriceModal(false)}
          >
            I UNDERSTAND
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ProductDetail;