import React from 'react'
import { Outlet } from 'react-router-dom';
import xrequest from '../managed_scripts/xrequest'
import CartManager from '../managed_scripts/cartManager'


class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartContent: {},
            isCartEmpty: false,
            venueProducts: []
        };
    }

    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        if (CartManager.loadCart())
        {
            this.setState({cartContent: CartManager.loadCart()}, ()=>{
                this.getCityVenues();
            });
        }
        else
        {
            //the cart is empty, signal it. This will let us show a message.
            this.setState({isCartEmpty: true});
        }
    }

    getCityVenues = () => {
        xrequest.GET("get_venue_and_products_by_venueID", this.state.cartContent.venueID, (response)=>{
            this.setState({ 
                venueProducts: response.data.products
            });
        });
    }

    compareVenues = () => {
        let cartProducts = [];
        this.state.venueProducts.forEach(element => {
            let _element = this.state.cartContent.contents.find(cartElement => cartElement.productID == element.id);
            if (_element)
            {
                cartProducts.push({_element});
            }
        });
        return cartProducts;
    }

        render() {
            let content = (
            <div>
                <h1>Shopping cart</h1>
                <div>
                    {
                        (this.state.isCartEmpty) ? "Your cart is empty." : ""
                    }
                </div>
                <div>
                    {
                        
                    }
                </div>
                <Outlet />
            </div>
        );
        return content;
    }
}

export default Cart;