import React from 'react'
import styles from './venueField.module.css'

export default function VenueFieldOrder(props) {

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                Name: {props.data.name}
            </div>
            <div className={styles.field}>
                Address: {props.data.address + ", " + props.data.city}
            </div>
        </div>
    )
}
