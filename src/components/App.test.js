import React from "react";
import App from "./App";
import { shallow, mount } from "enzyme";
import "isomorphic-fetch";

describe("App Component", () => {
  it('displays "Picture Naming Game" as the title', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find("h1").text();
    expect(text).toEqual("Picture Naming Game");
  });

  it("does not display an imageCanvas unless there is an image fetched", () => {
    const wrapper = mount(<App />);
    let imageCanvas = wrapper.find("ImageCanvas");
    expect(imageCanvas.length).toBe(0);
    wrapper.setState({
      imageUrl: "testUrl.jpg"
    });
    imageCanvas = wrapper.find("ImageCanvas");
    expect(imageCanvas.length).toBe(1);
  });
});
