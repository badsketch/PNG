import React from "react";
import { GameArena } from "./GameArena";
import { mount, shallow } from "enzyme";
import "isomorphic-fetch";

let statusENUM = {
  READY: 1,
  IN_PROGRESS: 2,
  DONE: 3
};

describe("GameArena Component", () => {
  it("does not display an imageCanvas unless there is an image fetched", () => {
    const wrapper = mount(<GameArena />);
    let imageCanvas = wrapper.find("ImageCanvas");
    expect(imageCanvas.length).toBe(0);
    wrapper.setState({
      status: statusENUM.IN_PROGRESS,
      imageUrl: "testUrl.jpg"
    });
    imageCanvas = wrapper.find("ImageCanvas");
    expect(imageCanvas.length).toBe(1);
  });

  it("displays 'Start!' button when status is on ready", () => {
    const wrapper = shallow(<GameArena />);
    const text = wrapper.find("button").text();
    expect(text).toEqual("Start!");
  });

  it("displays 'Play Again' button when game is over", () => {
    const wrapper = shallow(<GameArena />);
    wrapper.setState({
      status: statusENUM.DONE
    });
    const text = wrapper.find("button").text();
    expect(text).toEqual("Play Again");
  });
});
