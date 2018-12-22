import React, { Component } from "react";
import './App.scss';

import { ImageCanvas } from './image-canvas/ImageCanvas';

class App extends Component {
    getWord() {
            console.log("yay");
    }
    render() {
        return (
            <div>
                <div className="box has-text-centered">
                    <h1 className="title">Picture Naming Game</h1>
                    <button className="button is-danger" onClick={this.getWord}>Click Me</button>
                </div>
                <div className="pictureArea">
                    <div className="canvas">
                        <ImageCanvas></ImageCanvas> 
                    </div>
                </div>
            </div>
            )
    }
}

export default App;
