import React from 'react'
import { useNavigate  } from 'react-router-dom'

export default function RedirectButton(props) {
    let navigate = useNavigate();

    function redirectPageToURL() {
        navigate(props.data.targetURL);
    };

    return (
        <button className={props.data.buttonStyle} onClick={redirectPageToURL}>{props.data.displayText}</button>
    )
}
