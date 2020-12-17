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
    let planItems = this.props.plans.map((el) => {
      return (
        <PlanElement
          visible={this.state.visible}
          key={el.id}
          plan={el}
          addColumnCreator={this.props.addColumnCreator}
          dispatch={this.props.dispatch}
          addCheckBoxCreator={this.props.addCheckBoxCreator}
          updateCheckBoxCreator={this.props.updateCheckBoxCreator}
          deletePlanCreator={this.props.deletePlanCreator}
        ></PlanElement>
      );
    });

    return (
      <div className="main">
        {planItems}

        <div className="create_button_container">
          <button className="create_button" onClick={this.changeVisible}>
            Создать план
          </button>
        </div>
        <PlanForm
          visible={this.state.visible}
          changeVisible={this.changeVisible}
          userId={this.props.userId}
          dispatch={this.props.dispatch}
          addPlanCreator={this.props.addPlanCreator}
        ></PlanForm>
      </div>
    );
  }
}

export default HomeFragment;
