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
    this.createCheckBoxPost = this.createCheckBoxPost.bind(this);
    this.updateCheckBoxPost = this.updateCheckBoxPost.bind(this);
    this.deleteColumnPost = this.deleteColumnPost.bind(this);
  }
  async updateCheckBoxPost(checkBoxId) {
    const checkBoxIdJson = {
      checkBoxId: checkBoxId,
    };
    const resolve = await fetch("/api/checkboxes/update", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(checkBoxIdJson),
    });
    const json = await resolve.json();
    const answer = JSON.parse(json);
    console.log(answer);
  }
  async createCheckBoxPost() {
    const checkBox = {
      checkBoxName: this.state.value,
      checkBoxDone: false,
      columnId: this.props.column.columnId,
    };

    const resolve = await fetch("/api/checkboxes/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(checkBox),
    });
    const json = await resolve.json();
    const newCheckBox = await JSON.parse(json);
    console.log(newCheckBox);
    console.log(this.props.planId);
    const saveCheckBoxAction = this.props.addCheckBoxCreator(
      newCheckBox,
      this.props.planId,
      this.props.column.columnId
    );
    this.props.dispatch(saveCheckBoxAction);
    console.log(newCheckBox);
  }
  //TODO: refactor
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
  updateCheckBox(checkBox) {
    let action = this.props.updateCheckBoxCreator(
      checkBox.checkBoxId,
      this.props.planId,
      this.props.column.columnId
    );
    this.props.dispatch(action);
    this.updateCheckBoxPost(checkBox.checkBoxId);
  }
  changeCreatoreState() {
    if (this.state.value !== "" && this.state.hasCreator) {
      //
      this.createCheckBoxPost();
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
  async deleteColumnPost() {
    const deleteQuery = {
      columnId: this.props.column.columnId,
    };
    const resolve = await fetch("/api/columns/delete", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(deleteQuery),
    });
    const json = await resolve.json();
    const answer = await JSON.parse(json);
    console.log(answer);
    this.props.dispatch(
      this.props.deleteColumnCreator(
        this.props.planId,
        this.props.column.columnId
      )
    );
  }

  render() {
    let checkBoxes = this.props.column.checkBoxes.map((checkbox) => {
      return (
        <CheckBox
          updateCheckBox={this.updateCheckBox}
          checkbox={checkbox}
        ></CheckBox>
      );
    });

    return (
      <div className="column_container">
        <div className="column_header">
          <p className="column_name">{this.props.column.columnName}</p>
          <div className="button_container">
            <button
              className={`add_checkbox_button ${
                this.state.readyToSubmit ? "submit" : "add"
              }`}
              onClick={this.changeCreatoreState}
            ></button>
            <button
              className="delete_button"
              onClick={this.deleteColumnPost}
            ></button>
          </div>
        </div>
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
