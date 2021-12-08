import React from 'react'
import { Outlet } from 'react-router-dom';

export default function ShoppingCart() {
    return (
        <div>
            <h1>Shopping cart</h1>
            <Outlet />
        </div>
    );
}