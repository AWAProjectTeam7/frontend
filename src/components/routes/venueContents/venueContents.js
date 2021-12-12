import React from 'react'
import { useParams } from 'react-router-dom'
import styles from './venueContents.module.css'
import xrequest from '../../../managed_scripts/xrequest';
import ProductCard from '../../website-framework/productCards/productCard';
import CategoryContainer from '../../website-framework/categoryContainer/categoryContainer';
import SidePanel from '../../website-framework/sidePanel/sidePanel';
import CategoryJumpButton from '../../website-framework/categoryContainer/categoryJumpButton/categoryJumpButton';
import VenueDataDisplay from '../../website-framework/venueDataDisplay/venueDataDisplay';


function UseRouterHook(Component) {
    return function WrappedComponent(props) {
        const _params = useParams();
        return <Component {...props} URLparams={_params} />;
    }
}
class VenueProducts extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            venueProducts: [],
            venueData: {},
            categoriesList: [],
            sidebarContents: []
        };
    }
    
    componentDidMount()
    {
        xrequest.setSource(this.props.urldictionary);
        this.getCityVenues();
    }

    getCityVenues = () => {
        xrequest.GET("get_venue_and_products_by_venueID", this.props.URLparams.venueID, (response)=>{
            this.setState({ 
                venueProducts: response.data.products,
                venueData:  response.data.venue,
                categoriesList:  this.getCategories(response.data.products),
                sidebarContents: this.getSidebarContents(response.data)
            });
        });
    }

    getSidebarContents = (data)=>{
        let _sidebarContents = [];
        data.products.forEach(element => {
            let _catIndex = _sidebarContents.findIndex(_element => _element.data.displayText == element.category);
            if (_catIndex == -1)
            {
                _sidebarContents.push({
                    data: {displayText: element.category, target: element.category},
                    component: CategoryJumpButton
                });
            }
        });
        return _sidebarContents;
    }

    getCategories = (_products) => {
        let categories = [];
        _products.forEach(catElement => {
            let _catIndex = categories.findIndex(element => element.category == catElement.category);
            if (_catIndex == -1)
            {
                categories.push({
                    category: catElement.category,
                    products: []
                });
                _products.forEach(venElement => {
                    if (venElement.category == catElement.category)
                    {
                        categories[categories.length-1].products.push(venElement);
                    }
                });
            }
        });
        return categories;
    }

    render() {
        let _contents = (
        <div>
            <div id={styles.container}>
                <div id={styles.sidebar}>
                    {
                        (Object.keys(this.state.venueData).length != 0) ? <VenueDataDisplay data={this.state.venueData} /> : ""
                    }
                    <SidePanel panelTitle="Categories" components={this.state.sidebarContents}/>
                </div>
                <div id={styles.categories}>
                    {
                        this.state.categoriesList.map(element => <CategoryContainer categoryTitle={element.category} _componentData={element.products} _component={ProductCard}/>)
                    }
                </div>
            </div>
        </div>
        );
        return _contents;
    }
}

export default UseRouterHook(VenueProducts);
