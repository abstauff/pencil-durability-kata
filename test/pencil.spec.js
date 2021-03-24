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
  describe("Write", () => {
    it("Can write a string on paper", () => {
      pencil.write("hello", paper);
      expect(paper.text).to.equal("hello");
    });

    it("Appends newly written strings to existing text on the paper", () => {
      pencil.write("hello", paper);
      pencil.write(" you!", paper);
      expect(paper.text).to.equal("hello you!");
    });
  });

  describe("Point Degradation", () => {
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

    it("Will only write spaces once the point is dull/ point durability is 0", () => {
      pencil.write("I hope you have a nice day", paper);
      expect(paper.text).to.equal("I hope you h              ");
    });
  });
  describe("Sharpen", () => {
    it("Can be sharpened to regain initial point durability", () => {
      pencil.write("I hope you have a nice day", paper);
      pencil.sharpen();
      expect(pencil.pointDurability).to.equal(10);
    });
  });
});
