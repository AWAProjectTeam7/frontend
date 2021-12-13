import React from 'react'
import { Outlet } from 'react-router-dom';
import xrequest from '../managed_scripts/xrequest'
import CartManager from '../managed_scripts/cartManager'
import CategoryContainer from './website-framework/categoryContainer/categoryContainer'
import ProductCard from './productCards/productCard'


class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartContent: [],
            isCartEmpty: false,
            venueProducts: []
        };
    }

    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        if (CartManager.loadCart())
        {
            this.getCityVenues();
        }
        else
        {
            //the cart is empty, signal it. This will let us show a message.
            this.setState({isCartEmpty: true});
        }
    }

    getCityVenues = () => {
        xrequest.GET("get_venue_and_products_by_venueID", CartManager.loadCart().venueID, (response)=>{
            this.setState({ 
                venueProducts: response.data.products,
                cartContent: this.compareVenues(response.data.products)
            });
        });
    }

    compareVenues = (data) => {
        let cartProducts = [];
        let _cart = CartManager.loadCart();
        data.forEach(element => {
            let _element = _cart.contents.find(cartElement => cartElement.productID == element.id);
            if (_element)
            {
                element.quantity = _element.quantity;
                cartProducts.push({element});
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
                        (this.state.isCartEmpty) ? "Your cart is empty." : <CategoryContainer categoryTitle="title" _componentData={this.state.cartContent} _component={ProductCard}/>
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