import React from 'react'
import styles from './sidePanel.module.css'

export default function SidePanel(props) {
    return (
    <div className={styles.panelArea}>
        <h1 className={styles.panelTitle}>
            { props.panelTitle }
        </h1>
        <div className={styles.contentFlexGridDisplay}>
            {
                props.components.map((element) => <element.component data={element.data}/>)
            }
        </div>
    </div>
    )
}
