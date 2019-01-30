import React, { Component } from "react";
import "./App.scss";

import { Header } from "./header/Header";
import { GameArena } from "./game-arena/GameArena";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <GameArena />
      </div>
    );
  }
}

export default App;
