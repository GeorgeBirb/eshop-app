import React from "react";

class AddShop extends React.Component {
  state = {
    ShopName: "",
    ShopCategoryId: "",
    Description: "",
    ShopCategory: {ShopCategoryId: "",CategoryName:"",Description:""},
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.ShopName === "" || this.state.ShopCategoryId === "" || this.state.Description === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    const shopToAdd = {
      ShopName: this.state.ShopName,
      ShopCategoryId: this.state.ShopCategoryId,
      Description: this.state.Description,
      ShopCategory: {ShopCategoryId: this.state.ShopCategoryId, CategoryName:"",Description:""},
    };
    this.props.addShopHandler(shopToAdd);
    this.setState({ ShopName: "", ShopCategoryId: "", Description: "" });
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Shop</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>ShopCategoryID</label>
            <input
              type="number"
              name="shopCategoryID"
              placeholder="ShopCategoryID"
              value={this.state.ShopCategoryId}
              onChange={(e) => this.setState({ ShopCategoryId: e.target.value })}
            />
          </div>
          <div className="field">
            <label>ShopName</label>
            <input
              type="text"
              name="shopName"
              placeholder="ShopName"
              value={this.state.ShopName}
              onChange={(e) => this.setState({ ShopName: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.Description}
              onChange={(e) => this.setState({ Description: e.target.value })}
            />
          </div>
          <button className="buttonInsert">Add</button>
        </form>
      </div>
    );
  }
}

export default AddShop;
