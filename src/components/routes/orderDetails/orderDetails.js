import React from 'react';
import { useParams } from 'react-router-dom'
import styles from './orderDetails.module.css';
import xrequest from '../../../managed_scripts/xrequest';
import Container from '../../website-framework/container/container';
import VenueDataDisplay from '../../website-framework/venueDataDisplay/venueDataDisplay';

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
                <div className={styles.receiptArea}>
                    <div className={styles.receiptEntry}>
                        Submitted: {this.state.orderData.details.receivedDate}
                        <br></br>
                        {(this.state.orderData.details.estimatedDate) ? "Estimated time: " + this.state.orderData.details.estimatedDate : "" }
                        <br></br>
                        {(this.state.orderData.details.completedDate) ? "Completed: " + this.state.orderData.details.completedDate : "" }
                    </div>
                    <div className={styles.receiptEntry}>
                        Venue Name: {this.state.orderData.venue.name}
                        <br></br>
                        Venue Address: {this.state.orderData.venue.address + ", " + this.state.orderData.venue.city}
                    </div>
                    <div className={styles.receiptEntry}>
                        Contents:
                        {
                            this.state.orderData.contents.map(element => <div>{element.name + "  -  x" + element.quantity + "  -  " + element.price}</div>)
                        }
                    </div>
                    <div className={styles.receiptEntry}>
                        TOTAL: {this.state.orderData.details.total} €
                    </div>
                </div>
            </div>
        );
        let customerData = (
            <div className={styles.containerArea}>
                <h1 className={styles.containerTitle}>
                    { "Customer details" }
                </h1>
                <div>
                    {JSON.stringify(this.state.orderData.customer)}
                </div>
            </div>
        );
        let _contents = (
            <div className={styles.containerAreaMain}>
                <h1 className={styles.containerTitle}> </h1>
                <div className={styles.mainContainer}>
                    { customerData }
                    { orderDetails }
                </div>
            </div>
        );
        return _contents;
    }
}

export default UseRouterHook(OrderDetails);