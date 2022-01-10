/*
 * creating a Card object that extends inherite from the Phaser Sprite
 * use "extends" keyword to define the Parent to inherit from
 * use "super" keyword in constructors to access and call functions on an object's parent.
 * It must be called before the "this" keyword can be used
 * Params: 
 *  @scene (Scene)
 *  @imageArray (Array)
 *  @x (Int)
 *  @y (Int)
 * Position the card at x,y. If none is provided the card with be instanciated in the center of the scene
 */
//--TODO: The current card class extends from the Sprite class
//--replace: the  to extends from Container Class
//-- cf: Door class in bank Panic game( http://127.0.0.1:5501/phaser3-examples-master/public/index.html?dir=games/bank%20panic/&q= )

class Card extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    x = x||scene.game.config.width/2;
    y = y || scene.game.config.height / 2;
    
    this.animalsList = [
      "objet1",
      "objet2",
      "objet3",
      "objet4",
      "objet5",
      "objet6",
      "objet7",
      "objet8",
      "objet9",
      "objet10",
      "objet11",
      "objet12"
    ]

    const image = this.animalsList[Math.floor(Math.random()*this.animalsList.length)]
    
    this.cover = scene.add.sprite(0, 0, "coverface");
    this.cover.setOrigin(0.5);
    this.face = scene.add.image(0, 0, image);
    this.face.setOrigin(0.5);

    this.setPosition(x, y);
    
    this.add([this.face, this.cover]);
  
    scene.add.existing(this);
    this.activate();
    this.flip(scene);
    this.yAxis = new Phaser.Math.Vector3(0, 1, 0);
    this.zAxis = new Phaser.Math.Vector3(0, 0, 1);
    this.isCover = true
    this.isFace = false
  }
  activate() {
    this.setSize(100, 100);
    this.setInteractive();
  }
  deactivate() {
    this.disableInteractive();
    this.setTint(0x4d0026);
  }
  flip(scene) {
 

    this.on("pointerdown", () => {
      this.setScale(0.95);
    });
    this.on("pointerout", () => {
      this.setScale(1);
    });
     this.on("pointerover", () => {
      this.setScale(1.05);
     });
    
    this.on("pointerup", () => {
      /*creating the tween animation for the card class.
       * for this to work, the tween has to be generate from the scene passed in reference and not from the current class (this), 
       * with "this" tweens will be undefined.
       */
      let originx = this.x;
      let tween1 = scene.tweens.add({
        targets: this,
        scaleX: 1.15,
        depth: 2,
        scaleY: 1.15,
        ease: "Sine.easeInOut",
        duration: 250,
        repeat: 0,
        yoyo: false,
        onComplete: () => {
          let tween2 = scene.tweens.add({
            targets: this,
            scaleX: 0.01,
            depth: 0,
            x: originx,
            ease: "Linear",
            duration: 250,
            repeat: 0,
            yoyo: false,
            onComplete: () => {
              this.setScale(1);
              if (this.isCover) this.showFace()
              else if(this.isFace) this.showCover()
            }
          });
        }
      });
    });
  }
  showCover() {
    this.isFace = false
    this.bringToTop(this.cover)
    this.face.visible=false
    this.cover.visible=true
    this.isCover =true
  }

  showFace() {
    this.isCover = false
    this.bringToTop(this.face)
     this.face.visible=true
    this.cover.visible=false
    this.isFace =true
  }
}
/*===========flip card CSS expeemple=========
.container {
    width: 200px;
    height: 260px;
    position: relative;
    border: 1px solid #ccc;
    -webkit-perspective: 800px;
    -moz-perspective: 800px;
    -o-perspective: 800px;
    perspective: 800px;
}
.card {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-transition: -webkit-transform 2s;
    -moz-transition: -moz-transform 2s;
    -o-transition: -o-transform 2s;
    transition: transform 2s;
    -webkit-transform-style: preserve-3d;
    -moz-transform-style: preserve-3d;
    -o-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform-origin: -2% 50%;
}
.card div {
    display: block;
    height: 100%;
    width: 100%;
    line-height: 260px;
    color: white;
    text-align: center;
    font-weight: bold;
    font-size: 140px;
    position: absolute;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -o-backface-visibility: hidden;
    backface-visibility: hidden;
}
.card .front {
  background: red;
}
.card .back {
    background: blue;
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg );
    -o-transform: rotateY( 180deg );
    transform: rotateY( 180deg );
}
.card.flipped {
    -webkit-transform: rotateY( 180deg );
    -moz-transform: rotateY( 180deg ) translate(-100%, 0%);
    -o-transform: rotateY( 180deg ) translate(-100%, 0%);
    transform: rotateY( 180deg ) translate(-100%, 0%);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 0% 50%;
    
}


*/
