import React, { Component } from "react";
import "./CheckBoxCreator.css";

class CheckBoxCreator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let color = this.props.color;
    return (
      <div
        className={`checkbox_creator_container ${
          this.props.opened ? "" : "closed"
        }`}
        style={{
          borderTop: "2px solid" + color,
        }}
      >
        <input
          className="checkbox_creator_input"
          value={this.props.value}
          onChange={this.props.handleChange}
          placeholder="Введите название"
          onFocus={this.props.changeSubmit}
          onBlur={this.props.changeSubmit}
        ></input>
      </div>
    );
  }
}

export default CheckBoxCreator;
