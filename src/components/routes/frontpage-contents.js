import React from 'react'
import { useNavigate  } from 'react-router-dom'
import styles from './frontpage-contents.module.css'
import xrequest from '../../managed_scripts/xrequest';
import RedirectButton from '../website-framework/redirectButton/redirectButton';

function UseRouterHook(Component) {
    return function WrappedComponent(props) {
        const _params = useNavigate();
        return <Component {...props} _navHook={_params} />;
    }
}

class FrontPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            venueCities: [],
            searchErrorMessage: ""
        };
    }
    
    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        this.getCities();
        
    }

    getCities = () => {
        xrequest.GET("get_cities", "", (response)=>{
            if (response.status == "success")
            {
                this.setState({ venueCities: response.data.supportedCities });
            }
        });
    }

    onEnterPress = (event) => {
        if (event.key === "Enter")
        {
            let searchValue = event.target.value.toLowerCase();
            searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
            if (this.state.venueCities.includes(searchValue))
            {
                let target = "/cities/"+searchValue;
                this.props._navHook(target);
            }
            else
            {
                this.setState({ searchErrorMessage: "Entered city could not be found." }, ()=>{
                    setTimeout(()=>{this.setState({ searchErrorMessage: "" });}, 2500);
                });
            }
        }
    }

    render() {
        let _contents = (
            <div>
            <div id={styles.mainContent}>
                <div id={styles.SearchBox}>
                    <h1>It doesn't matter if you're just in for <br/> a quick snack, <br/>
                        or a family dinner: <br/> <br/>
                        We're right by <b>you.</b>
                    </h1>
                    <h2>Find venues delivering right now, near you:</h2> 
                    <div className={styles.searchBarContainer}>
                        <input className={styles.searchBar} type="text" placeholder="Search for your city and press enter" onKeyPress={this.onEnterPress}/>
                        <div className={styles.searchErrorMessage}>
                            {this.state.searchErrorMessage}
                        </div>
                    </div>
                </div>
                <div id={styles.exploreCitiesHintText}> 
                    <button onClick={()=>{document.getElementById(styles.cityList).scrollIntoView(true);}}> <h2> <i class="fas fa-angle-down"></i> Or explore cities we support <i class="fas fa-angle-down"></i> </h2> </button>
                </div>
            </div>
            <div id={styles.exploreCitiesList}>
                <div id={styles.cityList}>
                    {
                        this.state.venueCities.map((element) => <RedirectButton data={{buttonStyle: styles.cityButton, targetURL: "/cities/"+element, displayText: element}}/>)
                    }
                </div>
            </div>
        </div>
        );
        return _contents;
    }
}

export default UseRouterHook(FrontPage);
