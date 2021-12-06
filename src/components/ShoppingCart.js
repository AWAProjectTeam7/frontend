import React, { useEffect, useState, useCallback } from "react";
import "../shoppingcart.css";
export default function ShoppingCart() {
  //To store values from local storage
  const [ordersArray, setOrdersArray] = useState(null);
  const [summary, setSumary] = useState(0);
  const [rerender, setRerender] = useState(true);
  //temporary order array and summary
  var tempArray = [];
  var tempSummary = 0;
  // It's called when localstorage's length has any changes.
  useEffect(() => {
    if (rerender == true) {
      for (let i = 0; i < localStorage.length; i++) {
        tempArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        tempSummary =
          tempSummary +
          JSON.parse(localStorage.getItem(localStorage.key(i))).quantity *
            JSON.parse(localStorage.getItem(localStorage.key(i))).price;
      }
      setOrdersArray(tempArray);
      setSumary(tempSummary.toFixed(2));
      setRerender(false);
    }
  }, [localStorage.length, rerender]);

  //Function to increase and decrease quantity
  const increaseQuantity = useCallback((e) => {
    e["quantity"] = JSON.parse(localStorage.getItem(e.id)).quantity + 1;
    window.localStorage.setItem(e.id, JSON.stringify(e));
    setRerender(true);
  },[]);
  const decreaseQuantity = useCallback((e) => {
    if(JSON.parse(localStorage.getItem(e.id)).quantity>1){
        e["quantity"] = JSON.parse(localStorage.getItem(e.id)).quantity - 1;
        window.localStorage.setItem(e.id, JSON.stringify(e));
    }
    else{
        localStorage.removeItem(e.id);
    }
    setRerender(true);
  },[]);

  const deleteOrder= useCallback(
      (e) => {
        localStorage.removeItem(e.id);
        setRerender(true);
      });

  const CheckOut= useCallback(()=>{
      console.log("yes")
  })


  //rendering
  if (ordersArray) {
    return (
      <div>
        <h1>Shopping cart</h1>
        <div class="container">
          <div class="order_summary">
            <h1>Order Summary</h1>
            <div class="summary_card">

              {ordersArray.map((order) => (
                <div class="card_item" key={order.id}>
                  <div class="product_img">
                    <img src={order.image} alt="" />
                  </div>
                  <div class="product_info">
                    <div>
                      <h1>
                        {order.name}{" "}
                        <button
                          onClick={() => {
                            deleteOrder(order);
                          }}
                        >
                          X
                        </button>
                      </h1>
                    </div>
                    <p>{order.description}</p>
                    <div class="close-btn">
                      <i class="fa fa-close"></i>
                    </div>
                    <div class="product_rate_info">
                      <h1>$ {order.price}</h1>
                      <button
                        class="pqt-minus"
                        onClick={() => {
                          decreaseQuantity(order);
                        }}
                      >
                        -
                      </button>
                      <span class="pqt">{order.quantity}</span>
                      <button
                        class="pqt-plus"
                        onClick={() => {
                          increaseQuantity(order);
                        }}
                      >
                        +
                      </button>
                      <h1>$ {(order.price * order.quantity).toFixed(2)}</h1>
                    </div>
                  </div>
                </div>
              ))}

              <hr />
              <div class="order_price">
                <p>Order summary</p>
                <h4>$ {summary}</h4>
              </div>
              <div class="order_service">
                <p>Shipping fee</p>
                <h4>$10</h4>
              </div>
              <div class="order_total">
                <p>Total Amount</p>
                <h4>${parseFloat(summary) + 10}</h4>
              </div>
            </div>
            <button onClick={()=>{CheckOut()}}>Check out</button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No data</div>;
  }
}
