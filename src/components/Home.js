import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Home(props) {
  return (
    <div className="contactListView">
      <div className="contactList">
      { props.restaurants.map(restaurant =>
        <Link to={ restaurant.id }>
          <div className="contactListElement">{restaurant.name} {restaurant.location}</div>
        </Link>
      )}
      </div>
      <div className="contactDetail">
        Here the details of seleceted restaurant
        <Outlet />
      </div>
    </div>
  )
}
