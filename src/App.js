import "./App.css";
import Error from "./components/Error";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ShoppingCart from "./components/ShoppingCart";
import RestaurantDetailView from "./components/RestaurantDetailView";
import Logo from "./components/Logo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import xrequest from "./managed_scripts/xrequest.js";

function App() {
  const [cityData, setCitysData] = useState([]);
  const [venuesData, setVenuesData] = useState([]);
  const [venuesByIdData, setVenuesByIdData] = useState([]);
  const [userInfo, setUserInfo] = useState();
 
 useEffect(() => {
  xrequest.setSource(
    "https://raw.githubusercontent.com/AWAProjectTeam7/backend/main/routes.json"
  );
   


 },[])
 

   // Get cities to show
   useEffect(() => {
    axios.get('https://team7awa-api.azurewebsites.net/public/cities')
    .then(function(respone)
    {
      setCitysData(respone.data.data.supportedCities);
    })
    .catch(function(error)
    { 
      console.log(error)
    })


  }, []);

  //handle Login
  const handleLogin = useCallback((e) => {
    xrequest.POST("login", e, (response) => {
      ;
      xrequest.GET("get_consumer_account_data", "", (response_data) => {
        // console.log(userInfo)


        setUserInfo(response_data.data.user);
      });
    });


    
  }, []);

  function handleLogout(){
    xrequest.POST("logout", '', (response) => {
      console.log(response);
    });
  };




 
  // Get restaurants by city to show
  const selectLocation = useCallback((e) => {
    xrequest.GET("get_venues_by_city", e.city, (response) => {
      //do stuff here with the API answer
      setVenuesData(response.data.venues);
    });
  }, []);

  //get specific restaurant by ID to show
  const getRestaurantID = useCallback((e) => {
    xrequest.GET("get_venue_and_products_by_venueID", e, (response) => {
      //do stuff here with the API answer
      setVenuesByIdData(response.data);
    });
      
  }, []);

  return (
    <BrowserRouter>
      {console.log(userInfo)}
      <div>
        <div className="navbar">
          {/* Change visual order with links */}
          <Logo />
          <Link to="/">
            <div>Home</div>
          </Link>

          {userInfo ? (
            <Link
              to="login"
              onClick={() => {
                handleLogout();
              }}
            >
              <div>Logout</div>
            </Link>
          ) : (
            <Link to="login">
              <div>Login</div>
            </Link>
          )}

          <Link to="register">
            <div>Register</div>
          </Link>
          <Link to="cart">
            <div>Shopping cart</div>
          </Link>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                restaurants={venuesData}
                cityData={cityData}
                selectLocation={selectLocation}
                getRestaurantID={getRestaurantID}
              />
            }
          ></Route>
          <Route
            path="/restaurant/:restaurantId"
            element={<RestaurantDetailView restaurant={venuesByIdData} />}
          />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
