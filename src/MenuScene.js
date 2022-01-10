class MenuScene extends Phaser.Scene {
  constructor() {
    super("menu");
  }
  //create() {
  //  setTimeout(() => {
  //    this.scene.start("level 1");
  //  }, 800);
  //}
  create() {
    //console.log("context", this);
    this.titre = this.add.sprite(this.game.config.width / 2, 200, "titre");
    this.titre.setOrigin(0.5, 0.5);
    let volLevel =0.3;
    if (!this.sonJeu) {
      this.sonJeu = this.sound.add("musiqueJeu", {
        loop: true,
        volume: volLevel
      });
      
    }
    if (this.sonJeu.isPlaying == false) this.sonJeu.play();
    this.bntInstruction = this.add.sprite(
      this.game.config.width / 2,
      500,
      "bouton_Instructions"
    );
    this.bntInstruction.setOrigin(0.5);
    this.bntInstruction.setInteractive();
    this.bntInstruction.input.cursor = true;
    //sprite.on('pointerdown', callback, context);
    this.bntInstruction.on("pointerover", () => {
      this.bntInstruction.setTexture("bouton_Instructions2");
    });
    this.bntInstruction.on("pointerout", () => {
      this.bntInstruction.setTexture("bouton_Instructions");
    });

    this.bntInstruction.on("pointerup", this.launchInstruction);
    console.log("instruction size", this.bntInstruction.height);

    this.bntPlay = this.add.sprite(
      this.game.config.width / 2,
      this.bntInstruction.height + this.bntInstruction.y + 10,
      "bouton_Demarrer"
    );
    this.bntPlay.setInteractive();
    this.bntPlay.setOrigin(0.5);
    this.bntPlay.on("pointerover", () => {
      this.bntPlay.setTexture("bouton_Demarrer2");
    });
    this.bntPlay.on("pointerout", () => {
      this.bntPlay.setTexture("bouton_Demarrer");
    });
    this.bntPlay.on("pointerdown", this.launchGame);
    console.log("play size", this.bntPlay.height);
    this.bntOption = this.add.sprite(
      this.game.config.width / 2,
      this.bntPlay.height + this.bntPlay.y + 10,
      "bouton_Option"
    );
    console.log("instruction size", this.bntOption.height);
    this.bntOption.setInteractive();
    this.bntOption.setOrigin(0.5);
    this.bntOption.on("pointerover", () => {
      this.bntOption.setTexture("bouton_Option2");
    });
    this.bntOption.on("pointerout", () => {
      this.bntOption.setTexture("bouton_Option");
    });
    this.bntOption.on("pointerdown", this.launchOption);
    //this.setAlpha(0);
    console.log("LA SCENE", this);
  } // End Create

  launchGame = () => {
    console.log("Launch Game...", this.sonJeu);
    if (this.sonJeu.isPlaying) this.sonJeu.stop();
    this.scene.start("play_scene");
    //else if (!this.sonJeu.isPlaying) this.sonJeu.play();
    //this.fadOut("transition_scene");
  };

  launchInstruction = () => {
    console.log("Launch INSTRUCTION...");
    //if (this.sonJeu.isPlaying) this.sonJeu.stop();
    this.scene.start("instructions");
  };
  launchOption = () => {
    console.log("launch OPTION...");
    this.scene.start("options");
  };
  fadOut = scene => {
    this.tweens.add({
      targets: this,
      alpha: 0
    });
    this.scene.transition({
      target: scene,
      duration: 1000,
      //moveBelow: true,
      onUpdate: this.transitionOut
      //data: { x: 400, y: 300 }
    });
  };
}
