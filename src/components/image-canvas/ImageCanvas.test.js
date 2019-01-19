import React from "react";
import { ImageCanvas } from "./ImageCanvas";
import { mount } from "enzyme";

describe("ImageCanvas Component", () => {
  it("has an image url in its props", () => {
    const wrapper = mount(<ImageCanvas />);
    expect(wrapper.prop("imageUrl")).not.toBeNull();
  });

  it("has a canvas with dimensions based on the component state", () => {
    const wrapper = mount(<ImageCanvas />);
    wrapper.setState({
      canvas: {
        height: 800,
        width: 600
      }
    });
    const canvas = wrapper.find("canvas");
    expect(canvas.prop("height")).toBe(800);
    expect(canvas.prop("width")).toBe(600);
  });
});
