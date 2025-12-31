import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetail() {
  const { id } = useParams();

  // --- 1. STATES ---
  const [handOrientation, setHandOrientation] = useState('Righty');
  const [laserText, setLaserText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [walletColor, setWalletColor] = useState('Honey');
  const [extra, setExtra] = useState('None');
  const [packaging, setPackaging] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    email: '',
    phone: '',
    address: '',
    city: ''
  });
  const [errors, setErrors] = useState({});

  // --- 2. LOGIC FOR TITLES & FIXED COLORS ---
  let productTitle = "Dastkaar Edition";
  let fixedColor = "";

  if (id === '1') { productTitle = "Honey Oak Classic"; fixedColor = "Honey Oak"; }
  else if (id === '2') { productTitle = "Old Brew Classic"; fixedColor = "Old Brew"; }
  else if (id === '3') { productTitle = "Obsidian Black Classic"; fixedColor = "Obsidian Black"; }
  else if (id === '4') { productTitle = "Lefty Series"; }
  else if (id === '5') { productTitle = "Flapper Edition"; }
  else if (id === '6') { productTitle = "Dastkaar Vault (Custom)"; }

  useEffect(() => {
    if (fixedColor) { setWalletColor(fixedColor); }
  }, [fixedColor]);

  // --- 3. PRICE CALCULATION ---
  const basePrice = 4000;
  const extraPrice = extra === 'Magnet' ? 500 : (extra === 'Button' ? 200 : extra === 'Vault' ? 800 : 0);
  const totalPrice = basePrice + extraPrice + parseInt(packaging);

  // --- 4. INPUT HANDLERS ---
  const handleInputChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };


