import React, { Component } from "react";
import "./ImageCanvas.scss";

export class ImageCanvas extends Component {
  constructor(props) {
    super(props);
    this.blurImage = this.blurImage.bind(this);
    this.setUpImage = this.setUpImage.bind(this);
    this.state = {
      canvas: {
        width: 0,
        height: 0
      }
    };
  }

  componentDidMount() {
    this.setUpImage();
  }

  componentWillUnmount() {
    // interval will try to set state when image canvas is unmounted when game ends so must be removed
    clearInterval(this.interval);
  }

  componentDidUpdate(prevProps) {
    // display new image when props are updated with new url
    if (this.props.url != prevProps.url) {
      clearInterval(this.interval);
      this.setUpImage();
    }
  }

  setUpImage() {
    const canvas = this.refs.canvas;
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = this.props.url;
    img.onload = () => {
      this.setState({
        canvas: {
          width: img.naturalWidth,
          height: img.naturalHeight,
          ctx: context,
          blur: 20
        }
      });
      this.interval = setInterval(this.blurImage, 200, img);
    };
  }

  blurImage(img) {
    if (this.state.canvas.blur <= 0) {
      clearInterval(this.interval);
    }
    // image has to be redrawn ater blur
    this.state.canvas.ctx.filter = `blur(${this.state.canvas.blur}px)`;
    this.state.canvas.ctx.drawImage(
      img,
      0,
      0,
      this.state.canvas.width,
      this.state.canvas.height
    );
    // reduce blur factor
    this.setState({
      canvas: {
        ...this.state.canvas,
        blur: this.state.canvas.blur - 1
      }
    });
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.state.canvas.width}
        height={this.state.canvas.height}
      />
    );
  }
}
