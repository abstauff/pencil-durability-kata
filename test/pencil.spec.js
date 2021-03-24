const { expect } = require("chai");
const Pencil = require("../src/Pencil");
let pencil;

describe("Pencil", () => {
  it("Can write hello", () => {
    pencil = new Pencil();

    expect(pencil.write("hello")).to.equal("hello");
  });
});
