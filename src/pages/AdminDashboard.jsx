import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [view, setView] = useState('orders');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminToken');
    if (!isLoggedIn) {
      window.location.replace('/admin/login');
      return;
    }
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/admin/orders')
      .then(res => res.json())
      .then(data => setOrders(data));

    fetch('http://127.0.0.1:8000/api/admin/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  };

  const handleDeleteOrder = (id) => {
    if (window.confirm("Are you sure you want to delete this order? This cannot be undone.")) {
      fetch(`http://127.0.0.1:8000/api/admin/orders/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(() => {
        alert("Order Deleted!");
        setOrders(orders.filter(order => order.id !== id));
      })
      .catch(err => alert("Delete failed"));
    }
  };

  const handleStockUpdate = (id, newStock) => {
    fetch(`http://127.0.0.1:8000/api/admin/products/${id}/stock`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock_quantity: newStock })
    }).then(() => {
        fetchData(); 
    });
  };

  const handleStatusChange = (orderId, status) => {
    setSelectedStatuses({ ...selectedStatuses, [orderId]: status });
  };

  const submitStatusUpdate = (orderId) => {
    const newStatus = selectedStatuses[orderId];
    if (!newStatus) return alert("Please select a status");

    fetch(`http://127.0.0.1:8000/api/admin/orders/${orderId}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    .then(res => res.json())
    .then(() => {
      alert("Status updated! Email sent to customer.");
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.replace('/admin/login');
  };

  return (
    <div className="container-fluid mt-5 px-4">
      {/* HEADER & NAVIGATION */}
      <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-3 border shadow-sm">
        <div>
          <h2 className="fw-bold mb-0 text-dark">DASTKAAR ADMIN</h2>
          <div className="mt-2">
            <button className={`btn btn-sm me-2 ${view === 'orders' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setView('orders')}>ORDERS</button>
            <button className={`btn btn-sm ${view === 'products' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setView('products')}>INVENTORY (STOCKS)</button>
          </div>
        </div>
        <button className="btn btn-danger btn-sm rounded-0 fw-bold" onClick={handleLogout}>LOGOUT</button>
      </div>

      {/* VIEW 1: ORDERS TABLE */}
      {view === 'orders' && (
        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm bg-white border">
            <thead className="table-dark text-uppercase small">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Price</th>
                <th style={{width: '300px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer_name}<br/><small className="text-muted">{order.phone}</small></td>
                  <td>{order.wallet_type} ({order.color})</td>
                  <td>{order.total_price} PKR</td>
                  <td>
                    <div className="d-flex gap-2">
                        <select className="form-select form-select-sm" onChange={(e) => handleStatusChange(order.id, e.target.value)} defaultValue={order.status}>
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button className="btn btn-dark btn-sm" onClick={() => submitStatusUpdate(order.id)}>UPDATE</button>
                        <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteOrder(order.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW 2: PRODUCT MANAGEMENT */}
      {view === 'products' && (
        <div className="table-responsive">
          <table className="table table-bordered bg-white shadow-sm align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Stock Quantity</th>
                <th>Stock Visibility</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td className="fw-bold">{product.name}</td>
                  <td>
                    <div className="input-group input-group-sm w-50">
                        <input 
                            type="number" 
                            className="form-control" 
                            defaultValue={product.stock_quantity} 
                            onBlur={(e) => handleStockUpdate(product.id, e.target.value)} 
                        />
                        <span className="input-group-text">Pieces</span>
                    </div>
                  </td>
                  <td>
                    {product.stock_quantity > 0 ? (
                        <span className="badge bg-success px-3">Available</span>
                    ) : (
                        <span className="badge bg-danger px-3">Out Of Stock</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;