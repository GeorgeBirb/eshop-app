import React from "react";

class AddShopCategory extends React.Component {
  state = {
    categoryName: "",
    description: "",
  };

  add = (e) => {
    e.preventDefault();
    if (this.state.categoryName === "" || this.state.description === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addShopCategoryHandler(this.state);
    this.setState({categoryName: "", description: "" });
  };
  render() {
    return (
      <div className="ui main">
        <h2>Add Shop Category</h2>
        <form className="ui form" onSubmit={this.add}>
          <div className="field">
            <label>CategoryName</label>
            <input
              type="text"
              name="categoryName"
              placeholder="CategoryName"
              value={this.state.categoryName}
              onChange={(e) => this.setState({ categoryName: e.target.value })}
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

export default AddShopCategory;
