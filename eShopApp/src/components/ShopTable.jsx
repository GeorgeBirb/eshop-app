import React, { useState,useEffect } from 'react';

function ShopDataDisplay() {
    const [shops, setShops] = useState([]);
    const API_URL = 'http://localhost:5085/api/shops';
    
    const getShops = async () => {
        const response = await fetch(`${API_URL}`);
        setShops(await response.json());
    }

    useEffect(() =>{
        getShops();
     },[]);
     
    const DisplayData = shops.map(
        (shop) => {
            return (
                <tr key={shop.ShopID}>
                    <td>{shop.ShopID}</td>
                    <td>{shop.ShopName}</td>
                    <td>{shop.ShopCategoryID}</td>
                    <td>{shop.CategoryName}</td>
                    <td>{shop.Description}</td>
                    <td>toDo</td>
                </tr>
            )
        }
    )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Κωδικός</th>
                        <th>Όνομα</th>
                        <th>Κωδικός Κατηγορίας</th>
                        <th>Όνομα Κατηγορίας</th>
                        <th>Περιγραφή</th>
                        <th>Ενέργειες</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
        </div>
    )
}



export default ShopDataDisplay;