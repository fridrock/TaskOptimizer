import React, { Component } from "react";

class HomeFragment extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }
  getMessage = async function () {
    let response = await fetch("api/hello");
    console.log(response);
    let json = await response.json();
    console.log(json);
  };
  render() {
    this.getMessage();
    return <div></div>;
  }
}

export default HomeFragment;
