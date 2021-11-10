import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Landing page</h1>
      <nav className="navbar">
        <Link to="/home">Home</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
