import React from 'react';

function About() {
  return (
    <div className="container my-5">
      {/* Hero Section */}
      <div className="row mb-5 align-items-center">
        <div className="col-md-6">
          <h1 className="display-4 fw-bold mb-4">OUR HERITAGE</h1>
          <p className="lead">
            Dastkaar is a celebration of slow craftsmanship. Every piece is cut, stitched, and finished by hand without shortcuts. We believe a wallet should not just carry your essentials, but also tell a story over time.
          </p>
        </div>
        <div className="col-md-6">
          <img 
            src="/src/assets/images/about-craftsman.jpg" 
            className="img-fluid shadow-lg" 
            alt="Craftsman Hands" 
            onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Hand-Stitching+Process"; }}
          />
        </div>
      </div>

      {/* The 3 Pillars Section */}
      <div className="row text-center mt-5">
        <div className="col-md-4">
          <div className="p-4 custom-box h-100">
            <h3 className="fw-bold">01</h3>
            <h5 className="text-gold">RAW MATERIAL</h5>
            <p>Ethically sourced leather selected for durability and natural aging.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 custom-box h-100">
            <h3 className="fw-bold">02</h3>
            <h5 className="text-gold">SADDLE STITCH</h5>
            <p>Hand-stitched for strength if one thread breaks, the stitch holds.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 custom-box h-100">
            <h3 className="fw-bold">03</h3>
            <h5 className="text-gold">PERSONALIZED</h5>
            <p>Your name, your style, your everyday companion.</p>
          </div>
        </div>
      </div>

      {/* Final Image Banner */}
      <div className="mt-5">
         <img 
            src="/src/assets/images/about2.jpg" 
            className="img-fluid w-100 rounded shadow" 
            style={{maxHeight: '400px', objectFit: 'cover'}}
            alt="Tools" 
            onError={(e) => { e.target.src = "https://via.placeholder.com/1200x400?text=The+Artisan+Workshop"; }}
          />
      </div>
    </div>
  );
}

export default About;