const { expect } = require("chai");
const Pencil = require("../src/Pencil");
const Paper = require("../src/Paper");
let pencil;
let paper;

describe("Pencil", () => {
  it("Can write a string on paper", () => {
    pencil = new Pencil();
    paper = new Paper();

    pencil.write("hello", paper);
    expect(paper.text).to.equal("hello");
  });

  it("Appends newly written strings to existing text on the paper", () => {
    pencil = new Pencil();
    paper = new Paper();

    pencil.write("hello", paper);
    pencil.write(" friends and neighbors", paper);
    expect(paper.text).to.equal("hello friends and neighbors");
  });
});
