import React from "react";
import { GameArena } from "./GameArena";
import { mount } from "enzyme";
import "isomorphic-fetch";

describe("GameArena Component", () => {
  it("does not display an imageCanvas unless there is an image fetched", () => {
    const wrapper = mount(<GameArena />);
    let imageCanvas = wrapper.find("ImageCanvas");
    expect(imageCanvas.length).toBe(0);
    wrapper.setState({
      imageUrl: "testUrl.jpg"
    });
    imageCanvas = wrapper.find("ImageCanvas");
    expect(imageCanvas.length).toBe(1);
  });
});
