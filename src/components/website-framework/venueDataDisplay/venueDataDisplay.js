import React from 'react'
import styles from './venueDataDisplay.module.css'

export default function VenueDataDisplay(props) {

    function parsePricing(pricingNum) {
        let priceStrings = ["€", "€€", "€€€", "€€€€"];
        let priceString = priceStrings[pricingNum];
        return priceString;
    }

    function isVenueOpen() {
        let currDate = new Date();
        let currDayShort = currDate.toLocaleDateString('en-EN', { weekday: 'short'});
        currDayShort = currDayShort.charAt(0).toLowerCase() + currDayShort.slice(1);
        let status = false;
        if ((props.data.businessHours[currDayShort][0] <= currDate.getHours()) && ( currDate.getHours() < props.data.businessHours[currDayShort][1]))
        {
            status = true;
        }
        return status;
    }

    function venueOpenText() {
        let status = isVenueOpen();
        if (status)
        {
            status = "Open"
        }
        else
        {
            status = "Closed"
        }
        return status;
    }

    return (
    <div className={styles.panelArea}>
        <h1 className={styles.panelTitle}>
            { props.data.name }
        </h1>
        <div className={styles.tileImageContainer}>
            <img className={styles.tileImage} src={ (props.data.image) ? props.data.image : "https://foodservicestorage.blob.core.windows.net/images/default_image_01.png" } alt="" />
        </div>
        <div className={styles.tileSubtext1}>
            {props.data.address} , {props.data.city}
        </div>
        <div className={(venueOpenText()) ? styles.tileSubtext2_ok : styles.tileSubtext2_no}>
            {(props.data.businessHours) ? venueOpenText() : ""}
        </div>
        <div className={styles.tileSubtext1}>
            Price rating: {parsePricing(props.data.pricing)}
        </div>
    </div>
    )
}
