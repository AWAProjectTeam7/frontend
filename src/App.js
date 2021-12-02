import './App.css';
import Error from './components/Error';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingCart from './components/ShoppingCart';
import RestaurantDetailView from './components/RestaurantDetailView';
import Logo from './components/Logo';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import RestaurantData from './data.json';
import {useEffect,useState,useCallback} from "react"

function App() {

  const [cityData,setCitysData]= useState([]);
  const [venuesData,setVenuesData]=useState([]);
  const [venuesByIdData,setVenuesByIdData]=useState([]);
  const restaurants = RestaurantData.map(restaurant => {
    return { ...restaurant, id: uuidv4() }
  })
  //
  const selectLocation= useCallback((e) =>{
    axios.get(`https://team7awa-api.azurewebsites.net/public/cities/${e.city}/venues`)
    .then(response => {
      setVenuesData(response.data.data.venues)
      
     
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  })  

  const getRestaurantID= useCallback((e)=>{
    axios.get(`https://team7awa-api.azurewebsites.net/public/venues/${e}`)
    .then(response => {
      setVenuesByIdData(response.data.data)
      
      console.log(venuesByIdData)
     
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  })
  useEffect(() => {
    axios.get('https://team7awa-api.azurewebsites.net/public/cities')
    .then(response => {
      setCitysData(response.data.data.supportedCities)
     
     
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
  },[])
  
  return (
    
    <BrowserRouter>
   
      <div>
        <div className="navbar">
          {/* Change visual order with links */}
          <Logo />
          <Link to="/"><div>Home</div></Link>
          <Link to="login"><div>Login</div></Link>
          <Link to="register"><div>Register</div></Link>
          <Link to="cart"><div>Shopping cart</div></Link>
          
        </div>
    
        <Routes>
          <Route path="/" element={ <Home restaurants={ venuesData} cityData={cityData} selectLocation={selectLocation} getRestaurantID={getRestaurantID}/> } >
          
          </Route>
          <Route path="/restaurant/:restaurantId" element={ <RestaurantDetailView restaurant={venuesByIdData} /> } />
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