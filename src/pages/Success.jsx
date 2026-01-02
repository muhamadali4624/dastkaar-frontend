import { Link, useLocation } from 'react-router-dom';

function Success() {
  const location = useLocation();

  const isContact = location.state?.from === 'contact';

  return (
    <div className="container text-center mt-5 mb-5">
      <div className="py-5 shadow-lg rounded bg-white">
        
        <h1 className="display-4 text-success">
          {isContact ? "🎉 Message Sent!" : "🎉 Order Placed!"}
        </h1>
        
        <p className="lead mt-3">
          Thank you for choosing <strong>Dastkaar</strong>.
        </p>
        
        
        <p className="text-muted">
          {isContact 
            ? "We have received your inquiry and will email you back shortly." 
            : "We have received your order and will contact you on WhatsApp shortly."}
        </p>
        
        <hr className="my-4 mx-auto" style={{width: '50%'}} />
        
        <Link to="/" className="btn btn-dark btn-lg px-5 fw-bold">
          {isContact ? "BACK TO HOME" : "CONTINUE SHOPPING"}
        </Link>
      </div>
    </div>
  );
}

export default Success;