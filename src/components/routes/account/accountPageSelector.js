import React from 'react';
import styles from './accountPage.module.css';
import Container from '../../website-framework/container/container';
import CategoryContainer from '../../website-framework/categoryContainer/categoryContainer';
import AccountInfo from './AccountInfo/accountInfo';
import AccountOrderHistory from './OrderHistory/orderHistory';

class AccountPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
        };
    }
    
    componentDidMount()
    {
    
    }    

    render() {
        let AccountInfoContent = (
            <Container containerTitle={"Account information"} _component={AccountInfo} _componentProps={{urldictionary: this.props.urldictionary, realm: this.props.realm}} />
        );
        let OrderHistory = (
            <div>
                {
                    <AccountOrderHistory data={{urldictionary: this.props.urldictionary, realm: this.props.realm}}/>
                }
            </div>
        );
        let NoAccountMessage = (
            <div id={styles.noAccountInfoContainer}>
                No account information; please log in or register.
            </div>
        );
        let _contents;
        if (this.props.userLoginStatus)
        {
            _contents = (
                <div>
                    {AccountInfoContent}
                    {(this.props.realm == "consumer") ? OrderHistory : ""}
                </div>
            );
        }
        else
        {
            _contents = (
                <div>
                    {NoAccountMessage}
                </div>
            );
        }
        return _contents;
    }
}

export default AccountPage;
