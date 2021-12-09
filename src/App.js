import React from 'react';
import './App.css';
import Error from './components/Error';
import FrameworkMain from './components/website-framework/mainTheme-PersistentLayout/framework-main';
import FrontPageContents from './components/routes/frontpage-contents';
import CityVenues from './components/routes/cityVenues/cityVenues';
import VenueProducts from './components/routes/venueContents/venueContents';
import Login from './components/Login';
import Register from './components/Register';
import ShoppingCart from './components/ShoppingCart';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
//
import xrequest from './managed_scripts/xrequest';
//


class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            userLoggedIn: false,
            xrequestUrlDictionary: undefined,
            callEnable: false
        };
    }

    componentDidMount()
    {
        xrequest.downloadSource("https://raw.githubusercontent.com/AWAProjectTeam7/backend/main/routes.json", (dictionary)=>{
            this.setState({ 
                xrequestUrlDictionary: dictionary,
                callEnable: true
            }, ()=>{
                xrequest.setSource(this.state.xrequestUrlDictionary);
                this.checkForValidLogin();
            });
        });
    }

    checkForValidLogin = () => {
        xrequest.GET("continue_session", "", (response)=>{
            if (response.status == "success")
            {
                this.setState({userLoggedIn: true});
            }
        });
    }

    changeUserLoginStatus = () => {
        this.setState({userLoggedIn: true});
    }

    render()
    {
        let page = <BrowserRouter>
          <div>
                {/* Load in fontawesome */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/fontawesome.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/regular.min.css" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/solid.min.css" />
                {/* Header ribbon */}
            <FrameworkMain urldictionary={this.state.xrequestUrlDictionary} _userLoginStatus={this.state.userLoggedIn} _userLoginStatusCallback={this.changeUserLoginStatus}/>
                {/* Page contents */}
            <div id="content">
                <Routes>
                    <Route path="/" element={ <FrontPageContents urldictionary={this.state.xrequestUrlDictionary} /> } /> 
                    <Route path="/cities/:city" element = { <CityVenues urldictionary={this.state.xrequestUrlDictionary} /> } />
                    <Route path="/venues/:venueID" element = { <VenueProducts urldictionary={this.state.xrequestUrlDictionary} /> } />

                    <Route path="/account" element = { <Login /> } />
                    <Route path="/login" element = { <Login /> } />
                    <Route path="/register" element = { <Register /> } />
                    <Route path="/cart" element = { <ShoppingCart /> } />
                    <Route path="/*" element = { <Error />} />
                    {/*
                    <Route path="/*" element = { <Error />} />
                    <Route path="/" element={ <FrontPageContents /> } >
                        <Route path=":restaurantId" element={ <RestaurantDetailView restaurants={ restaurants} /> } />
                    </Route>
                    */}
                </Routes>
            </div>
          </div>
        </BrowserRouter>

        if (this.state.callEnable)
        {
            return (page)
        }
        else
        {
            return (null)
        }
    }
}

export default App;