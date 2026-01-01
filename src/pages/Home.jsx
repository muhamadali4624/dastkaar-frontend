import { Link } from 'react-router-dom';

const wallets = [
  { id: 1, name: "Honey Oak", price: "From 4000", img: "/src/assets/images/wallet1_main.jpg" },
  { id: 2, name: "Old Brew", price: "From 4000", img: "/src/assets/images/wallet2_main.jpg" },
  { id: 3, name: "Obsidian Black", price: "From 4000", img: "/src/assets/images/wallet3_main.jpg" },
  { id: 4, name: "The Lefty", price: "From 4000", img: "/src/assets/images/wallet4_main.jpg" },
  { id: 5, name: "The Vault", price: "From 4000", img: "/src/assets/images/wallet5_main.jpg" },
  { id: 6, name: "Customize", price: "From 4500" , img: "/src/assets/images/wallet6_main.jpg" },
];

function Home() {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 fw-dark">Dastkaar Signature Series</h2>
      <h3 className="text-center mb-5 fw-light">Premium Leather Wallets,Handmade In Pakistan Built For Everyday Carry.</h3>
      
      <div className="row">
        {wallets.map(w => (
          <div className="col-md-4 mb-4" key={w.id}>
            <div className="card border-0 shadow-sm h-100">
              <img src={w.img} className="card-img-top" alt={w.name} style={{height: '250px', objectFit: 'cover'}} />
              <div className="card-body text-center">
                <h5 className="fw-bold">{w.name}</h5>
                <p className="text-muted">{w.price} Rs</p>
                <Link to={`/product/${w.id}`} className="btn btn-dark w-100">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home; // This is very important!