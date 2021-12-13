import React from 'react'
import styles from './venueCard.module.css'
import { useNavigate  } from 'react-router-dom'

export default function VenueCard(props) {

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

    function RedirectToVenue() {
        let _targetURL = "/venues/"+props.data.id;
        navigate(_targetURL);
    }

    return (
    <div className={styles.tileArea} onClick={RedirectToVenue}>
        <div className={styles.tileContents}>
            <div className={styles.tileImageContainer}>
                <img className={styles.tileImage} src={ props.data.image } alt="" />
            </div>
            <div className={styles.tileTitle}>
                { props.data.name }
            </div>
            <div className={styles.tileSubtext1}>
                {props.data.address} , {props.data.city}
            </div>
            <div className={(venueOpenText()) ? styles.tileSubtext2_ok : styles.tileSubtext2_no}>
                {venueOpenText()}
            </div>
            <div className={styles.tileSubtext1}>
                Price rating: {parsePricing(props.data.pricing)}
            </div>
        </div>
    </div>
    )
}
