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
        const response = await api.get("/shop");
        return response.data;
    }

    const addShopHandler = async (shop) => {

        console.log(shop);
        const request = {
            ...shop
        }

        const response = await api.post("/shop", request)
        setShops([...shops, response]);
        setAdded(true);
    };

    const removeShopHandler = async (id) => {
        await api.delete(`/shop/${id}`);
        const newShopList = shops.filter((shop) => {
            return shop.ShopID !== id;
        });
        setShops(newShopList);
        setDeleted(true);
    };

    const updateShopHandler = async (shop) => {
        const shopToUpdate = {
            ShopId: shop.ShopId,
            ShopName: shop.ShopName,
            ShopCategoryId: shop.ShopCategoryId,
            Description: shop.Description,
            ShopCategory: {ShopCategoryId: shop.ShopCategoryId, CategoryName:"",Description:""},
          };
        const response = await api.put("/shop", shopToUpdate);
        const { shopCategoryId } = response.data;
        setShops(
            shops.map((shop) => {
                return shop.ShopCategoryId === shopCategoryId ? { ...response.data } : shop;
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
        shop.ShopCategoryId = value;
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
                <tr key={shop.ShopId}>
                    <td>
                        {shop.ShopId}
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
                            value={shop.ShopCategoryId}
                            onChange={(event) => onCategoryIDUpdate(shop, event)}
                            name="shopCategoryID"
                            className="form-control"
                        />
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
                            className="buttonUpdate"
                            onClick={(event) => updateShopHandler(shop)}
                        >
                            Update
                        </button>
                        <span> </span>
                        <button
                            className="buttonDelete"
                            onClick={() => removeShopHandler(shop.ShopId)}
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
                        <th>Περιγραφή</th>
                        <th>Ενέργειες</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
            <br></br>
            <AddShop {...props} addShopHandler={addShopHandler} />
        </div>
    )
}

export default ShopDataDisplay;