import React from 'react';
import styles from './accountInfo.module.css';
import xrequest from '../../../../managed_scripts/xrequest';

class AccountInfo extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email: "",
            password: "",
            name: "",
            address: "",
            city: "",
            phone: "",
            userAccountError: " "
        };
    }
    
    componentDidMount()
    {
        xrequest.setSource(this.props.data.urldictionary);
        this.API_call_accountInfo();
    }

    API_error_handler = (error)=>{
        let _errorMessage = "";
        if (error.errorContents)
        {
            _errorMessage = error.errorContents;
        }
        else    
        {
            if (error.errorMessage == "Unauthorized")
            {
                _errorMessage = "Incorrect username or password.";
            }
            else
            {
                _errorMessage = error.errorMessage;
            }
        }
        this.setState({ userAccountError: _errorMessage }, ()=>{
            setTimeout(()=>{this.setState({ userAccountError: " " });}, 10000);
        });
    }

    API_call_accountInfo = () => {
        xrequest.GET("get_" + this.props.data.realm + "_account_data", "", (response)=>{
            if (response.status == "success")
            {
                this.setState({
                    email: response.data.user.email,
                    name: response.data.user.name,
                    address: response.data.user.address,
                    city: response.data.user.city,
                    phone: response.data.user.phone
                });
            }
            else
            {
                this.API_error_handler(response);
            }
        });
    };

    API_call_updateAccountInfo = ()=> {
        let data = {
            username: this.state.email,
            password: this.state.password,
            name: this.state.name,
            address: this.state.address,
            city: this.state.city,
            phone: this.state.phone,
        }
        xrequest.POST("post_" + this.props.data.realm + "_account_data_change", data, (response)=>{
            this.setState({password: ""});
            if (response.status == "success")
            {
                this.API_call_accountInfo();
            }
            else
            {
                this.API_error_handler(response);
            }
        });
    };

    updateInput = (event) => {
        this.setState({ [event.target.name] : event.target.value });
    }

    render() {
        let _contents = (
        <div className={styles.dataContainer}>
            <div>
                Account type: {this.props.data.realm}
            </div>
            <input className={styles.fields} disabled={true} name="email" type="text" value={this.state.email} placeholder="User email"/>
            <input className={styles.fields} name="name" type="text" value={this.state.name} placeholder="Customer name" onChange={this.updateInput}/>
            <input className={styles.fields} name="address" type="text" value={this.state.address} placeholder="Address" onChange={this.updateInput}/>
            <input className={styles.fields} name="city" type="text" value={this.state.city} placeholder="City" onChange={this.updateInput}/>
            <input className={styles.fields} name="phone" type="text" value={this.state.phone} placeholder="Phone Number" onChange={this.updateInput}/>
            <input className={styles.fields} name="password" type="password" placeholder="Password" onChange={this.updateInput}/>
            <div className={styles.error}>
                {this.state.userAccountError}
            </div>
            <button className={styles.panelButton} onClick={this.API_call_updateAccountInfo}>Update account information</button>
        </div>
        );
        return _contents;
    }
}

export default AccountInfo;