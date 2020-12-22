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
    this.last_column = 1;
    this.last_row = 1;
    this.changeOpened = this.changeOpened.bind(this);
    this.changeModalState = this.changeModalState.bind(this);
    this.deletePlan = this.deletePlan.bind(this);
    this.deltePlanPost = this.deletePlanPost.bind(this);
    this.updateGrid = this.updateGrid.bind(this);
  }
  changeOpened(e) {
    if (this.props.visible) {
      this.setState({
        ...this.state,
        opened: false,
        modalOpened: false,
      });
    } else {
      this.setState({
        ...this.state,
        opened: !this.state.opened,
      });
    }
    e.stopPropagation();
  }
  updateGrid(newColumnWidth) {
    let currentColumnWidth = this.last_column + newColumnWidth;
    if (currentColumnWidth >= 21) {
      this.last_column = 1;
      this.last_row = this.last_row++;
    } else {
      this.last_column = currentColumnWidth;
    }
    console.log(this.last_column + " " + this.last_row);
  }
  async deletePlanPost() {
    const deleteQuery = {
      planId: this.props.plan.planId,
    };

    const resolve = await fetch("/api/plans/delete", {
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
    this.props.dispatch(this.props.deletePlanCreator(this.props.plan.planId));
  }
  changeModalState() {
    this.setState({
      ...this.state,
      modalOpened: !this.state.modalOpened,
    });
  }
  deletePlan() {
    this.deletePlanPost();
    this.setState({
      opened: !this.state.opened,
    });
  }
  render() {
    let columns = this.props.plan.columns.map((column) => {
      return (
        <ColumnElement
          planId={this.props.plan.planId}
          column={column}
          checkboxes={column.checkboxes}
          dispatch={this.props.dispatch}
          addCheckBoxCreator={this.props.addCheckBoxCreator}
          updateCheckBoxCreator={this.props.updateCheckBoxCreator}
          deleteColumnCreator={this.props.deleteColumnCreator}
          last_column={this.last_column}
          last_row={this.last_row}
          updateGrid={this.updateGrid}
        ></ColumnElement>
      );
    });
    return (
      <div
        className={`plan_container ${this.state.opened ? `opened` : `hide`}`}
        onClick={this.state.opened ? null : this.changeOpened}
      >
        <div className="planElementHeader">
          <div className="planElementHeaderContent">
            <ProgressBar
              doneProcent={this.props.plan.doneProcent}
            ></ProgressBar>
            <p className={"planName"}>{this.props.plan.planName}</p>
          </div>
          <div className="button_div">
            <button
              className={`hide_button ${this.state.opened ? "" : "closed"}`}
              onClick={this.changeOpened}
            ></button>
            <button
              className={`delete_button ${this.state.opened ? "" : "closed"}`}
              onClick={this.deletePlan}
            ></button>
            <button
              className={`create_column_button ${
                this.state.opened ? "" : "closed"
              }`}
              onClick={this.changeModalState}
            >
              Добавить колонку
            </button>
          </div>
        </div>

        <div
          className={`columns_container ${this.state.opened ? "" : "closed"}`}
        >
          {columns}
        </div>

        <AddColumnForm
          lastColumnId={this.props.plan.lastColumnId}
          planId={this.props.plan.planId}
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
