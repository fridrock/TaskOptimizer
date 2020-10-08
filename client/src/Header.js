import React, { Component } from "react";
import PersonalCabinet from "./PersonalCabinet";
import "./Header.css";
import logo from "./img/logo.png";
class Header extends Component {
  render() {
    return (
      <div className="header_container">
        <div className="logo_brand">
          <img src={logo}></img>
          <p className="p_brand">Ladno</p>
        </div>
        <PersonalCabinet isRegistrated={false}></PersonalCabinet>
      </div>
    );
  }
}

export default Header;
