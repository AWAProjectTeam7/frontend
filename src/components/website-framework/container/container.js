import React from 'react'
import styles from './container.module.css'

export default function Container(props) {
    return (
    <div id={props.containerTitle} className={styles.containerArea}>
        <h1 className={styles.containerTitle}>
            { props.containerTitle }
        </h1>
        <div id={styles.content}>
            {
                <props._component data={props._componentProps}/>
            }
        </div>
    </div>
    )
}
