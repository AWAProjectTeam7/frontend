import React from 'react'
import { useParams } from "react-router-dom";

export default function Login(props) {
    let params = useParams();
    return (
        <div>
            <h1>home {params.city}</h1>
        </div>
    );
}
