import React, { Component } from "react";
import "./PlanForm.css";
class PlanForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVisible = this.props.changeVisible;
    this.closePlanForm = this.closePlanForm.bind(this);
    this.state = {
      plan_name: "",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    //TODO:submit form

    //TODO:get plan json

    //this is fake id of plan in the future this id would be got from server
    let newPlan = {
      name: this.state.plan_name,
      id: this.props.lastPlanId,
      lastColumnId: 0,
      columns: [],
    };

    //TODO:convert json to object

    let action = this.props.addPlanCreator(newPlan);
    this.props.dispatch(action);

    this.closePlanForm();
  }
  closePlanForm() {
    this.props.changeVisible();
    this.setState({
      plan_name: "",
    });
  }
  handleChange(e) {
    let value = e.target.value;
    this.setState({
      plan_name: value,
    });
  }
  render() {
    return (
      <div
        className={`plan_form_container  ${
          this.props.visible ? "opened" : "closed"
        }`}
      >
        <button className="close_button" onClick={this.closePlanForm}>
          X
        </button>
        <form className="plan_form" onSubmit={this.handleSubmit}>
          <label>
            Введите название плана
            <input
              type="text"
              name="plan_name"
              value={this.state.plan_name}
              onChange={this.handleChange}
            ></input>
          </label>
          <input type="submit" value="Создать" className="submit_plan" />
        </form>
      </div>
    );
  }
}

export default PlanForm;
