class InstructionScene extends Phaser.Scene {
  constructor() {
    super("instructions");
  }

  create() {
    this.add.image(500, 400, "bgInstruction").setOrigin(0.5);
    this.btnBack = new Button(this, 910, 720, "boutonRetour");
    this.btnBack.onClick(() => {
      this.launchMenu();
    });
  } // End Create

  launchMenu = () => {
    console.log("Menu");
    this.scene.start("menu");
  };
}
