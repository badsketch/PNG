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
    this.getImage("duck");
  }
  getWord() {
    console.log("yay");
  }

  getImage(searchTerm) {
    let API_KEY = config.FLICKR_API_KEY;

    // possibly use text argument instead of tags
    // first get results from search
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${searchTerm}&format=json&nojsoncallback=true`
    )
      .then(res => res.json())
      .then(res => {
        // grab first result
        let firstResultId = res.photos.photo[0].id;
        // retrieves image sizes
        return fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${API_KEY}&photo_id=${firstResultId}&format=json&nojsoncallback=1`
        );
      })
      .then(res => res.json())
      .then(res => {
        let imageSizes = res.sizes.size;
        let image = imageSizes.find(
          size => size.label === "Medium" || size.label === "Original"
        );
        let imageUrl = image.source;
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
            <ImageCanvas imageUrl="what" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
