import { Link } from 'react-router-dom';

function Success() {
  return (
    <div className="container text-center mt-5 mb-5">
      <div className="py-5 shadow-lg rounded bg-white">
        <h1 className="display-4 text-success">🎉 Order Placed!</h1>
        <p className="lead mt-3">Thank you for choosing <strong>Dastkaar</strong>.</p>
        <p className="text-muted">We have received your order and will contact you on WhatsApp shortly.</p>
        <hr className="my-4 mx-auto" style={{width: '50%'}} />
        <Link to="/" className="btn btn-dark btn-lg px-5 fw-bold">CONTINUE SHOPPING</Link>
      </div>
    </div>
  );
}

export default Success;