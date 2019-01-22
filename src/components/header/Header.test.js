import React from "react";
import { Header } from "./Header";
import { shallow } from "enzyme";

describe("App Component", () => {
  it('displays "Picture Naming Game" as the title', () => {
    const wrapper = shallow(<Header />);
    const text = wrapper.find("h1").text();
    expect(text).toEqual("Picture Naming Game");
  });
});
