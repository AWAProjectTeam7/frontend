import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home(props) {
  return (
    <div className="restaurantListView">
      <div className="restaurantList">
      { props.restaurants.map(restaurant =>
        <Link to={ restaurant.id }>
          <div className="restaurantListElement">{restaurant.name} {restaurant.location}</div>
        </Link>
      )}
      </div>
      <div className="restaurantDetail">
        Here the details of seleceted restaurant
        <Outlet />
      </div>
    </div>
  )
}
