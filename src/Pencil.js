class Pencil {
  constructor(pointDurability) {
    this.pointDurability = pointDurability;
  }
  write(string, paper) {
    paper.text += string;
    this.pointDurability -= string.length;
  }
}

module.exports = Pencil;
