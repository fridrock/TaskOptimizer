import React, { Component } from "react";
import "./ProgressBar.css";
class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`progress_bar_container ${
          this.props.opened ? "" : "closed"
        }`}
      >
        <div className="progress_bar_full">
          <div
            className="progress_bar_done "
            style={{ width: this.props.doneProcent + "%" }}
          ></div>
        </div>
      </div>
    );
  }
}

export default ProgressBar;
