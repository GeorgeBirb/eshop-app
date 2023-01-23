import React, { useState, useEffect } from 'react';
import api from "../../api/Eshop";
import "../../App.css";
import AddShopModal from "./AddShopModal";
import { confirm } from "react-confirm-box";
import toast from "react-hot-toast";
import Select from 'react-select';

function ShopDataDisplay() {
    const [ShopCategories, setShopCategories] = useState([]);
    const [selectedShopCategory, setSelectedShopCategory] = useState("");
    const [shops, setShops] = useState([]);
    const [added, setAdded] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [open, setOpen] = useState(false);
    const options = {
        labels: {
            confirmable: "Confirm",
            cancellable: "Cancel"
        }
    }

    function handleOpen() {
        setOpen(!open);
    }

    const handleChange = (selectedShopCategory) => {
        setSelectedShopCategory(selectedShopCategory);
    };

    const retrieveShops = async () => {
        const response = await api.get("/shop");
        return response.data;
    }

    const retrieveShopCategories = async () => {
        const response = await api.get("/shopCategory");
        return response.data;
    }

    async function addShopHandler(shop) {
        try {
            handleOpen();
            const result = await confirm("Are you sure?", options);
            if (result) {
                const request = {...shop}
                const response = await api.post("/shop", request)
                setAdded(true);
                toast.success("Successfully Added!")
            }
            handleOpen();
        } catch (e) {
            toast.error("Failed to Add!")
        }
    };

    const removeShopHandler = async (id) => {
        try {
            const result = await confirm("Are you sure?", options);
            if (result) {
                await api.delete(`/shop/${id}`);
                const newShopList = shops.filter((shop) => {
                    return shop.ShopID !== id;
                });
                setShops(newShopList);
                setDeleted(true);
                toast.success("Successfully Deleted!")
            }
        } catch (e) {
            toast.error("Failed to Delete!")
        }
    };

    const updateShopHandler = async (shop) => {
        try {
            const result = await confirm("Are you sure?", options);
            if (result) {
                if (selectedShopCategory === "") {
                    const shopToUpdate = {
                        ShopId: shop.ShopId,
                        ShopName: shop.ShopName,
                        ShopCategoryId: shop.ShopCategoryId,
                        Description: shop.Description,
                        ShopCategory: { ShopCategoryId: shop.ShopCategoryId, CategoryName: "", Description: "" },
                    };
                    const response = await api.put("/shop", shopToUpdate);
                    const { shopCategoryId } = response.data;
                    setShops(
                        shops.map((shop) => {
                            return shop.ShopCategoryId === shopCategoryId ? { ...response.data } : shop;
                        })
                    );
                } else {
                    const shopToUpdate = {
                        ShopId: shop.ShopId,
                        ShopName: shop.ShopName,
                        ShopCategoryId: selectedShopCategory.value.ShopCategoryId,
                        Description: shop.Description,
                        ShopCategory: { ShopCategoryId: selectedShopCategory.value.ShopCategoryId, CategoryName: selectedShopCategory.value.CategoryName, Description: selectedShopCategory.value.Description },
                    };
                    const response = await api.put("/shop", shopToUpdate);
                    const { shopCategoryId } = response.data;
                    setShops(
                        shops.map((shop) => {
                            return shop.ShopCategoryId === shopCategoryId ? { ...response.data } : shop;
                        })
                    );
                }
                toast.success("Successfully Updated!")
            }
            setUpdated(true);
        } catch (e) {
            toast.error("Failed to Update!")
        }
    };

    const onShopNameUpdate = (shop, event) => {
        const { value } = event.target;
        const data = [...rows];
        shop.ShopName = value;
        initRow(data);
    };

    const onDescriptionUpdate = (shop, event) => {
        const { value } = event.target;
        const data = [...rows];
        shop.Description = value;
        initRow(data);
    };

    const [rows, initRow] = useState([]);

    useEffect(() => {
        const getAllShops = async () => {
            const allShops = await retrieveShops();
            if (allShops) setShops(allShops);
        };

        const getAllShopCategories = async () => {
            const allShopCategories = await retrieveShopCategories();
            if (allShopCategories) setShopCategories(
                allShopCategories.map((shopCat) => {
                    return {
                        label: shopCat.CategoryName,
                        value: shopCat
                    }
                })
            );
        };

        getAllShops();
        getAllShopCategories();
        setDeleted(false);
        setUpdated(false);
        setAdded(false);


    }, [added, deleted, updated]);

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
                            type="text"
                            disabled={true}
                            value={shop.ShopCategory.CategoryName}
                            name="shopCategoryID"
                            className="form-control"
                        />
                        <Select
                            value={selectedShopCategory}
                            onChange={handleChange}
                            options={ShopCategories}
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
            <AddShopModal addShopHandler={addShopHandler} open={open} handleOpen={handleOpen} />
            <table>
                <thead>
                    <tr>
                        <th>Κωδικός</th>
                        <th>Όνομα</th>
                        <th>Κατηγορία</th>
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