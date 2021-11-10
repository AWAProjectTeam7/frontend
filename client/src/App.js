import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function App() {

  return (
    <BrowserRouter>
      <div>
        <div className="navbar">
          <Link to="/"><div>Home</div></Link>
          
        </div>
        <Routes>
          <Route path="/" element={ <Home /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;