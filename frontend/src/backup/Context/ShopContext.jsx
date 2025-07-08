import React, { useState } from 'react';
import { createContext } from "react";
import { products } from "../assets/assets";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const curreny = '₹';
    const delivery_fee = 100;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    

    const value = {
        products , curreny , delivery_fee ,
        search, setSearch,showSearch, setShowSearch,
    } 

    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;