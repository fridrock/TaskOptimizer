import React, { Component } from "react";
import "./AddColumnForm.css";
class AddColumnForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVisible = this.props.changeVisible;
    this.closeColumnForm = this.closeColumnForm.bind(this);
    this.state = {
      column_name: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    //TODO:submit form

    //TODO:get column json

    //this is fake id of plan in the future this id would be got from server
    let newColumn = {
      column_name: this.state.column_name,
      column_id: this.props.lastColumnId,
      checkboxes: [],
      lastCheckBoxId: 0,
    };

    //TODO:convert json to object

    let action = this.props.addColumnCreator(this.props.planId, newColumn);
    this.props.dispatch(action);

    this.closeColumnForm();
  }
  closeColumnForm() {
    this.props.changeModalState();
    this.setState({
      column_name: "",
    });
  }
  handleChange(e) {
    let value = e.target.value;
    this.setState({
      column_name: value,
    });
  }
  render() {
    return (
      <div
        className={`column_form_container  ${
          this.props.opened ? "opened" : "closed"
        }`}
      >
        <button className="close_button" onClick={this.closeColumnForm}>
          X
        </button>
        <form className="column_form" onSubmit={this.handleSubmit}>
          <label>
            Введите название колонки
            <input
              type="text"
              name="column_name"
              value={this.state.column_name}
              onChange={this.handleChange}
              autoComplete="off"
            ></input>
          </label>
          <input type="submit" value="Создать" className="submit_column" />
        </form>
      </div>
    );
  }
}

export default AddColumnForm;
