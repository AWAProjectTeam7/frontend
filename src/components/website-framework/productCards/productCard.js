import React from 'react'
import styles from './productCard.module.css'

export default function ProductCard(props) {

    const addItemToCart = () => {
        props.data.callback(props.data.id);
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
            <button onClick={ addItemToCart }><i class="fas fa-cart-plus"></i>Add to Cart</button>
            <div className={styles.tileSubtext1}>
                {props.data.description}
            </div>
            <div className={styles.tileSubtext2}>
                {props.data.price} €
            </div>
        </div>
    </div>
    )
}
