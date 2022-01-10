class Level1 extends Phaser.Scene {
  constructor() {
    super("level 1");
  }
  create() {
    this.add.text(500 / 2, 200, "This will old the fst Level of the game...");
  }
}
