import React from 'react'
import { useNavigate } from 'react-router-dom'
import xrequest from '../../../managed_scripts/xrequest'
import CartManager from '../../../managed_scripts/cartManager'
import CategoryContainer from '../../website-framework/categoryContainer/categoryContainer'
import ProductCard from '../../productCards/productCard'
import Container from '../../website-framework/container/container'
import styles from './shoppingcart.module.css'
import venueInfo from './venueInfo/venueField'
import customerInfo from './customerInfo/customerInfo'
import CartData from './cartdata/cartData.js'

function UseRouterHook(Component) {
    return function WrappedComponent(props) {
        const _params = useNavigate();
        return <Component {...props} _navHook={_params} />;
    }
}

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cartContent: [],
            isCartEmpty: false,
            venueProducts: [],
            cartTotal: 0,
            venueInfo: {},
            consumerData: {},
            error: ""
        };
    }

    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        this.getCityVenues();
    }

    getCityVenues = () => {
        if (CartManager.loadCart().orderContents.length != 0)
        {
            xrequest.GET("get_venue_and_products_by_venueID", CartManager.loadCart().venueID, (response)=>{
                this.setState({ 
                    venueProducts: response.data.products,
                    venueInfo: response.data.venue,
                    cartContent: this.compareVenues(response.data.products)
                }, ()=>{this.getCartTotal()});
                xrequest.GET("get_consumer_account_data", "", (response)=>{
                    this.setState({ 
                        consumerData: response.data.user
                    });
                });
            });
        }
        else
        {
            //the cart is empty, signal it. This will let us show a message.
            this.setState({isCartEmpty: true});
        }
    }

    API_submit_order = ()=>{
        console.log(CartManager.loadCart());
        xrequest.POST("post_consumer_order", CartManager.loadCart(), (response)=>{
            if (response.status == "success")
            {
                let target = "/order/" + response.data.orderID;
                this.props._navHook(target);
            }
            else if (response.errorMessage == "Unauthorized")
            {
                this.setState({error: "You need to be logged in to complete this action."}, ()=>{
                    setTimeout(()=>{
                        this.setState({error: ""});
                    }, 10000);
                });
            }
        });
    }

    compareVenues = (data) => {
        let cartProducts = [];
        let _cart = CartManager.loadCart();
        data.forEach(element => {
            let _element = _cart.orderContents.find(cartElement => cartElement.productID == element.id);
            if (_element)
            {
                element.quantity = _element.quantity;
                element.addItem = (id)=>{CartManager.addItem(id); this.getCityVenues();};
                element.removeItem = (id)=>{CartManager.removeItem(id); this.getCityVenues();};
                cartProducts.push(element);
            }
        });
        return cartProducts;
    }

    getCartTotal = () => {
        let total = 0;
        this.state.cartContent.forEach(element => {
            total += Math.round(((element.price * element.quantity) + Number.EPSILON) * 100) / 100;
        });
        this.setState({cartTotal: Math.round(((total) + Number.EPSILON) * 100) / 100});
    }

        render() {
            let _rightside = (
                <div className={styles.halfContainer_right}>
                    <CategoryContainer categoryTitle="Cart orderContents" _componentData={this.state.cartContent} _component={ProductCard}/>
                </div>
            );
            let _leftside = (
                <div className={styles.halfContainer}>
                    <Container containerTitle="Consumer details" _component={customerInfo} _componentProps={this.state.consumerData}/>
                    <Container containerTitle="Venue details" _component={venueInfo} _componentProps={this.state.venueInfo}/>
                    <Container containerTitle="Order details" _component={CartData} _componentProps={{error: this.state.error, API_submit_order: this.API_submit_order, cartTotal: this.state.cartTotal}}/>
                </div>
            );
            let content = (
            <div>
                <div className={styles.containerAreaMain}>
                    <h1 className={styles.containerTitle}> { "Shopping cart" } </h1>
                    <div className={styles.mainContainer}>
                        {
                            (this.state.isCartEmpty) ? "" : _leftside
                        }
                        {
                            (this.state.isCartEmpty) ? "" : _rightside
                        }
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        );
        return content;
    }
}

export default UseRouterHook(Cart);