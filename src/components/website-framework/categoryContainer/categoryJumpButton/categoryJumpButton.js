import React from 'react'
import styles from './categoryJumpButton.module.css'

export default function CategoryJumpButton(props) {

    function redirectPageToURL() {
        document.getElementById(props.data.target).scrollIntoView(true);
    };

    return (
        <button className={styles.jumpButton} onClick={redirectPageToURL}>{props.data.displayText}</button>
    )
}
