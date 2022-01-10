class OptionScene extends Phaser.Scene {
  constructor() {
    super("options");
  }
  create() {
   // console.log(" THe caller", this.data);
    this.bgOption = this.add.image(500, 400, "bgOption");
    this.bgOption.setOrigin(0.5);
    let volRatio = 10 / 50; // 0.2
    if (!this.sonClick)
      this.sonClick = this.sound.add("clickSouris", {
        loop: false,
        volume: 1
      });
    
    //=============== Btn Back =============== //
    this.btnBack = new Button(this, 910, 720, "boutonRetour");
    this.btnBack.onClick(() => {
      this.launchMenu();
    });
  //=============== Btn Mute =============== //
    this.btnMute = new Button(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 - 145,
      "cercleVolume"
    );
    this.btnMute.changeScale(0.4);
    this.btnMute.onClick(() => {
      this.muteSound();
    });

    this.soundStateTxt = this.add.text(
      this.btnMute.x + 20,
      this.btnMute.y,
      "",
      {
        font: "14px Arial",
        fill: "#e69900"
      }
    );
    this.soundStateTxt.setOrigin(0, 0.5);

    const mainBgSound = this.scene.get("menu").sonJeu;
    console.log("Checking volume Initial value", mainBgSound.volume)
    this.setSoundBtnState(mainBgSound.mute);

    //===============  Volume Up =============== //
    this.btnVolumeUp = new Button(
      this,
      this.game.config.width / 2,
      this.game.config.height / 2 + 5,
      "boutonVolume"
    );

    this.btnVolumeUp.onClick(() => {
      if (mainBgSound.volume < 1) (mainBgSound.volume += volRatio)/10;
      else if (mainBgSound.volume > 1) mainBgSound.volume = 1;
      console.log("Checkingvolume UP value", mainBgSound.volume)
    });

    this.btnVolumeUp.flipY = true;

    this.volumeUpText = this.add.text(
      this.btnVolumeUp.x,
      this.btnVolumeUp.y - 25,
      "+",
      {
        font: "30px Arial",
        fill: "#e69900"
      }
    );
    this.volumeUpText.setOrigin(0.5);
    this.volumeUpText.setShadow(1, 1, "#333333", 2, false, true);

    //===============  Volume Down =============== //
    this.btnVolumeDown = new Button(
      this,
      this.btnVolumeUp.x,
      this.btnVolumeUp.y + 60,
      "boutonVolume"
    );
    this.btnVolumeDown.onClick(() => {
      if (mainBgSound.volume > 0.2) mainBgSound.volume -= volRatio;
      else if (mainBgSound.volume <= 0.2) mainBgSound.volume = 0;
      console.log("Checkingvolume Down value", mainBgSound.volume)
    });

    this.volumeDownText = this.add.text(
      this.btnVolumeDown.x,
      this.btnVolumeDown.y + 20,
      "-",
      {
        font: "30px Arial",
        fill: "#e69900"
      }
    );
    this.volumeDownText.setOrigin(0.5);
    this.volumeDownText.setShadow(1, 1, "#333333", 2, false, true);
  } // End Create

  launchMenu = () => {
    //console.log("Menu");
    this.scene.start("menu");
  };

  //code tiré de ce lien https://gist.github.com/zackproser/1aa1ee41f326fc00dfb4
  muteSound = () => {
    var mainBgSound = this.scene.get("menu").sonJeu;
    if (mainBgSound.mute == false) {
      mainBgSound.mute = true;
      this.setSoundBtnState(true);
    } else {
      mainBgSound.mute = false;
      this.setSoundBtnState(false);
    }
  };

  setSoundBtnState = bool => {
    if (bool == true) {
      this.btnMute.setTint(0x4d0026);
      this.soundStateTxt.setText("UNMUTE");
    } else {
      this.btnMute.setTint(16777215);
      this.soundStateTxt.setText("MUTE");
    }
  };
}
