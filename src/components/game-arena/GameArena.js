import React, { Component } from "react";

import { ImageCanvas } from "./image-canvas/ImageCanvas";

import config from "../../../config";

let statusENUM = {
  READY: 1,
  IN_PROGRESS: 2,
  DONE: 3
};

export class GameArena extends React.Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);
    this.getWord = this.getWord.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      imageUrl: null,
      answer: "",
      timer: 7,
      score: 0,
      status: statusENUM.READY,
      roundsLeft: 0
    };
  }

  startGame() {
    this.setState({
      status: statusENUM.IN_PROGRESS,
      score: 0,
      roundsLeft: 2
    });
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
        this.setState(
          {
            answer: res.word.toLowerCase()
          },
          console.log(res.word)
        ); // used for testing

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

        // once image is loaded, begin counting down
        this.timer = setInterval(() => {
          if (this.state.timer > 0) {
            this.setState({
              timer: this.state.timer - 1
            });
          }
        }, 1000);
      });
  }

  // compares user input with the answer
  checkAnswer(event) {
    // get new word if input matches
    if (event.target.value.toLowerCase() == this.state.answer) {
      // when answer is correct, stop timer and increment score accordingly
      clearInterval(this.timer);
      this.setState({
        score: this.state.score + this.state.timer * 100 + 500,
        timer: 7,
        roundsLeft: this.state.roundsLeft - 1
      });
      event.target.value = "";
      if (!this.state.roundsLeft) {
        this.setState({
          status: statusENUM.DONE
        });
      } else {
        this.getWord();
      }
    }
  }

  render() {
    return (
      <div className="section">
        {this.state.status == statusENUM.READY ? (
          <div className="has-text-centered">
            <button
              className="button is-primary is-centered is-large"
              onClick={this.startGame}
            >
              Start!
            </button>
          </div>
        ) : null}

        {this.state.status == statusENUM.IN_PROGRESS ? (
          <div>
            <div className="has-text-centered is-size-3">
              Score: {this.state.score}
            </div>
            <div className="has-text-centered has-size-6">
              Rounds Left: {this.state.roundsLeft}
            </div>
            <div className="container">
              {this.state.imageUrl ? (
                <ImageCanvas url={this.state.imageUrl} />
              ) : null}
            </div>
            <div className="columns is-centered is-marginless">
              <div className="column is-half">
                <input
                  className="input is-medium"
                  type="text"
                  placeholder="type here"
                  onChange={this.checkAnswer}
                />
              </div>
            </div>
          </div>
        ) : null}

        {this.state.status == statusENUM.DONE ? (
          <div className="has-text-centered">
            <div className="is-size-2">Final Score: {this.state.score}</div>
            <button className="button is-warning" onClick={this.startGame}>
              Play Again
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
