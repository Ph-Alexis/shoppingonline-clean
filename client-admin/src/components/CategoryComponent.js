import axios from "axios";
import React, { Component } from "react";
import MyContext from "../contexts/MyContext";
import CategoryDetail from "./CategoryDetailComponent";

class Category extends Component {
  static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemSelected: null,
    };
  }

  render() {
    const cates = Array.isArray(this.state.categories)
      ? this.state.categories.map((item) => {
          return (
            <tr
              key={item._id}
              className="datatable"
              onClick={() => this.trItemClick(item)}
            >
              <td>{item._id}</td>
              <td>{item.name}</td>
            </tr>
          );
        })
      : null;

    return (
      <div>
        <div className="float-left">
          <h2 className="text-center">CATEGORY LIST</h2>
          <table className="datatable" border="1">
            <tbody>
              <tr className="datatable">
                <th>ID</th>
                <th>Name</th>
              </tr>
              {cates}
            </tbody>
          </table>
        </div>

        <div className="inline" />
        <CategoryDetail
          item={this.state.itemSelected}
          updateCategories={this.updateCategories}
        />
        <div className="float-clear" />
      </div>
    );
  }
  updateCategories = (categories) => {
    if (Array.isArray(categories)) {
      this.setState({ categories });
    }
  };

  componentDidMount() {
    this.apiGetCategories();
  }

  // event-handlers
  trItemClick(item) {
    this.setState({ itemSelected: item });
  }

  // apis
  // apiGetCategories() {
  //   const config = {
  //     headers: { "x-access-token": this.context.token },
  //   };

  //   axios.get("/api/admin/categories", config).then((res) => {
  //     const categories = res.data.categories || [];
  //     this.setState({ categories });
  //   });
  // }
  apiGetCategories() {
    const config = {
      headers: { "x-access-token": this.context.token },
    };

    axios
      .get("/api/admin/categories", config)
      .then((res) => {
        console.log("API RAW:", JSON.stringify(res.data, null, 2));

        let categories = [];

        if (Array.isArray(res.data)) {
          categories = res.data;
        } else if (Array.isArray(res.data.categories)) {
          categories = res.data.categories;
        } else if (Array.isArray(res.data.data)) {
          categories = res.data.data;
        }

        this.setState({ categories });
      })
      .catch((err) => {
        console.error("API ERROR:", err);
        this.setState({ categories: [] });
      });
  }
}

export default Category;