const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;

    if (!customerName) newErrors.customer_name = "Name is required";
    if (!shippingDetails.email || !emailRegex.test(shippingDetails.email)) newErrors.email = "Valid email required";
    if (!shippingDetails.phone || !phoneRegex.test(shippingDetails.phone)) newErrors.phone = "11-digit WhatsApp required";
    if (!shippingDetails.city) newErrors.city = "City is required";
    if (!shippingDetails.address) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  // --- 5. FINALIZE ORDER (THE FIXED PART) ---
  const finalizeOrder = () => {
    if (!validateForm()) return;
    // We define finalData HERE so it collects all current states
    const finalData = {
      customer_name: customerName, // Now linked to input
      email: shippingDetails.email,
      phone: shippingDetails.phone,
      address: shippingDetails.address,
      city: shippingDetails.city,
wallet_type: id === '5' ? `${productTitle} (${handOrientation})` : productTitle,      color: walletColor,
      extra_feature: extra,
      laser_name: id === '6' ? laserText : 'None',
      total_price: totalPrice
    };

    console.log("Sending Data:", finalData);

    fetch('http://127.0.0.1:8000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(finalData)
    })

    .then(response => {
      if (!response.ok) throw new Error('Server Error - Check Laravel Console');
      return response.json();
    })
    .then(data => {
      alert("✅ Order Placed Successfully! Our team will contact you on Soon...");
      setShowModal(false);
    })
    .catch(err => {
      console.error("Database Error:", err);
      alert("❌ Submission Failed. Make sure Laravel is running!");
    });
  };

  return (

    
    <div className="container mt-5 mb-5">
      <div className="row">
        {/* LEFT SIDE: Media Section */}
        <div className="col-md-6">
          <div className="card shadow-sm border-0 mb-4">
            <img 
              src={`/src/assets/images/wallet${id}_main.jpg`} 
              className="img-fluid rounded-top" 
              alt={productTitle}
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Main+View"; }} 
            />
            <div className="d-flex border-top">
              <div className="col-6 border-end">
                <img src={`/src/assets/images/wallet${id}_side.jpg`} className="img-fluid" alt="Side View" onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Side+View"; }} />
              </div>
              <div className="col-6">
                <img src={`/src/assets/images/wallet${id}_inside.jpg`} className="img-fluid" alt="Inside View" onError={(e) => { e.target.src = "https://via.placeholder.com/300x200?text=Inside+View"; }} />
              </div>
            </div>
          </div>

          
        </div>

        {/* RIGHT SIDE: Customization */}
        <div className="col-md-6">
          <h1 className="fw-bold">{productTitle}</h1>
          <hr />

          {id === '6' && (
            <div className="mb-4 p-3 border border-warning rounded bg-light">
              <h4 className="fw-bold text-dark">🛠️ CUSTOMIZE YOUR WALLET</h4>
              <label className="form-label fw-bold">Enter Name for Laser Engraving:</label>
              <input type="text" className="form-control border-dark" placeholder="AHMAD KHAN" value={laserText} onChange={(e) => setLaserText(e.target.value)} />
            </div>
          )}

          {['1', '2', '3'].includes(id) ? (
            <div className="mb-4 text-primary"><strong>Color: {fixedColor}</strong></div>
          ) : (
            <div className="mb-4">
              <label className="fw-bold">Leather Color:</label>
              <select className="form-select" onChange={(e) => setWalletColor(e.target.value)}>
                <option value="Honey">Honey</option>
                <option value="Brown">Brown</option>
                <option value="Black">Black</option>
              </select>
            </div>
          )}

          {id !== '5' && (
            <div className="mb-4">
              <label className="fw-bold">Closure:</label>
              <select className="form-select" onChange={(e) => setExtra(e.target.value)}>
                <option value="None">None</option>
                <option value="Magnet">Magnet (+500)</option>
                <option value="Button">Button (+200)</option>
                {id === '6' && <option value="Vault">Vault Lock (+800)</option>}
              </select>
            </div>
          )}

          {id === '5' && (
  <div className="mb-4">
    <label className="fw-bold mb-2">Hand Orientation:</label>
    <div className="d-flex gap-3">
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="radio" 
          name="orientation" 
          id="righty" 
          value="Righty" 
          checked={handOrientation === 'Righty'} 
          onChange={(e) => setHandOrientation(e.target.value)} 
        />
        <label className="form-check-label" htmlFor="righty">Right-Handed</label>
      </div>
      <div className="form-check">
        <input 
          className="form-check-input" 
          type="radio" 
          name="orientation" 
          id="lefty" 
          value="Lefty" 
          checked={handOrientation === 'Lefty'} 
          onChange={(e) => setHandOrientation(e.target.value)} 
        />
        <label className="form-check-label" htmlFor="lefty">Left-Handed</label>
      </div>
    </div>
  </div>
)}

          <div className="mb-4">
            <label className="fw-bold">Packaging:</label>
            <select className="form-select" onChange={(e) => setPackaging(e.target.value)}>
              <option value="0">Normal</option>
              <option value="1000">Premium Packaging (+1000)</option>
            </select>
          </div>

          <div className="bg-dark text-white p-4 rounded shadow mb-4">
  <div className="d-flex justify-content-between align-items-center mb-3">
    <h3 className="mb-0 text-warning fw-bold">{totalPrice} PKR</h3>
    <span className="badge bg-secondary">Free Shipping</span>
  </div>

  <div className="small border-top border-secondary pt-3 mb-3">
    <div className="mb-2">🧵 <span className="ms-2">Saddle stitched by hand</span></div>
    <div className="mb-2">🐄 <span className="ms-2">Full-grain / 100% Orignal leather</span></div>
    <div className="mb-2">⏳ <span className="ms-2">Made in 14 days (custom/Magnet/Button)</span></div>
    <div className="mb-0">🔁 <span className="ms-2">30-day use & decide promise T&C apply</span></div>
  <hr/>
  <div className="mb-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }} >The {productTitle} is a compact leather wallet designed for those who carry only what matters. 
  Hand-stitched using premium leather, each piece is made to order and customized just for you.</div>
  </div>
  <div className="mt-2 small" id="careInstructions">
      This wallet is made from natural leather. Minor marks and color variation are part of its character. 
      Avoid water exposure. Condition occasionally with neutral leather balm. <br /> <br /> If there’s a craftsmanship issue, we’ll repair or replace it. Every piece is checked before dispatch.
    </div>
    <br />

  <button 
    className="btn btn-warning w-100 fw-bold py-3 text-uppercase shadow-sm" 
    onClick={() => setShowModal(true)}
  >
    Confirm Order
  </button>
</div>
        </div>
      </div>

      <div className="mt-4">
  <h5 className="fw-bold mb-3">🎬 Usage Videos</h5>
  {/* Row starts here */}
  <div className="row g-3"> 
    
    {/* First Video */}
    <div className="col-md-6">
      <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden text-center bg-light">
        <video controls poster={`/src/assets/images/thumb.jpeg`}>
          <source src={`/src/assets/videos/video3.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

    {/* Second Video */}
    <div className="col-md-6">
      <div className="ratio ratio-16x9 shadow-sm rounded overflow-hidden text-center bg-light">
        <video controls poster={`/src/assets/images/wallet4_side.jpg`}>
          <source src={`/src/assets/videos/video2.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

  </div> 
  {/* Row ends here */}
</div>

      {/* MODAL SECTION */}
      {showModal && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1050}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 rounded-0 shadow-lg">
              <div className="modal-header bg-black text-warning">
                <h5 className="modal-title fw-bold">CHECKOUT & SHIPPING</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body bg-light">
                {/* Name Input */}
                <div className="mb-2">
                  <input 
                    type="text" 
                    placeholder="Your Full Name" 
                    className={`form-control rounded-0 ${errors.customer_name ? 'is-invalid' : ''}`} 
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if(errors.customer_name) setErrors({...errors, customer_name: null});
                    }} 
                  />
                  {errors.customer_name && <div className="invalid-feedback small">{errors.customer_name}</div>}
                </div>

                {/* Email Input */}
                <div className="mb-2">
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    className={`form-control rounded-0 ${errors.email ? 'is-invalid' : ''}`} 
                    onChange={handleInputChange} 
                  />
                  {errors.email && <div className="invalid-feedback small">{errors.email}</div>}
                </div>

                {/* Phone Input */}
                <div className="mb-2">
                  <input 
                    type="text" 
                    name="phone" 
                    placeholder="WhatsApp Number (11 Digits)" 
                    className={`form-control rounded-0 ${errors.phone ? 'is-invalid' : ''}`} 
                    onChange={handleInputChange} 
                  />
                  {errors.phone && <div className="invalid-feedback small">{errors.phone}</div>}
                </div>

                {/* City Input */}
                <div className="mb-2">
                  <input 
                    type="text" 
                    name="city" 
                    placeholder="City" 
                    className={`form-control rounded-0 ${errors.city ? 'is-invalid' : ''}`} 
                    onChange={handleInputChange} 
                  />
                  {errors.city && <div className="invalid-feedback small">{errors.city}</div>}
                </div>

                {/* Address Input */}
                <div className="mb-3">
                  <textarea 
                    name="address" 
                    placeholder="Complete House Address" 
                    className={`form-control rounded-0 ${errors.address ? 'is-invalid' : ''}`} 
                    rows="3" 
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.address && <div className="invalid-feedback small">{errors.address}</div>}
                </div>
                
                <div className="p-3 bg-white border border-warning small">
                  <strong>PAYMENT:</strong> EasyPaisa /Nayapay: 03483877125 (Muhammad Ali)
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button className="btn btn-dark w-100 py-3 fw-bold" onClick={finalizeOrder}>CONFIRM ORDER ({totalPrice} PKR)</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;