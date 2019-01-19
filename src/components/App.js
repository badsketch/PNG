import React, { Component } from "react";
import "./App.scss";
import config from "../../config";

import { ImageCanvas } from "./image-canvas/ImageCanvas";

class App extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);
    this.getWord = this.getWord.bind(this);
    this.state = {
      imageUrl: null
    };
  }

  componentDidMount() {
    this.getWord();
  }

  // retrieves random word from wordnik API
  getWord() {
    // the higher the number, the more common the word
    let corpusCount = 800000;
    fetch(
      `https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=${corpusCount}&maxDictionaryCount=-1&minLength=2&maxLength=10&api_key=${
        config.WORDNIK_API_KEY
      }`
    )
      .then(res => res.json())
      .then(res => {
        return this.getImage(res.word);
      });
  }

  // given searchTerm retrieves image from flickr API
  getImage(searchTerm) {
    // possibly use text argument instead of tags
    // first get results from search
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
        config.FLICKR_API_KEY
      }&tags=${searchTerm}&format=json&nojsoncallback=true`
    )
      .then(res => res.json())
      .then(res => {
        // grab first result
        let firstResultId = res.photos.photo[0].id;
        // retrieves image sizes
        return fetch(
          `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${
            config.FLICKR_API_KEY
          }&photo_id=${firstResultId}&format=json&nojsoncallback=1`
        );
      })
      .then(res => res.json())
      .then(res => {
        let imageSizes = res.sizes.size;
        let image = imageSizes.find(
          size => size.label === "Medium" || size.label === "Original"
        );
        let imageUrl = image.source;
        this.setState({
          imageUrl
        });
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
            {this.state.imageUrl ? (
              <ImageCanvas url={this.state.imageUrl} />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
