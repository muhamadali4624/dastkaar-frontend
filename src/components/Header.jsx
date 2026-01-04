import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Ensure this path is correct

function Header() {
  // Only declare it once here
  const { cartCount } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm bg-black px-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <Link className="navbar-brand me-4" to="/">
            DASTKAAR<span className="text-white fs-6 fw-light">.co</span>
          </Link>
        </div>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto text-uppercase small fw-bold align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">Our Story</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            
            <li className="nav-item ms-lg-3">
              <Link className="nav-link position-relative" to="/checkout">
                <i className="bi bi-bag-fill fs-5"></i>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
            <Link className="nav-link text-warning fw-bold small me-3 d-none d-md-block" to="/admin/login">
              <i className="bi bi-person-lock me-1"></i> SIGN-IN
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;