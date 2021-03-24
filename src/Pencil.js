const { isUpperCase, isASpace } = require("./utils");

class Pencil {
  constructor(pointDurability, pencilLength, eraserDurability) {
    this.pointDurability = pointDurability;
    this.originalPointDurability = pointDurability;
    this.pencilLength = pencilLength;
    this.eraserDurability = eraserDurability;
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
    if (this.pencilLength > 0) {
      this.pointDurability = this.originalPointDurability;
      this.pencilLength -= 1;
    }
  }

  erase(string, paper) {
    let startIdx = paper.text.lastIndexOf(string);

    if (startIdx === -1) {
      return;
    }

    let textBeginning = paper.text.substring(0, startIdx);
    let textEnding = paper.text.substring(startIdx + string.length);
    let erasedString = this.eraseString(string);

    paper.text = textBeginning + erasedString + textEnding;
  }

  eraseString(string) {
    let blankString = "";
    for (let i = string.length; i > 0; i--) {
      blankString += " ";
      this.eraserDurability -= 1;
    }
    return blankString;
  }
}

module.exports = Pencil;
