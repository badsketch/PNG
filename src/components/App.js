import React, { Component } from "react";
import "./App.scss";
import config from "../../config";

import { ImageCanvas } from "./image-canvas/ImageCanvas";

class App extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);
  }
  componentDidMount() {
    // integrate with getWord
    this.getImage();
  }
  getWord() {
    console.log("yay");
  }

  getImage() {
    let API_KEY = config.FLICKR_API_KEY;

    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=duck&format=json&nojsoncallback=true`
    )
      .then(res => res.json())
      .then(res => {
        console.log(res.photos);
      });
  }
  render() {
    return (
      <div>
        <div className="box has-text-centered">
          <h1 className="title">Picture Naming Game</h1>
          <button className="button is-danger" onClick={this.getWord}>
            Click Me
          </button>
        </div>
        <div className="pictureArea">
          <div className="canvas">
            <ImageCanvas />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
