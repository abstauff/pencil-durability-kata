const { expect } = require("chai");
const Pencil = require("../src/Pencil");
const Paper = require("../src/Paper");
let pencil;
let paper;
let sharpPencil;

describe("Pencil", () => {
  describe("First half tests", () => {
    beforeEach(() => {
      pencil = new Pencil(10, 1, 10);
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

      it("Has an initial length", () => {
        expect(pencil.pencilLength).to.equal(1);
      });

      it("Length is diminished by 1 when sharpened", () => {
        pencil.sharpen();
        expect(pencil.pencilLength).to.equal(0);
      });

      it("Sharpening does not restore point durability once length is depleted", () => {
        pencil.sharpen();
        pencil.write("This will make the pencil dull", paper);
        pencil.sharpen();
        expect(pencil.pointDurability).to.equal(0);
      });
    });
  });

  describe("Second Half Tests", () => {
    beforeEach(() => {
      pencil = new Pencil(40, 1, 10);
      paper = new Paper();
    });

    describe("Erase", () => {
      it("Can erase a given part of the text on the paper", () => {
        // pencil = new Pencil(40, 1, 10);

        pencil.write("The best of the best", paper);
        pencil.erase("best", paper);
        expect(paper.text).to.equal("The best of the     ");
      });

      it("Doesn't erase anything if the given string isn't in the text", () => {
        // pencil = new Pencil(40, 1, 10);
        pencil.write("The best of the best", paper);
        pencil.erase("cheese", paper);
        expect(paper.text).to.equal("The best of the best");
      });
    });

    describe("Eraser Degradation", () => {
      it("Eraser has an initial durability value", () => {
        expect(pencil.eraserDurability).to.equal(10);
      });

      it("Eraser durability decreases by 1 per character erased", () => {
        pencil.write("Here we are", paper);
        pencil.erase("Here", paper);
        expect(pencil.eraserDurability).to.equal(6);
      });

      it("Eraser durability does not decrease when erasing spaces", () => {
        pencil.write("Here we are", paper);
        pencil.erase("we are", paper);
        expect(pencil.eraserDurability).to.equal(5);
      });

      it("Cannot erase anymore once eraser durability reaches 0", () => {
        // pencil = new Pencil(40, 1, 10);
        pencil.write("Its in alphabetical order", paper);
        pencil.erase("alphabetical", paper);
        expect(paper.text).to.equal("Its in al           order");
      });
    });

    describe("Editing", () => {
      it("Can write new text over first existing white space in text", () => {
        pencil.write("An       a day keeps the doctor away", paper);
        pencil.edit("apple", paper);
        expect(paper.text).to.equal("An apple a day keeps the doctor away");
      });

      it("Existing text on the paper cannot 'shift' to make room for new text", () => {
        pencil.write("An       a day keeps the doctor away", paper);
        pencil.edit("artichoke", paper);
        expect(paper.text).to.equal("An artich@k@ay keeps the doctor away");
      });
    });
  });
});
