import './App.css';
import Error from './components/Error';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingCart from './components/ShoppingCart';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function App() {

  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <Link to="/"><div>Home</div></Link>
          <Link to="login"><div>Login</div></Link>
          <Link to="register"><div>Register</div></Link>
          <Link to="cart"><div>Cart</div></Link>
          
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="/login" element = { <Login /> } />
          <Route path="/register" element = { <Register /> } />
          <Route path="/cart" element = { <ShoppingCart /> } />
          <Route path="/*" element = { <Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;