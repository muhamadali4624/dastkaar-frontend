import React from 'react';

function About() {
  return (
    <div className="container my-5">
      
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

      
      <div className="row text-center mt-5">
        <div className="col-md-4">
          <div className="p-4 custom-box h-100">
            <h3 className="fw-bold">01</h3>
            <h5 className="text-gold">FULL GRAIN LEATHER</h5>
            <p>Ethically sourced Vegetable tanned leather selected for developing natural patina with usage and enviormental exposure.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 custom-box h-100">
            <h3 className="fw-bold">02</h3>
            <h5 className="text-gold">30 DAY TEST DRIVE</h5>
            <p>There's only one catch, you actually have to try it out for a month before you decide. No judging a book by its cover.</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-4 custom-box h-100">
            <h3 className="fw-bold">03</h3>
            <h5 className="text-gold">Hand Tanned</h5>
            <p>Each wallet is personally tanned one by one. Not Heavely Produced <br />(Imperfections expected )</p>
          </div>
        </div>
      </div>

      
      <div className="mt-5">
         <img 
            src="images/about2.jpg" 
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