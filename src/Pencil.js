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
    let array = string.split("");

    for (let i = array.length - 1; i >= 0; i--) {
      if (this.eraserDurability > 0) {
        if (array[i] !== " ") {
          this.eraserDurability -= 1;
        }
        array[i] = " ";
      }
    }
    return array.join("");
  }

  edit(string, paper) {
    let textArray = paper.text.split("");

    let previousChar = textArray[0];
    for (let i = 0; i < textArray.length; i++) {
      let currentChar = textArray[i];

      if (previousChar === " " && currentChar === " ") {
        for (let k = 0; k < string.length; k++) {
          if (textArray[i] !== " ") {
            textArray[i] = "@";
          } else {
            textArray[i] = string[k];
          }
          i++;
        }
        paper.text = textArray.join("");
        return;
      }
      previousChar = currentChar;
    }
  }
}

module.exports = Pencil;
