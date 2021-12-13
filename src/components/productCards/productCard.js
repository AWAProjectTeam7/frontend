import React from 'react'
import styles from './productCard.module.css'

export default function ProductCard(props) {


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
                {props.data.price} €
            </div>
        </div>
    </div>
    )
}
