import React from 'react';
import styles from './accountPanels.module.css';
import xrequest from '../../../managed_scripts/xrequest';
import LoginPanel from './panels/loginPanel'
import RegisterPanel from './panels/registerPanel'
import { Link } from 'react-router-dom';

class accountPanelsSelector extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isLoginOpen: false,
            isRegisterOpen: false,
            isPromptOpen: false,
            userAccountError: ""
        };
    }
    
    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
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
            setTimeout(()=>{this.setState({ userAccountError: "" });}, 2500);
        });
    }

    API_call_loginUser = (_data) => {
        xrequest.POST("login", _data, (response)=>{
            if (response.status == "success")
            {
                this.setState({isLoginOpen: false, isRegisterOpen: false, isPromptOpen: false}, ()=>{
                    this.props._userLoginStatusCallback();
                    this.closePrompt();
                });
            }
            else
            {
                this.API_error_handler(response);
            }
        });
    };

    API_call_registerUser = (_data)=> {
        xrequest.POST("register", _data, (response)=>{
            if (response.status == "success")
            {
                this.setState({isLoginOpen: false, isRegisterOpen: false, isPromptOpen: false}, ()=>{
                    this.props._userLoginStatusCallback();
                    this.closePrompt();
                });
            }
            else
            {
                this.API_error_handler(response);
            }
        });
    };

    blurContent = () => {
        let _content = document.getElementById("content");
        console.log(_content.style.filter);
        if (_content.style.filter == "blur(15px)")
        {
            _content.style = "";
        }
        else
        {
            _content.style = "filter: blur(15px);";
        }
    }

    openLoginPrompt = () => {
        this.setState({isLoginOpen: true, isPromptOpen: true});
        this.blurContent();
    };

    openRegisterPrompt = () => {
        this.setState({isRegisterOpen: true, isPromptOpen: true});
        this.blurContent();
    };

    closePrompt = () => {
        this.setState({isLoginOpen: false, isPromptOpen: false, isRegisterOpen: false});
        this.blurContent();
    };

    render() {
        let headerBarAccountPanel;
        let loginStyle;
        if (this.props._userLoginStatus) //user is logged in
        {
            headerBarAccountPanel = (
                <div>
                    <Link to="/account"> <i class="fas fa-user"></i> Account </Link>
                </div>
            );
        }
        else //user not logged in
        {
            headerBarAccountPanel = (
                <div>
                    <button className={styles.accountButton} onClick={this.openLoginPrompt} disabled={this.state.isPromptOpen}> Login </button>
                    or 
                    <button className={styles.accountButton} onClick={this.openRegisterPrompt} disabled={this.state.isPromptOpen}> Register </button>
                </div>
            );
        }
        let _prompt;
        if (this.state.isPromptOpen)
        {
            if (this.state.isLoginOpen)
            {
                _prompt = <LoginPanel _close={this.closePrompt} _action={this.API_call_loginUser} _error={this.state.userAccountError}/>;
                loginStyle = styles.promptContainer_Active;
            }
            else if (this.state.isRegisterOpen)
            {
                _prompt = <RegisterPanel _close={this.closePrompt} _action={this.API_call_registerUser} _error={this.state.userAccountError}/>;
                loginStyle = styles.promptContainer_Active;
            }
            else
            {
                loginStyle = styles.promptContainer_Inactive;
            }
        }
        let _contents = (
            <div>
                {headerBarAccountPanel}
                <div id={loginStyle}>
                    {_prompt}
                </div>
            </div>
            );
        return _contents;
    }
}

export default accountPanelsSelector;
