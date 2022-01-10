class TransitionScene extends Phaser.Scene {
  constructor() {
    super("transition_scene");
  }
  preload() {}
  create() {
    this.screen = this.add.rectangle(
      0,
      0,
      this.game.config.width,
      this.game.config.height,
      0x9966ff
    );
    this.screen.setOrigin(0);
    //0x000000

    this.dummyText = this.add.text(
      this.screen.getCenter().x - 0,
      480,
      "Transitionning to next scene..."
    );
    this.screen.setAlpha(0);
    this.fadeIn();
  }
  fadeOut = scene => {
    // this.scene.transition({
    //target: scene,
    //duration: 2000,
    //moveBelow: true,
    //onUpdate: this.transitionOut,
    //data: { x: 400, y: 300 }
    // });
    this.screen.transition(scene);
    this.screen.setAlpha(0);
  };
  fadeIn = () => {
    this.tweens.add({
      targets: this.screen,
      alpha: 1
      //yoyo: true,
      //repeat: -1,
      //ease: 'Sine.easInOut'
    });
  };
}
