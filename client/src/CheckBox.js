import React, { Component } from "react";
import "./CheckBox.css";
class CheckBox extends Component {
  constructor(props) {
    super(props);
  }
  updateCheckBox(checkBoxId) {
    this.props.updateCheckBox(checkBoxId);
  }
  render() {
    let color = this.props.color;
    return (
      <div
        className="checkBoxContainer"
        style={{
          borderTop: "2px solid" + color,
        }}
      >
        <input
          type="checkbox"
          id="ch"
          name="checkbox"
          defaultChecked={this.props.checkbox.checkBoxDone}
          onClick={() => {
            this.props.updateCheckBox(this.props.checkbox);
          }}
        ></input>
        <label for="checkbox">{this.props.checkbox.checkBoxName}</label>
      </div>
    );
  }
}

export default CheckBox;
