import React from 'react'
import styles from './customerInfo.module.css'

export default function CustomerFieldOrder(props) {

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                Name: {props.data.name}
            </div>
            <div className={styles.field}>
                Delivery address: {props.data.address + ", " + props.data.city}
            </div>
            <div className={styles.field}>
                Contact number: {props.data.contact}
            </div>
        </div>
    )
}
