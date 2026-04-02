import "./App.css";
import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent";
import MyProvider from "./contexts/MyProvider";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Loading...",
    };
  }

  render() {
    return (
      <MyProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </MyProvider>
    );
  }

  componentDidMount() {
    axios.get("/hello").then((res) => {
      const result = res.data;
      this.setState({ message: result.message });
    });
  }
}

export default App;
