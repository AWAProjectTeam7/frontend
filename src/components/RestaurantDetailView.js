import React from 'react'
import { useParams } from 'react-router-dom';
import '../App.css';

export default function ContactDetailView(props) {

   
  const result = useParams();
  
  const AddtoCart=(e) =>{
    var Quantity = 0;
    if (localStorage.getItem(e.id) === null) {
      Quantity = 1;
    }
    else {

      Quantity = parseInt(JSON.parse(localStorage.getItem(e.id)).quantity) + 1
    }
    e['quantity']=Quantity
    window.localStorage.setItem(e.id, JSON.stringify(e))
    
    alert("Add to cart successfully !!!")
  
  
  }
 
  const restaurant=props.restaurant.venue
  const menu=props.restaurant.products

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
      {menu.map((menu=>  <button className="card" key={menu.id} onClick={()=>AddtoCart(menu)}>
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
