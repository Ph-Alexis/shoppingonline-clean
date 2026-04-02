import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../utils/withRouter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  getImageSrc(image) {
    if (!image) return "";

    if (image.startsWith("data:image")) return image;
    if (image.startsWith("http")) return image;

    let clean = image;
    clean = clean.replace(/\r?\n|\r/g, "");
    clean = clean.replace(/\s/g, "");
    clean = clean.replace(/^"+|"+$/g, "");

    return "data:image/jpeg;base64," + clean;
  }

  render() {
    const prods = this.state.products.map((item) => {
      return (
        <div key={item._id} className="inline">
          <figure>
            <Link to={"/product/" + item._id}>
              <img
                src={this.getImageSrc(item.image)}
                width="300px"
                height="300px"
                alt=""
              />
            </Link>
            <figcaption className="text-center">
              {item.name} <br />
              Price: {item.price}
            </figcaption>
          </figure>
        </div>
      );
    });

    return (
      <div className="text-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        {prods}
      </div>
    );
  }

  componentDidMount() {
    const params = this.props.params;
    if (params && params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params && params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    const prevParams = prevProps.params;

    if (
      params &&
      params.cid &&
      (!prevParams || params.cid !== prevParams.cid)
    ) {
      this.apiGetProductsByCatID(params.cid);
    } else if (
      params &&
      params.keyword &&
      (!prevParams || params.keyword !== prevParams.keyword)
    ) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  // apis
  apiGetProductsByCatID(cid) {
    axios.get("/api/customer/products/category/" + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByKeyword(keyword) {
    axios.get("/api/customer/products/search/" + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
}

export default withRouter(Product);
