import React, { useState, useEffect } from 'react';

function ShopCategoryDataDisplay() {
    const [shopCategory, setShopCategory] = useState([]);
    const API_URL = 'http://localhost:5085/api/shopCategory';

    const getShopCategory = async () => {
        const response = await fetch(`${API_URL}`);
        setShopCategory(await response.json());
    }

    useEffect(() => {
        getShopCategory();
    }, []);

    const DisplayData = shopCategory.map(
        (shopCategory) => {
            return (
                <tr key={shopCategory.ShopCategoryID}>
                    <td>{shopCategory.ShopCategoryID}</td>
                    <td>{shopCategory.CategoryName}</td>
                    <td>{shopCategory.Description}</td>
                    <td>toDo</td>
                </tr>
            )
        }
    )
    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Κωδικός</th>
                        <th>Όνομα</th>
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



export default ShopCategoryDataDisplay;