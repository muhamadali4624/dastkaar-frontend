import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx'; // <--- ADD THIS LINE
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Success from './pages/Success';

function App() {
  return (
    <Router>
  
      <div className="d-flex flex-column min-vh-100">
    
        <Header />
        
        <main className="flex-grow-1">
        <ScrollToTop /> {/* Add this here */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;