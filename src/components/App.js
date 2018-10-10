import React, { Component } from "react";

import './App.scss';

class App extends Component {
    getWord() {
            console.log("yay");
    }
    render() {
        return (
            <div className="box has-text-centered">
                <h1 className="title">Picture Naming Game</h1>
                <button className="button is-danger" onClick={this.getWord}>Click Me</button>
            </div>
        )
    }
}

export default App;
