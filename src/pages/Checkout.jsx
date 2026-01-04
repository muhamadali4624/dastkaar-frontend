import React, { useState } from 'react';
import { useCart } from '../CartContext';

function Checkout() {
    const { cart, subtotal, addToCart, removeFromCart } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        city: '',
        address: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderItem = cart[0];

    // 1. Prepare Data (MUST include quantity for stock deduction)
    const orderData = {
        product_id: orderItem.product_id,
        quantity: orderItem.quantity, // Added this so Laravel can check stock
        customer_name: formData.name,
        wallet_type: orderItem.wallet_type,
        color: orderItem.color,
        extra_feature: orderItem.extra_feature || 'None',
        laser_name: orderItem.laser_name || 'None',
        total_price: subtotal,
        email: formData.email,
        phone: formData.whatsapp,
        address: formData.address,
        city: formData.city,
        status: 'Pending'
    };

    try {
        // 2. Send to Laravel
        const response = await fetch('http://127.0.0.1:8000/api/orders', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json' 
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (response.ok) {
            alert("Order successful!");
            window.location.href = "/success";
        } else if (response.status === 422 || response.status === 400) {
            // 3. This catches your "Only X left" error from OrderController
            alert(`STOCK ERROR: ${data.message}`);
        } else {
            alert("Server Error: " + (data.message || "Unknown error"));
        }
    } catch (error) {
        alert("Database connection failed. Check if 'php artisan serve' is running.");
    } finally {
        setIsSubmitting(false);
    }

};

    const orderViaWhatsApp = () => {
        const itemDetails = cart.map(i => `${i.wallet_type} (x${i.quantity})`).join(', ');
        const message = `*NEW ORDER - DASTKAAR*%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Items:* ${itemDetails}%0A*Total:* ${subtotal} PKR%0A*Address:* ${formData.address}, ${formData.city}`;
        window.open(`https://wa.me/923348919487?text=${message}`, '_blank');
    };

    if (cart.length === 0) return <div className="container mt-5 text-center"><h2>Your bag is empty.</h2></div>;

    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-md-8">
                    <h2 className="fw-bold mb-4">Checkout Summary</h2>
                    {cart.map((item) => (
                        <div key={item.product_id} className="card mb-3 shadow-sm border-0 p-3">
                            <div className="row align-items-center">
                                <div className="col-3 col-md-2">
                                    <img src={item.image} className="img-fluid rounded" alt="Product" />
                                </div>
                                <div className="col-5 col-md-6">
                                    <h6 className="fw-bold mb-0">{item.wallet_type}</h6>
                                    <small className="text-muted">{item.color} - {item.total_price} PKR</small>
                                </div>
                                <div className="col-4 col-md-4 text-end">
                                    <div className="btn-group border">
                                        <button className="btn btn-sm" onClick={() => removeFromCart(item.product_id)}>-</button>
                                        <span className="btn btn-sm disabled fw-bold text-dark">{item.quantity}</span>
                                        <button className="btn btn-sm" onClick={() => addToCart(item)}>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-md-4">
                    <div className="card bg-dark text-white p-4 rounded shadow border-0">
                        <h4 className="text-warning mb-4">Total: {subtotal} PKR</h4>
                        <button className="btn btn-warning w-100 fw-bold py-3" onClick={() => setShowModal(true)}>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.9)'}}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0">
                            <div className="modal-header bg-black text-white px-4">
                                <h5 className="modal-title fw-bold">FINAL DETAILS</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body p-4 bg-light">
                                <div className="alert alert-secondary small py-2 mb-3">
        Ordering: <strong>{cart[0].wallet_type}</strong> ({cart[0].color})
    </div>
                                <form onSubmit={handleSubmit}>
                                    <input type="text" name="name" className="form-control mb-3" placeholder="Full Name" required onChange={handleInputChange} />
                                    <input type="email" name="email" className="form-control mb-3" placeholder="Email Address" required onChange={handleInputChange} />
                                    <input type="text" name="whatsapp" className="form-control mb-3" placeholder="WhatsApp Number" required onChange={handleInputChange} />
                                    <input type="text" name="city" className="form-control mb-3" placeholder="City" required onChange={handleInputChange} />
                                    <textarea name="address" className="form-control mb-3" placeholder="Full Street Address" rows="2" required onChange={handleInputChange}></textarea>
                                    
                                    <button type="submit" className="btn btn-dark w-100 py-3 fw-bold mb-2">
                                        {isSubmitting ? "Processing..." : "CONFIRM ORDER"}
                                    </button>
                                    
                                    <div className="text-center my-2 small text-muted">If Failled</div>
                                    
                                    <button type="button" className="btn btn-success w-100 py-3 fw-bold" onClick={orderViaWhatsApp} style={{backgroundColor: '#25D366', border: 'none'}}>
                                        ORDER VIA WHATSAPP
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;