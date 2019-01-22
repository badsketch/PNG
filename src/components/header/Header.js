import React, { Component } from "react";

export class Header extends Component {
  render() {
    return (
      <div className="box has-text-centered">
        <h1 className="title">Picture Naming Game</h1>
        <button className="button is-danger" onClick={this.getWord}>
          Click Me
        </button>
      </div>
    );
  }
}
