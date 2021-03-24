class Pencil {
  constructor(pointDurability) {
    this.pointDurability = pointDurability;
  }
  write(string, paper) {
    paper.text += string;

    let length = string.split(" ").join("").split("\n").join("").length;
    this.pointDurability -= length;
  }
}

module.exports = Pencil;
