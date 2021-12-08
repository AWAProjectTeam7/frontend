import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import styles from './cityVenues.module.css'
import xrequest from '../../../managed_scripts/xrequest';
import VenueCard from '../../website-framework/venueCards/venueCard';
import CategoryContainer from '../../website-framework/categoryContainer/categoryContainer';
import SidePanel from '../../website-framework/sidePanel/sidePanel';
import CategoryJumpButton from '../../website-framework/categoryContainer/categoryJumpButton/categoryJumpButton';

function UseRouterHook(Component) {
    return function WrappedComponent(props) {
        const _params = useParams();
        return <Component {...props} URLparams={_params} />;
    }
}
class cityVenues extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            cityVenues: [],
            categoriesList: []
        };
    }
    
    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        this.getCityVenues();
    }

    getCityVenues = () => {
        xrequest.GET("get_venues_by_city", this.props.URLparams.city, (response)=>{
            this.setState({ cityVenues: response.data.venues, categoriesList:  this.getCategories(response.data.venues)});
        });
    }

    sideCategories = [];

    getCategories = (_venues) => {
        let categories = [];
        this.sideCategories = [];
        _venues.forEach(catElement => {
            let _catIndex = categories.findIndex(element => element.category == catElement.category);
            if (_catIndex == -1)
            {
                categories.push({
                    category: catElement.category,
                    venues: []
                });
                this.sideCategories.push({
                    data: {displayText: catElement.category, target: catElement.category},
                    component: CategoryJumpButton
                });
                _venues.forEach(venElement => {
                    if (venElement.category == catElement.category)
                    {
                        categories[categories.length-1].venues.push(venElement);
                    }
                });
            }
        });
        return categories;
    }

    render() {
        let _contents = (
        <div>
            <h1>
                Venues in {this.props.URLparams.city}
            </h1>
            <div id={styles.container}>
                <SidePanel panelTitle="Categories" components={this.sideCategories}/>
                <div id={styles.categories}>
                    {
                        this.state.categoriesList.map(element => <CategoryContainer categoryTitle={element.category} _componentData={element.venues} _component={VenueCard}/>)
                    }
                </div>
            </div>
        </div>
        );
        return _contents;
    }
}

export default UseRouterHook(cityVenues);
