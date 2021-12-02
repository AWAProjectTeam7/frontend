import React from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';

export default function ContactDetailView(props) {

   
  const result = useParams();
  

 
  const restaurant=props.restaurant.venue
  const menu=props.restaurant.products
  console.log(menu)
  if(restaurant== null) {
    return <div>No matching contact</div>
  }
  else
  {

  
 

  return (
    <div>
      <table>
        <tbody>
        <tr>
          <td>Name</td>
          <td>{restaurant.name}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{restaurant.address}</td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{restaurant.category}</td>
        </tr>
        <tr>
          <td>Pricing</td>
          <td>{restaurant.pricing}</td>
        </tr>
        <tr>
          <td>Working hours</td>
        
          <td>
            <div>
            Monday: {restaurant.businessHours.mon.map(hihi=> hihi +"---")}
            </div>
            <div>
            Tueday: {restaurant.businessHours.tue.map(hihi=> hihi +"---")}
            </div>
            <div>
            Wednesday : {restaurant.businessHours.wen.map(hihi=> hihi +"---")}
            </div>
            <div>
            Thursday: {restaurant.businessHours.thu.map(hihi=> hihi +"---")}
            </div>
            <div>
            Friday: {restaurant.businessHours.fri.map(hihi=> hihi +"---")}
            </div>
            <div>
            Saturday: {restaurant.businessHours.sat.map(hihi=> hihi +"---")}
            </div>
            <div>
            sunday: {restaurant.businessHours.sun.map(hihi=> hihi +"---")}
            </div>

            </td>
        
        </tr>
        </tbody>
      </table>
    <div >
      {menu.map((menu=>  <button className="card" key={menu.id}>
            <img src={menu.image}  style={{width:'30%'}}/>
            <div className="container">
              <h4><b>{menu.name}</b></h4> 
              <p>{menu.category}</p> 
              <p>{menu.description}</p> 
              <p>{menu.price}</p> 
            </div>
                  </button>))}
         
    </div>
    </div>
  )
}
}
