import React, { Component } from "react";
import "./AddColumnForm.css";
class AddColumnForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVisible = this.props.changeVisible;
    this.closeColumnForm = this.closeColumnForm.bind(this);
    this.createColumnPost = this.createColumnPost.bind(this);
    this.state = {
      column_name: "",
    };
  }
  async createColumnPost() {
    const column = {
      columnName: this.state.column_name,
      planId: this.props.planId,
    };

    const resolve = await fetch("/api/columns/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(column),
    });
    const json = await resolve.json();
    const newColumn = await JSON.parse(json);
    const saveColumnAction = this.props.addColumnCreator(newColumn);
    this.props.dispatch(saveColumnAction);
    
  }
  handleSubmit(e) {
    e.preventDefault();
    this.createColumnPost();
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
