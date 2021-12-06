import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home(props) {
  const getRestaurantID= (e) =>{
    props.getRestaurantID(e)
  }
  
  return (
    <div className="restaurantListView">
      <div className="restaurantList">
    
          {props.cityData.map(city=>   <button key={city} onClick={()=>{props.selectLocation({city})}}><div>{city}</div></button>)}

          { props.restaurants.map(restaurant =>
          
        <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} onClick={()=>getRestaurantID(restaurant.id)}>
       
          <div className="restaurantListElement">
          <img src={restaurant.image} style={{height:"50px"}}></img>
            {restaurant.name} {restaurant.category}</div>
          <div>{restaurant.address}</div>
        </Link>
      )}
      </div>
      <div className="restaurantDetail">
        Here the details of seleceted city
        <Outlet />
      </div>
    </div>
  )
}
