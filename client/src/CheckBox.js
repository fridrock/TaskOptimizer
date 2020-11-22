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
    return (
      <div className="checkBoxContainer">
        <input
          type="checkbox"
          id="ch"
          name="checkbox"
          defaultChecked={this.props.checkbox.checkBoxDone}
          onClick={() => {
            this.props.updateCheckBox(this.props.checkbox.checkBoxId);
          }}
        ></input>
        <label for="checkbox">{this.props.checkbox.checkBoxName}</label>
      </div>
    );
  }
}

export default CheckBox;
