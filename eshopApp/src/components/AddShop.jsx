import React from "react";

class AddShop extends React.Component {
  state = {
    shopCategoryID: "",
    shopName: "",
    description: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.shopCategoryID === "" || this.state.shopName === "" || this.state.description === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addShopHandler(this.state);
    this.setState({ shopCategoryID: "", shopName: "", description: "" });
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
              value={this.state.shopCategoryID}
              onChange={(e) => this.setState({ shopCategoryID: e.target.value })}
            />
          </div>
          <div className="field">
            <label>ShopName</label>
            <input
              type="text"
              name="shopName"
              placeholder="ShopName"
              value={this.state.shopName}
              onChange={(e) => this.setState({ shopName: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    );
  }
}

export default AddShop;
