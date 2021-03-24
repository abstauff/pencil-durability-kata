const { isUpperCase, isASpace } = require("./utils");

class Pencil {
  constructor(pointDurability) {
    this.pointDurability = pointDurability;
    this.originalPointDurability = pointDurability;
  }
  write(string, paper) {
    for (let i = 0; i < string.length; i++) {
      let currentChar = string[i];

      if (this.pointDurability > 0) {
        if (isUpperCase(currentChar)) {
          this.pointDurability -= 2;
        } else if (isASpace(currentChar)) {
          //no operation
        } else {
          this.pointDurability -= 1;
        }
        paper.text += currentChar;
      } else {
        paper.text += " ";
      }
    }
  }

  sharpen() {
    this.pointDurability = this.originalPointDurability;
  }
}

module.exports = Pencil;
