import React, { Component } from "react";
import "./ColumnElement.css";
import CheckBoxCreator from "./CheckBoxCreator";
import CheckBox from "./CheckBox";

class ColumnElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCreator: false,
      readyToSubmit: false,
      value: "",
    };
    this.changeSubmit = this.changeSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeHasCreator = this.changeHasCreator.bind(this);
    this.changeCreatoreState = this.changeCreatoreState.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
  }
  changeHasCreator() {
    this.setState({
      ...this.state,
      hasCreator: !this.hasCreator,
    });
  }
  changeSubmit() {
    this.setState({
      ...this.state,
      readyToSubmit: !this.state.readyToSubmit,
    });
  }
  updateCheckBox(checkBoxId) {
    let action = this.props.updateCheckBoxCreator(
      this.props.planId,
      this.props.column.column_id,
      checkBoxId
    );
    this.props.dispatch(action);
  }
  changeCreatoreState() {
    if (this.state.value != "" && this.state.hasCreator) {
      let action = this.props.addCheckBoxCreator(
        this.props.planId,
        this.props.column.column_id,
        {
          text: this.state.value,
          done: false,
          checkbox_id: this.props.column.lastCheckBoxId,
        }
      );

      this.props.dispatch(action);

      this.setState({
        hasCreator: false,
        readyToSubmit: false,
        value: "",
      });
    } else if (!this.state.hasCreator) {
      this.setState({
        ...this.state,
        hasCreator: true,
      });
    } else if (this.state.hasCreator && this.state.value == "") {
      this.setState({
        ...this.state,
        hasCreator: false,
      });
    }
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({
      ...this.state,
      value: value,
    });
  }
  render() {
    let checkBoxes = this.props.column.checkboxes.map((checkbox) => {
      return (
        <CheckBox
          checkBoxText={checkbox.text}
          updateCheckBox={this.updateCheckBox}
          checkbox={checkbox}
        ></CheckBox>
      );
    });

    return (
      <div className="column_container">
        <p className="column_name">{this.props.column.column_name}</p>
        <button
          className={`add_checkbox_button ${
            this.state.readyToSubmit ? "submit" : "add"
          }`}
          onClick={this.changeCreatoreState}
        ></button>
        <div className="checkbox_container">
          {checkBoxes}
          <CheckBoxCreator
            opened={this.state.hasCreator}
            value={this.state.value}
            changeSubmit={this.changeSubmit}
            handleChange={this.handleChange}
          ></CheckBoxCreator>
        </div>
      </div>
    );
  }
}

export default ColumnElement;
