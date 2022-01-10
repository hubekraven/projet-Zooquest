class Loader extends Phaser.Scene {
  constructor() {
    super("chargement");
  }

  preload() {
    this.ecran_demarrage = this.add.image(500, 400, "ecran_demarrage");
    this.barre_chargement = this.add.sprite(
      this.ecran_demarrage.getCenter().x - 100,
      500,
      "barre_chargement"
    );
    /*  Setting the ancor of the loading bar to the bottom left
     *  So that any transformation (scale ) will go from letf to rigth
     */
    this.barre_chargement.setOrigin(0, 0);
    //adding loading text
    this.textLoading = this.add.text(
      this.ecran_demarrage.getCenter().x - 70,
      480,
      "Loading game..."
    );
    this.load.on("complete", () => {
      this.textLoading.destroy();
      this.barre_chargement.destroy();
    });
    // Images
    this.load.image("bgTuile", "images/bgTransparant.png");
    this.load.image("coverface", "images/green_grass-100c.png");
    this.load.image("objet1", "images/bomb-3-100-red.png");
    this.load.image("objet2", "images/cat-100.png");
    this.load.image("objet3", "images/easter-rabbit-100.png");
    this.load.image("objet4", "images/heart-life-100.png");
    this.load.image("objet5", "images/cow-100.png");
    this.load.image("objet6", "images/elephant-100.png");
    this.load.image("objet7", "images/fish-100.png");
    this.load.image("objet8", "images/fox-100.png");
    this.load.image("objet9", "images/giraffe-100.png");
    this.load.image("objet10", "images/sheep-2-100.png");
    this.load.image("objet11", "images/pig-100.png");
    this.load.image("objet12", "images/Chicken-100.png");
    this.load.image("boutonOff", "images/bouton-offc.png");
    this.load.image("boutonOn", "images/bouton-actifc.png");
    
    //spriteSheet
    //this.load.spritesheet("creatures", "creatures_spritesheets.png",{ frameWidth: 100, frameHeight: 100 });
    this.load.atlas('creatures_spritesheets', "creatures_spritesheets.png","creatures_spritesheets.json");
    // Menu elements
    this.load.image("titre", "images/TitreJeu.png");
    this.load.image(
      "bouton_Instructions",
      "images/boutonInstruction.png"
    );
    this.load.image(
      "bouton_Instructions2",
      "images/boutonInstruction2.png"
    );
    this.load.image("bouton_Demarrer", "images/boutonJouer.png");
    this.load.image("bouton_Demarrer2", "images/boutonJouer2.png");
    this.load.image("bouton_Option", "images/boutonOption1.png");
    this.load.image("bouton_Option2", "images/boutonOption2.png");
    this.load.image("bgInstruction", "images/GUI_instruction.png");
    this.load.image("bgOption", "images/GUI-ELEMENTS-Options.png");
    this.load.image("ecranGanant", "images/GUI-ELEMENTS-Victoire.png");
    this.load.image(
      "ecranPerdant",
      "images/GUI-ELEMENTS-GameOver.png"
    );
    this.load.image("boutonRetour", "images/bouton-RetourMenu.png");

    this.load.image("ligneSon", "images/ligneVolume.png");
    this.load.image("cercleVolume", "images/volumecircle.png");
    this.load.image("boutonVolume", "images/arrow-down_32.png");

    // GUI Elements
    this.load.image("gui", "images/gui_bg.png");
    this.load.image("relancerJeu", "images/restart.png");
    this.load.image("sortir", "images/bouton-Exit.png");
    this.load.image("coeur", "images/heart-life-32.png");
    this.load.image("option", "images/boutonsOption.png");

    // Sounds
    this.load.audio("musiqueJeu", "sons/musiqueDeFond_1.mp3");
    this.load.audio("gameOver", "sons/gameOver.mp3");
    this.load.audio("bgMusique", "sons/shadydave__skyline_01.mp3"); //musique de fond
    this.load.audio("bgMusique2", "sons/musiqueDeFond_2.mp3"); //musique de fond
    this.load.audio("clickSouris", "sons/SonJeu_Track6.mp3");
    this.load.audio("noMatch", "sons/SonJeu_Track7.mp3");
    this.load.audio("match", "sons/SonJeu_Track8.mp3"); //son
    this.load.audio("flip", "sons/flip.mp3"); //son
    this.load.audio("explosion", "sons/explosion.mp3"); //son
    this.load.audio("niveauClear", "sons/win.mp3"); //son
    this.load.audio("lifeUp", "sons/lifeUp.mp3"); //son

    //**using the Progress value return by the loader to set the loading progress bar .
    this.load.on("progress", percent => {
      this.barre_chargement.setScale(percent * 10, 1);
    });
  } // End Preload

  create() {
    //this.textLoading.destroy();
    //this.barre_chargement.destroy();
    //this.game.scene.start("menu");// this call will stack scenes in renderer.
    this.scene.start("menu"); //this call unlaod the current scene before calling the next one
  } // End Create
}
