import React from 'react'
import styles from './categoryContainer.module.css'

export default function CategoryContainer(props) {
    return (
    <div id={props.categoryTitle} className={styles.categoryArea}>
        <h1 className={styles.categoryTitle}>
            { props.categoryTitle }
        </h1>
        <div className={styles.contentFlexGridDisplay}>
            {
                props._componentData.map((element) => <props._component data={element}/>)
            }
        </div>
    </div>
    )
}
