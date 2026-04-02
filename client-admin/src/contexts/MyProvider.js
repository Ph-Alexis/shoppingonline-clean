import React, { Component } from "react";
import MyContext from "./MyContext";

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // global state
      token: localStorage.getItem("token") || "",
      username: localStorage.getItem("username") || "",
      // variables
      // token: "",
      // username: "",
      // functions
      setToken: this.setToken,
      setUsername: this.setUsername,
    };
  }

  setToken = (value) => {
    localStorage.setItem("token", value);
    this.setState({ token: value });
  };

  setUsername = (value) => {
    localStorage.setItem("username", value);
    this.setState({ username: value });
  };

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
