class Preload extends Phaser.Scene {
  constructor(game) {
    super("prechargement");
  }
  preload() {
    this.load.image("ecran_demarrage", "GUI-ELEMENTS-GameOver.png");
    this.load.image("barre_chargement", "chargement.png");
    this.load.audio("musiqueJeu", "sons/musiqueDeFond_1.mp3");
  }
  create() {
    console.log("preload fin", this.game);
    //this.scene.start("chargement");
    //this.game.scene.start("menu");
    this.game.scene.start("chargement");
  }
}
