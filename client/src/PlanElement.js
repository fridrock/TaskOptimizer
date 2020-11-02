import React, { Component } from "react";
import "./PlanElement.css";
import AddColumnForm from "./AddColumnForm";
import ColumnElement from "./ColumnElement";
import ProgressBar from "./ProgressBar";
class PlanElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
    this.changeOpened = this.changeOpened.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
  }
  changeOpened(e) {
    if (this.props.visible) {
      this.setState({
        opened: false,
        modalOpened: false,
      });
    } else {
      this.setState({
        opened: !this.state.opened,
      });
    }

    e.stopPropagation();
  }
  changeModalState() {
    this.setState({
      ...this.state,
      modalOpened: !this.state.modalOpened,
    });
  }
  render() {
    let columns = this.props.plan.columns.map((column) => {
      return (
        <ColumnElement
          planId={this.props.plan.id}
          column={column}
          checkboxes={column.checkboxes}
          dispatch={this.props.dispatch}
          addCheckBoxCreator={this.props.addCheckBoxCreator}
          updateCheckBoxCreator={this.props.updateCheckBoxCreator}
        ></ColumnElement>
      );
    });
    return (
      <div
        className={`plan_container ${this.state.opened ? `opened` : `hide`}`}
        onClick={this.state.opened ? null : this.changeOpened}
      >
        <ProgressBar
          opened={this.state.opened}
          doneProcent={this.props.plan.doneProcent}
        ></ProgressBar>
        <button
          className={`hide_button ${this.state.opened ? "" : "closed"}`}
          onClick={this.changeOpened}
        ></button>

        <p>{this.props.plan.name}</p>
        <button
          className={`create_column_button ${
            this.state.opened ? "" : "closed"
          }`}
          onClick={this.changeModalState}
        >
          Добавить колонку
        </button>
        <div
          className={`columns_container ${this.state.opened ? "" : "closed"}`}
        >
          {columns}
        </div>

        <AddColumnForm
          lastColumnId={this.props.plan.lastColumnId}
          planId={this.props.plan.id}
          dispatch={this.props.dispatch}
          changeModalState={this.changeModalState}
          opened={this.state.modalOpened}
          addColumnCreator={this.props.addColumnCreator}
        ></AddColumnForm>
      </div>
    );
  }
}

export default PlanElement;
