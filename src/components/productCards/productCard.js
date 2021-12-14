import React from 'react'
import styles from './productCard.module.css'

export default function ProductCard(props) {

    function add_item () {
        props.data.addItem(props.data.id)
    }

    function remove_item () {
        props.data.removeItem(props.data.id)
    }

    return (
    <div className={styles.tileArea}>
        <div className={styles.tileContents}>
            <div className={styles.tileImageContainer}>
                <img className={styles.tileImage} src={ props.data.image } alt="" />
            </div>
            <h2 className={styles.tileTitle}>
                { props.data.name }
            </h2>
            <div className={styles.tileSubtext2}>
                {props.data.price} € x {props.data.quantity} = {Math.round(((props.data.price * props.data.quantity) + Number.EPSILON) * 100) / 100} €
            </div>
            <button onClick={add_item}>+</button>
            <button onClick={remove_item}>-</button>
        </div>
    </div>
    )
}
