import styles from './framework-main.module.css';
import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCart from '../../routes/shoppingCart/ShoppingCart'
//Import account module
import Accounts from '../accountPanels/accountPanelsSelector';
//

export default function FrameworkMain_PersistentLayout(props) {
    return (
    <div id={styles.HeaderContainer}>
        <div id={styles.HeaderBar}>
            <div className={styles.Group}>
                <div id={styles.Title}>
                    <Link to="/"><div><p> <h1> <b>Cuisine Street</b> </h1> </p></div></Link>
                </div>
            </div>
            <div className={styles.Group}>
                <div id={styles.Account}>
                    <Accounts urldictionary={props.urldictionary} _userLoginStatus={props._userLoginStatus} _userLoginStatusCallback={props._userLoginStatusCallback}/>
                </div>
                {
                    //cart
                }
                <div id={styles.Account}>
                    <Link to="/cart" element={ <ShoppingCart /> }><i class="fas fa-shopping-cart"></i> Cart</Link>
                </div>
            </div>
        </div>
    </div>
    )
}
