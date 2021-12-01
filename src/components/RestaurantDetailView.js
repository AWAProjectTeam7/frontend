import React from 'react'
import { useParams } from 'react-router-dom';

export default function ContactDetailView(props) {

  const result = useParams();

  const restaurant = props.restaurants.find(restaurant => restaurant.id === result.restaurantId);
  if(restaurant == null) {
    return <div>No matching contact</div>
  }

  return (
    <div>
      <table>
        <tr>
          <td>Name</td>
          <td>{restaurant.name}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{restaurant.location}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{restaurant.type}</td>
        </tr>
      </table>

    </div>
  )
}
