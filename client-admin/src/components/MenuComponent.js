import React, { Component } from "react";
import MyContext from "../contexts/MyContext";

import { Link } from "react-router-dom";

class Menu extends Component {
  static contextType = MyContext; // using this.context to access global state

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu">
              <Link to="/home">Home</Link>
            </li>
            <li className="menu">
              <Link to="/category">Category</Link>
            </li>
            <li className="menu">
              <Link to="/product">Product</Link>
            </li>
            <li className="menu">
              <Link to="/order">Order</Link>
            </li>
            <li className="menu">
              <Link to="/customer">Customer</Link>
            </li>
          </ul>
        </div>
        <div className="float-right">
          <Link to="/home" onClick={() => this.lnkLogoutClick()}>
            Logout
          </Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  lnkLogoutClick() {
    this.context.setToken("");
    this.context.setUsername("");
  }
}

export default Menu;
