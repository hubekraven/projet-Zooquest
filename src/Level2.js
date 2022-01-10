class Level2 extends Phaser.Scene {
  constructor() {
    super("level 2");
  }
  create() {
    this.add.text(20, 20, "Loading game...");
  }
}
