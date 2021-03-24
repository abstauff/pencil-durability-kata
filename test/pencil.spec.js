const { expect } = require("chai");
const Pencil = require("../src/Pencil");
const Paper = require("../src/Paper");
let pencil;
let paper;

describe("Pencil", () => {
  beforeEach(() => {
    pencil = new Pencil(10);
    paper = new Paper();
  });
  it("Can write a string on paper", () => {
    pencil.write("hello", paper);
    expect(paper.text).to.equal("hello");
  });

  it("Appends newly written strings to existing text on the paper", () => {
    pencil.write("hello", paper);
    pencil.write(" you!", paper);
    expect(paper.text).to.equal("hello you!");
  });

  it("Has an inital point durability value", () => {
    expect(pencil.pointDurability).to.equal(10);
  });

  it("Writing uppercase letters decreases point durability by 2", () => {
    pencil.write("Hi Bob", paper);
    expect(pencil.pointDurability).to.equal(3);
  });

  it("Writing lowercase letters decreases point durability by 1", () => {
    pencil.write("hello", paper);
    expect(pencil.pointDurability).to.equal(5);
  });

  it("Writing spaces does not decrease point durability", () => {
    pencil.write("hi bob", paper);
    expect(pencil.pointDurability).to.equal(5);
  });

  it("Writing newlines does not decrease point durability", () => {
    pencil.write("hi \nbob", paper);
    expect(pencil.pointDurability).to.equal(5);
  });
});
