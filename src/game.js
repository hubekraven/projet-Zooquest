window.onload = function() {
  //setting game window configuration
  var config = {
    type: Phaser.AUTO,
    autoResize: true,
    width: 1005,
    height: 815,
    //roundPixels: true,
    backgroundColor: "rgb(0,0,0)",
     loader: {
        baseURL: 'assets'
    },
    scene: [
      Preload,
      Loader,
      TransitionScene,
      MenuScene,
      InstructionScene,
      OptionScene,
      PlayScene,
      Level1
    ], //register all the scenes of the game
    title: "ZooQuest",
    version: "1.2b"
  };
  var game = new Phaser.Game(config);

  function init() {
    //this.add.existing(new Button(this, 400, 300, "block"));
    // Phaser.GameObjects.GameObjectFactory.register("button", function(x, y) {
    //  let sprite = new EnemyRobot(this.scene, 0, 500, "contra");
    
    //  this.displayList.add(sprite);
    //  this.updateList.add(sprite);
    
    //  return sprite;
    // });
  }
};
