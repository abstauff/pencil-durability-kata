class Pencil {
  constructor(pointDurability) {
    this.pointDurability = pointDurability;
  }
  write(string, paper) {
    paper.text += string;
  }
}

module.exports = Pencil;
