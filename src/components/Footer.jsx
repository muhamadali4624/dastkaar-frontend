import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-white pt-5 pb-3 mt-5 border-top border-warning">
      <div className="container">
        <div className="row">
          {/* Brand Column */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-gold mb-3" style={{color: '#d4af37'}}>DASTKAAR</h4>
            <p className="text-light opacity-75 small">
              Handcrafting premium leather goods in Pakistan since 2023. 
              We preserve the art of traditional saddle-stitching.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4 text-center">
            <h6 className="text-uppercase fw-bold mb-3 text-gold" style={{color: '#d4af37'}}>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-light text-decoration-none small opacity-75">Shop All</Link></li>
              <li className="mb-2"><Link to="/about" className="text-light text-decoration-none small opacity-75">Artisan Story</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-light text-decoration-none small opacity-75">Support</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="col-md-4 mb-4 text-md-end">
            <h6 className="text-uppercase fw-bold mb-3 text-gold" style={{color: '#d4af37'}}>Connect With Us</h6>
            
            {/* Social Logos */}
            <div className="d-flex justify-content-md-end gap-3 mb-4 fs-4">
              <a href="https://www.instagram.com/dastkaar.co/" target="_blank" rel="noreferrer" className="text-light opacity-75"><i className="bi bi-instagram"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light opacity-75"><i className="bi bi-facebook"></i></a>
              <a href="https://www.linkedin.com/company/dastkaarco/" target="_blank" rel="noreferrer" className="text-light opacity-75"><i className="bi bi-linkedin"></i></a>
            </div>

            {/* Email Link */}
            <p className="mb-1">
              <a href="mailto:dastkaarglobal@gmail.com" className="text-light text-decoration-none small opacity-75">
                <i className="bi bi-envelope-fill me-2"></i>dastkaarglobal@gmail.com
              </a>
            </p>

            {/* WhatsApp Link */}
            <p>
              <a href="https://wa.me/923348919487" target="_blank" rel="noreferrer" className="text-light text-decoration-none small opacity-75">
                <i className="bi bi-whatsapp me-2"></i>+92 334 8919487
              </a>
            </p>
          </div>
        </div>
        
        <hr className="border-secondary opacity-25" />
        
        <div className="row mt-3 align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small text-light opacity-50 mb-0">
              &copy; {new Date().getFullYear()} DASTKAAR LEATHER STUDIOS.
            </p>
          </div>
          {/* <div className="col-md-6 text-center text-md-end">
            <p className="small text-light opacity-50 mb-0">
              Made with ❤️ by <a href="https://codemarkaz.com" target="_blank" rel="noreferrer" className="text-gold text-decoration-none fw-bold" style={{color: '#d4af37'}}>codemarkaz.com</a>
            </p>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;