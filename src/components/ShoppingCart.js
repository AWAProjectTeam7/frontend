import React from 'react'
import { Outlet } from 'react-router-dom';
import xrequest from '../managed_scripts/xrequest'
import CartManager from '../managed_scripts/cartManager'


class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartContent: {}
        };
    }

    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        console.log("Mor moro");
        console.log(CartManager.loadCart());
        this.setState({cart: CartManager.loadCart()}, ()=>{
            this.getCityVenues();
        });
    }

    getCityVenues = () => {
        xrequest.GET("get_venue_and_products_by_venueID", this.state.cartContent.venueID, (response)=>{
            this.setState({ 
                venueProducts: response.data.products,
                venueData:  response.data.venue,
            });
        });
    }

        render() {
            let content = (
            <div>
                <h1>Shopping cart</h1>
                <div>
                    {}
                </div>
                <Outlet />
            </div>
        );
        return content;
    }
}

export default Cart;