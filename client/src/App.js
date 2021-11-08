import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Landing page</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/home">Home</Link> |{" "}
        <Link to="/login">Login</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
