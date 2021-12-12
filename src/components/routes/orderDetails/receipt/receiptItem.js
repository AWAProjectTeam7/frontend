import React from 'react'
import styles from './receiptItem.module.css'

export default function ReceiptItem(props) {
    return (
        <div className={styles.itemContainer}>
            <div className={styles.itemContainer_mainrow}>
                <div>
                    {props.data.name}
                </div>
                <div className={styles.itemContainer_quanPrice}>
                    <div className={styles.itemContainer_quan}>
                        x{props.data.quantity}
                    </div>
                    <div>
                        {Math.round(((props.data.price * props.data.quantity) + Number.EPSILON) * 100) / 100} €
                    </div>
                </div>
            </div>
            <div className={styles.itemContainer_unitPrice}>
                Unit price: {props.data.price} €
            </div>
        </div>
    )
}
