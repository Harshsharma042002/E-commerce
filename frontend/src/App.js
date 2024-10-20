import './App.css'; 
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Signup from './pages/signup';
import Login from './pages/Login';
import { CartProvider } from './context/CartContext';
import Cart from './pages/Cart';
function App() {
  return (
    <div>
      <CartProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/product' element={<Product/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} /> 
          <Route path='/cart' element={<Cart/>} /> 
        </Routes>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;

