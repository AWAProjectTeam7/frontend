import React from 'react'
import styles from './cartData.module.css'

export default function CartData(props) {

    return (
        <div className={styles.container}>
            <div className={styles.field}>
                <h2>Total: {props.data.cartTotal}</h2>
            </div>
            <div className={styles.field}>
                <div>
                    {
                        props.data.error
                    }
                </div>
            </div>
            <div className={styles.field}>
                <button onClick={props.data.API_submit_order} disabled={(props.data.error == "" ? false : true)}>Submit order</button>
            </div>
        </div>
    )
}
