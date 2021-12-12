import React from 'react'
import styles from './orderCard.module.css'
import { useNavigate  } from 'react-router-dom'

export default function OrderCard(props) {

    let navigate = useNavigate();

    function convertDate (_unixDate) {
        let _parsedDate = new Date(_unixDate);
        return _parsedDate.toLocaleString();
    }

    function redirect () {
        navigate("/order/"+props.data.orderID)
    }

    return (
    <div className={styles.tileArea} onClick={redirect}>
        <div className={styles.tileContents}>
            <div className={styles.tileImageContainer}>
                <img className={styles.tileImage} src={ props.data.venue.image } alt="" />
            </div>
            <h2 className={styles.tileTitle}>
                { props.data.venue.name }
            </h2>
            <div className={(props.data.details.completedDate) ? styles.tileSubtext2_ok : styles.tileSubtext2_ip}>
                {(props.data.details.completedDate) ? "Delivered: " + convertDate(props.data.details.completedDate) : "In progress: " + convertDate(props.data.details.receivedDate)}
            </div>
            <div className={styles.tileSubtext2}>
                Order total: {props.data.details.total} €
            </div>
        </div>
    </div>
    )
}
