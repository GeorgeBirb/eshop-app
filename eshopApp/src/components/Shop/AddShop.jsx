import "../../App.css";
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import api from "../../api/Eshop";

function AddShop(props) {

  const [ShopCategories, setShopCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [ShopName, setShopName] = useState("");
  const [ShopCategoryId, setShopCategoryId] = useState("");
  const [Description, setDescription] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (ShopName === "" || ShopCategoryId === "" || Description === "") {
      alert("ALL the fields are mandatory!");
      return;
    }
    const shopToAdd = {
      ShopName: ShopName, ShopCategoryId: ShopCategoryId, Description: Description,
      ShopCategory: { ShopCategoryId: ShopCategoryId, CategoryName: "", Description: "" }
    };
    props.addShopHandler(shopToAdd);
    setShopName("");
    setShopCategoryId("");
    setDescription("");
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setShopCategoryId(selectedOption.value);
  };

  const retrieveShopCategories = async () => {
    const response = await api.get("/shopCategory");
    return response.data;
  }

  useEffect(() => {
    const getAllShopCategories = async () => {
      const allShopCategories = await retrieveShopCategories();
      if (allShopCategories) setShopCategories(
        allShopCategories.map((shopCat) => {
          return {
            label: shopCat.CategoryName,
            value: shopCat.ShopCategoryId
          }
        })
      );
    };
    getAllShopCategories();
  }, []);

  return (
    <div className="ui main">
      <h2>Add Shop</h2>
      <br></br>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>ShopCategoryID</label>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={ShopCategories}
          />
        </div>
        <div className="field">
          <label>
            Shop Name:
            <input
              type="text"
              name="shopName"
              placeholder="ShopName"
              value={ShopName}
              onChange={e => setShopName(e.target.value)}
            />
          </label>
        </div>
        <div className="field">
          <label>
            Description:
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={Description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
        </div>
        <button className="buttonInsert">Add</button>
      </form>
    </div>
  );

}

export default AddShop;
