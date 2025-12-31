function Contact() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 bg-white p-5 shadow-sm rounded">
          <h2 className="text-center mb-4 fw-bold">Get In Touch</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control rounded-0" placeholder="John Doe" />
            </div>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control rounded-0" placeholder="name@example.com" />
            </div>
            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea className="form-control rounded-0" rows="4" placeholder="Tell us about your custom requirement..."></textarea>
            </div>
            <button className="btn btn-dark w-100 py-2 rounded-0 shadow">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;