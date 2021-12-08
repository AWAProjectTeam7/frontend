import React from 'react';
import styles from './panel.module.css';

export default function LoginPanel(props) {

    let loginData = {
        username: "",
        password: ""
    }

    function updateInput (event) {
        loginData[event.target.name] = event.target.value;
    }

    function panelAction () {
        props._action(loginData);
    };

    return (
    <div className={styles.panelArea}>
        <div className={styles.inputContainer}>
            <div className={styles.inputContainer2}>
                <h3>Login</h3>
            </div>
            <input className={styles.fields} name="username" type="text" placeholder="Username" onChange={updateInput}/>
            <input className={styles.fields} name="password" type="password" placeholder="Password" onChange={updateInput}/>
            <div className={styles.inputContainer2}>
                <button className={styles.panelButton} onClick={panelAction}>Login</button>
                <button className={styles.panelButton} onClick={props._close}>Cancel</button>
            </div>
        </div>
    </div>
    )
}
