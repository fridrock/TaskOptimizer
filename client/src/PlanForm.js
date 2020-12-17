import React, { Component } from "react";
import "./PlanForm.css";

class PlanForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createPlanPost = this.createPlanPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeVisible = this.props.changeVisible;
    this.closePlanForm = this.closePlanForm.bind(this);
    this.state = {
      plan_name: "",
    };
  }
  async createPlanPost() {
    const plan = {
      planName: this.state.plan_name,
      userId: this.props.userId,
    };

    const resolve = await fetch("/api/plans/create", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(plan),
    });
    const json = await resolve.json();
    const newPlan = await JSON.parse(json);
    newPlan.doneProcent = 0;
    const action = this.props.addPlanCreator(newPlan);
    this.props.dispatch(action);
  }
  handleSubmit(e) {
    e.preventDefault();
    //TODO: check if field is empty
    this.createPlanPost();
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
              autoComplete="off"
            ></input>
          </label>
          <input type="submit" value="Создать" className="submit_plan" />
        </form>
      </div>
    );
  }
}

export default PlanForm;
