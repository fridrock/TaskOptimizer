import React, { Component } from "react";
import "./HomeFragment.css";
import PlanElement from "./PlanElement";
import PlanForm from "./PlanForm";

class HomeFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.changeVisible = this.changeVisible.bind(this);
  }

  changeVisible() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    let planItems = [];
    this.props.plans.map((el) => {
      planItems.push(
        <PlanElement key={el.id} id={el.id} planName={el.name}></PlanElement>
      );
    });
    return (
      <div className="main">
        {planItems}
        <PlanElement planName="dfasdfsd"></PlanElement>
        <div className="create_button_container">
          <button className="create_button" onClick={this.changeVisible}>
            Создать план
          </button>
        </div>
        <PlanForm
          visible={this.state.visible}
          changeVisible={this.changeVisible}
          lastPlanId={this.props.lastPlanId}
          dispatch={this.props.dispatch}
          addPlanCreator={this.props.addPlanCreator}
        ></PlanForm>
      </div>
    );
  }
}

export default HomeFragment;
