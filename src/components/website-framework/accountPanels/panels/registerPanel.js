import React from 'react';
import styles from './panel.module.css';

export default function RegisterPanel(props) {

    let loginData = {
        username: "",
        password: "",
        customerName: "",
        address: "",
        address_city: "",
        phone: "",
        corporate: false
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
                <h3>Register with new account</h3>
            </div>
            <input className={styles.fields} name="username" type="text" placeholder="Username" onChange={updateInput}/>
            <input className={styles.fields} name="password" type="password" placeholder="Password" onChange={updateInput}/>
            <input className={styles.fields} name="customerName" type="text" placeholder="Full name" onChange={updateInput}/>
            <input className={styles.fields} name="address_city" type="text" placeholder="City" onChange={updateInput}/>
            <input className={styles.fields} name="address" type="text" placeholder="Address" onChange={updateInput}/>
            <input className={styles.fields} name="phone" type="text" placeholder="Phone number" onChange={updateInput}/>
            <div className={styles.inputContainer2}>
                <label for="corporate">Corporate </label>
                <input className={styles.fields} id="corporate" name="corporate" type="checkbox" onChange={updateInput}/>
            </div>
            <div className={styles.inputContainer2}>
                <button className={styles.panelButton} onClick={panelAction}>Register</button>
                <button className={styles.panelButton} onClick={props._close}>Cancel</button>
            </div>
        </div>
    </div>
    )
}
