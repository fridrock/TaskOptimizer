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
    this.changeOpened = this.changeOpened.bind(this);
    this.checkFormValues = this.checkFormValues.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      column_name: "",
      column_width: "",
      help_info: false,
      column_priority: "0",
    };
  }
  async createColumnPost() {
    const column = this.checkFormValues();
    if (column) {
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
  }
  checkFormValues() {
    let column;
    //if i return false it means that form can not be submitted because value is empty
    //TODO:make error handling
    if (
      this.state.column_name === "" ||
      this.state.column_width === "" ||
      this.state.column_priority === "0"
    ) {
      column = false;
    } else {
      column = {
        columnName: this.state.column_name,
        columnWidth: +this.state.column_width,
        columnPriority: +this.state.column_priority,
        planId: this.props.planId,
      };
    }
    return column;
  }

  changeOpened() {
    this.setState({
      ...this.state,
      help_info: !this.state.help_info,
    });
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
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }
  handleSelect(e) {
    this.setState({
      ...this.state,
      column_priority: e.target.value,
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
            <p>Введите название колонны</p>
            <input
              type="text"
              name="column_name"
              placeholder="Например, обучение гитаре"
              value={this.state.column_name}
              onChange={this.handleChange}
              autoComplete="off"
            ></input>
          </label>
          <label>
            <p>Введите ширину колонны относительно всего плана в %</p>
            <input
              type="text"
              name="column_width"
              placeholder="20 будет значить 20% от ширины плана"
              value={this.state.column_width}
              onChange={this.handleChange}
              autoComplete="off"
            ></input>
          </label>
          <label id="select_label">
            <select
              onChange={this.handleSelect}
              value={this.state.column_priority}
            >
              <option disabled={true}>Выберите приоритет колонны</option>
              <option value="1" id="low_priority">
                Низкий
              </option>
              <option value="2" id="middle_priority">
                Средний
              </option>
              <option value="3" id="high_priority">
                Высокий
              </option>
            </select>
            <div
              className={`help_info `}
              onMouseOver={this.changeOpened}
              onMouseOut={this.changeOpened}
            ></div>
            <div
              className={`${
                this.state.help_info ? "opened_info" : "closed_info"
              }`}
            >
              В зависимости от приоритета колонны, ее чекбоксы расцениваются по
              разному, высокий приоритет оценивает чекбокс в 3 балла, средний в
              2 , а низкий в 1.
            </div>
          </label>
          <input type="submit" value="Создать" className="submit_column" />
        </form>
      </div>
    );
  }
}

export default AddColumnForm;
