import React from 'react'
import styles from './venueDataDisplay.module.css'
import { useNavigate  } from 'react-router-dom'

export default function VenueDataDisplay(props) {

    let navigate = useNavigate();

    function parsePricing(pricingNum) {
        let priceStrings = ["€", "€€", "€€€", "€€€€"];
        let priceString = priceStrings[pricingNum];
        return priceString;
    }

    function isVenueOpen() {
        let currDate = new Date();
        let currDayShort = currDate.toLocaleDateString('en-EN', { weekday: 'short'});
        currDayShort = currDayShort.charAt(0).toLowerCase() + currDayShort.slice(1);
        let status = "closed";
        if ((props.data.businessHours[currDayShort][0] <= currDate.getHours()) && ( currDate.getHours() < props.data.businessHours[currDayShort][1]))
        {
            status = "Open";
            props.data.openStyling = true;
        }
        else
        {
            status = "Closed";
            props.data.openStyling = false;
        }
        return status;
    }

    return (
    <div className={styles.tileArea}>
        <div className={styles.tileContents}>
            <div className={styles.tileImageContainer}>
                <img className={styles.tileImage} src={ (props.data.image) ? props.data.image : "https://foodservicestorage.blob.core.windows.net/images/default_image_01.png" } alt="" />
            </div>
            <div className={styles.tileTitle}>
                { props.data.name }
            </div>
            <div className={styles.tileSubtext1}>
                {props.data.address} , {props.data.city}
            </div>
            <div className={props.data.openStyling ? styles.tileSubtext2_ok : styles.tileSubtext2_no}>
                {isVenueOpen()}
            </div>
            <div className={styles.tileSubtext1}>
                Price rating: {parsePricing(props.data.pricing)}
            </div>
        </div>
    </div>
    )
}
