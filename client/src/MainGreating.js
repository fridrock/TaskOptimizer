import React, { Component, createRef } from "react";
import VanillaHoverButton from "./VanillaHoverButton";
import {Link}  from 'react-router-dom';
import "./MainGreating.css";
class MainGreating extends Component {
  constructor(props) {
    super(props);
    this.state = { isClicked: false };
    this.innerSide = [];
    this.containerRef = createRef();
    this.switchState = (e, inner) => {
      console.log(e.target);
      console.log(e.target === this.containerRef.current);
      if (!(e.target === this.containerRef.current)) {
        if (inner.length === 1) {
          this.setState({
            isClicked: true,
          });
        }
      } else {
        this.setState({
          isClicked: false,
        });
      }
    };
  }

  render() {
    if (this.state.isClicked) {
      this.innerSide = [<Link to="/registration">Регистрация</Link>,<Link to="/auth">Авторизация</Link>];
    } else {
      this.innerSide = [<Link>Начать работу</Link>];
    }
    this.innerSide = this.innerSide.map((elem) => {
     
     
        return <VanillaHoverButton link={elem}></VanillaHoverButton>
     
      
  });
    return (
      <div
        className="main_greating_container"
        ref={this.containerRef}
        onClick={(e) => {
          this.switchState(e, this.innerSide);
        }}
      >
        <p>Добро пожаловать в TaskOptimizer</p>
        <div className="button_block">{this.innerSide}</div>
      </div>
    );
  }
}

export default MainGreating;
