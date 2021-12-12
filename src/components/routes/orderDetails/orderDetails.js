import React from 'react';
import { useParams } from 'react-router-dom'
import styles from './orderDetails.module.css';
import xrequest from '../../../managed_scripts/xrequest';
import Container from '../../website-framework/container/container';
import VenueFieldOrder from './venueInfo/venueField';
import CustomerFieldOrder from './customerInfo/customerInfo';
import OrderReceipt from './receipt/orderReceipt';


function UseRouterHook(Component) {
    return function WrappedComponent(props) {
        const _params = useParams();
        return <Component {...props} URLparams={_params} />;
    }
}

class OrderDetails extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            orderData: null,
            callEnable: false
        };
    }
    
    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        this.API_call_orderData();
    }

    API_call_orderData = () => {
        xrequest.GET("get_consumer_order_by_ID", this.props.URLparams.orderID, (response)=>{
            if (response.status == "success")
            {
                this.setState({
                    orderData: response.data, callEnable: true
                }, ()=>{
                    //setInterval(this.API_call_updateStatus, 30000);
                });
            }
        });
    };

    API_call_updateStatus = () => {
        //call this periodically
        //change the request url
        //update state with the new info
        xrequest.GET("get_consumer_order_by_ID", this.props.URLparams.orderID, (response)=>{
            if (response.status == "success")
            {
                this.setState({
                    orderData: response.data, callEnable: true
                });
            }
        });
    };

    render() {
        if (!this.state.orderData)
        {
            return <div />
        }
        let orderDetails = (
            <div className={styles.containerArea}>
                <h1 className={styles.containerTitle}>
                    { "Order details" }
                </h1>
                
            </div>
        );
        let _contents = (
            <div className={styles.containerAreaMain}>
                <h1 className={styles.containerTitle}> </h1>
                <div className={styles.mainContainer}>
                    <div className={styles.halfContainer}>
                        <Container containerTitle="Customer details" _component={CustomerFieldOrder} _componentProps={this.state.orderData.customer}/>
                        <Container containerTitle="Venue details" _component={VenueFieldOrder} _componentProps={this.state.orderData.venue}/>
                    </div>
                    <div className={styles.halfContainer_right}>
                        <Container containerTitle="Order receipt" _component={OrderReceipt} _componentProps={{details: this.state.orderData.details, venue: this.state.orderData.venue, contents: this.state.orderData.contents, ID: this.props.URLparams.orderID}}/>
                    </div>
                </div>
            </div>
        );
        return _contents;
    }
}

export default UseRouterHook(OrderDetails);