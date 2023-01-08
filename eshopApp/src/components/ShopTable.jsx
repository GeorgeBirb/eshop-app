import React, { useState, useEffect } from 'react';
import api from "../api/Eshop";
import AddShop from "./AddShop";
import "../App.css";

function ShopDataDisplay(props) {
    const [shops, setShops] = useState([]);
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);


    const retrieveShops = async () => {
        const response = await api.get("/shops");
        return response.data;
    }

    const addShopHandler = async (shop) => {
        console.log(shop);
        const request = {
            ...shop
        }

        const response = await api.post("/shops", request)
        setShops([...shops, response]);
        setAdded(true);
    };

    const removeShopHandler = async (id) => {
        await api.delete(`/shops/${id}`);
        const newShopList = shops.filter((shop) => {
            return shop.ShopID !== id;
        });
        setShops(newShopList);
        setDeleted(true);
    };

    const updateShopHandler = async (shop) => {
        const response = await api.put("/shops", shop);
        const { shopCategoryID } = response.data;
        setShops(
            shops.map((shop) => {
                return shop.ShopCategoryID === shopCategoryID ? { ...response.data } : shop;
            })
        );
        setUpdated(true);
    };

    const onShopNameUpdate = (shop, event) => {
        const { value } = event.target;
        const data = [...rows];
        shop.ShopName = value;
        initRow(data);
        console.log(shop)
    };

    const onCategoryIDUpdate = (shop, event) => {
        const { value } = event.target;
        const data = [...rows];
        shop.ShopCategoryID = value;
        initRow(data);
        console.log(shop);
    };

    const onDescriptionUpdate = (shop, event) => {
        const { value } = event.target;
        const data = [...rows];
        shop.Description = value;
        initRow(data);
        console.log(shop)
    };

    const [rows, initRow] = useState([]);

    useEffect(() => {
        const getAllShops = async () => {
            const allShops = await retrieveShops();
            if (allShops) setShops(allShops);
        };

        getAllShops();
        setAdded(false);
        setDeleted(false);
        setUpdated(false);

    }, [added,deleted,updated]);

    const DisplayData = shops.map(
        (shop) => {
            return (
                <tr key={shop.ShopID}>
                    <td>
                        {shop.ShopID}
                    </td>
                    <td>
                        <input
                            type="text"
                            value={shop.ShopName}
                            onChange={(event) => onShopNameUpdate(shop, event)}
                            name="shopName"
                            className="form-control"
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={shop.ShopCategoryID}
                            onChange={(event) => onCategoryIDUpdate(shop, event)}
                            name="shopCategoryID"
                            className="form-control"
                        />
                    </td>
                    <td>
                        {shop.CategoryName}
                    </td>
                    <td>
                        <input
                            type="text"
                            value={shop.Description}
                            onChange={(event) => onDescriptionUpdate(shop, event)}
                            name="description"
                            className="form-control"
                        />
                    </td>
                    <td>
                        <button
                            className="editbtn"
                            onClick={(event) => updateShopHandler(shop)}
                        >
                            Update
                        </button>
                        <button
                            className="editbtn"
                            onClick={() => removeShopHandler(shop.ShopID)}
                        >
                            Delete
                        </button>
                    </td>
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
            <AddShop {...props} addShopHandler={addShopHandler} />
        </div>
    )
}

export default ShopDataDisplay;