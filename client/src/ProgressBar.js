import React, { Component } from "react";
import "./ProgressBar.css";
class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`progress_bar_container 
         `}
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
