import "../../App.css";
import React, { useState, useEffect } from 'react';

function AddShopCategory(props) {
  const [CategoryName, setCategoryName] = useState("");
  const [Description, setDescription] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (CategoryName === "" || Description === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    
    const shopCategoryToAdd = {
      CategoryName: CategoryName, Description: Description
    };

    props.addShopCategoryHandler(shopCategoryToAdd);
    setCategoryName("");
    setDescription("");
  };
  
    return (
      <div className="ui main">
        <h2>Add Shop Category</h2>
        <form className="ui form" onSubmit={add}>
          <div className="field">
            <label>CategoryName</label>
            <input
              type="text"
              name="categoryName"
              placeholder="CategoryName"
              value={CategoryName}
              onChange={e => setCategoryName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={Description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <button className="buttonInsert">Add</button>
        </form>
      </div>
    );
}

export default AddShopCategory;
