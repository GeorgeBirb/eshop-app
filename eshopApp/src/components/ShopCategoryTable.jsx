import React, { useState, useEffect } from 'react';
import api from "../api/Eshop";
import AddShopCategory from "./AddShopCategory";
import "../App.css";

function ShopDataDisplay(props) {
    const [shopCategories, setShopCategories] = useState([]);
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);


    const retrieveShopCategories = async () => {
        const response = await api.get("/shopCategory");
        return response.data;
    }

    const addShopCategoryHandler = async (shopCategory) => {
        console.log(shopCategory);
        const request = {
            ...shopCategory
        }

        const response = await api.post("/shopCategory", request)
        setShopCategories([...shopCategories, response]);
        setAdded(true);
    };

    const removeShopCategoryHandler = async (id) => {
        await api.delete(`/shopCategory/${id}`);
        const newShopCategoryList = shopCategories.filter((shopCategory) => {
            return shopCategory.ShopCategoryID !== id;
        });
        setShopCategories(newShopCategoryList);
        setDeleted(true);
    };

    const updateShopCategoryHandler = async (shopCategory) => {
        const response = await api.put("/shopCategory", shopCategory);
        const { categoryName } = response.data;
        setShopCategories(
            shopCategories.map((shopCategory) => {
                return shopCategory.CategoryName === categoryName ? { ...response.data } : shopCategory;
            })
        );
        setUpdated(true);
    };

    const onShopCategoryNameUpdate = (shopCategory, event) => {
        const { value } = event.target;
        const data = [...rows];
        shopCategory.CategoryName = value;
        initRow(data);
        console.log(shopCategory)
    };

    const onDescriptionUpdate = (shopCategory, event) => {
        const { value } = event.target;
        const data = [...rows];
        shopCategory.Description = value;
        initRow(data);
        console.log(shopCategory)
    };

    const [rows, initRow] = useState([]);

    useEffect(() => {
        const getAllShopCategories = async () => {
            const allShopCategories = await retrieveShopCategories();
            if (allShopCategories) setShopCategories(allShopCategories);
        };

        getAllShopCategories();
        setAdded(false);
        setDeleted(false);
        setUpdated(false);

    }, [added,deleted,updated]);

    const DisplayData = shopCategories.map(
        (shopCategory) => {
            return (
                <tr key={shopCategory.ShopCategoryId}>
                    <td>
                        {shopCategory.ShopCategoryId}
                    </td>
                    <td>
                        <input
                            type="text"
                            value={shopCategory.CategoryName}
                            onChange={(event) => onShopCategoryNameUpdate(shopCategory, event)}
                            name="categoryName"
                            className="form-control"
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={shopCategory.Description}
                            onChange={(event) => onDescriptionUpdate(shopCategory, event)}
                            name="description"
                            className="form-control"
                        />
                    </td>
                    <td>
                        <button
                            className="buttonUpdate"
                            onClick={(event) => updateShopCategoryHandler(shopCategory)}
                        >
                            Update
                        </button>
                        <button
                            className="buttonDelete"
                            onClick={() => removeShopCategoryHandler(shopCategory.ShopCategoryId)}
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
                        <th>Περιγραφή</th>
                        <th>Ενέργειες</th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayData}
                </tbody>
            </table>
            <br></br>
            <AddShopCategory {...props} addShopCategoryHandler={addShopCategoryHandler} />
        </div>
    )
}

export default ShopDataDisplay;