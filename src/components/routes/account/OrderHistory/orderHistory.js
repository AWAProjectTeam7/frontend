import React from 'react';
import styles from './orderHistory.module.css';
import xrequest from '../../../../managed_scripts/xrequest';
import CategoryContainer from '../../../website-framework/categoryContainer/categoryContainer';
import OrderCard from '../../../website-framework/orderCards/orderCard';

class AccountOrderHistory extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            orderHistory: []
        };
    }
    
    componentDidMount()
    {
        xrequest.setSource(this.props.data.urldictionary);
        this.API_call_orderHistory();
    }

    API_call_orderHistory = () => {
        xrequest.GET("get_consumer_order_history", "", (response)=>{
            if (response.status == "success")
            {
                this.setState({
                    orderHistory: response.data.orders
                });
            }
        });
    };

    updateInput = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    render() {
        let _contents = (
        <div>
            <CategoryContainer categoryTitle={"Order History"} _component={OrderCard} _componentData={this.state.orderHistory}/>
        </div>
        );
        return _contents;
    }
}

export default AccountOrderHistory;