/*
 * creating a Button object that extends inherite from the Phaser Sprite
 * use "extends" keyword to define the Parent to inherit from
 * use "super" keyword in constructors to access and call functions on an object's parent.
 * It must be called before the "this" keyword can be used
 * this button will atomaticaly be added to the scene when instanciated
 */

class Button extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.setTexture(texture);
    this.setPosition(x, y);
    this.setOrigin(0.5);
    this.setInteractive();
    this.mouseOver();
    this.mouseOut();
    scene.add.existing(this); // Could also be written scene.children.add(this);
    this.currentScaleY = this.scaleX;
    this.currentScaleX = this.scaleY;
    this.scaleFactor = 1;
    //console.log("thisOriginalScale", this);
    console.log("thisOriginalScale", this.orignalScale);
  } // End Create

  deactivate = () => {
    this.input.enabled = false;
    //this.disableInteractive()
  };
  activate = () => {
    this.input.enabled = true;
    //this.setInteractive()
  };
  onClick = cb => {
    this.on("pointerdown", () => {
      this.setScale(this.currentScaleX * 0.9, this.currentScaleY * 0.9);
    });
    this.on("pointerup", () => {
      console.log(" You clicked ME !!!!");
      this.setScale(this.currentScaleX, this.currentScaleY);

      if (cb)
        setTimeout(() => {
          cb();
        }, 80);
    });
  };

  mouseOver = cb => {
    this.on("pointerover", () => {
      this.setScale(this.currentScaleX * 1.08, this.currentScaleY * 1.08);
      if (cb) cb();
    });
  };
  mouseOut = cb => {
    this.on("pointerout", () => {
      this.setScale(this.currentScaleX, this.currentScaleY);
      if (cb) cb();
    });
  };
  changeScale = (x, y) => {
    //let x = x || 1;

    if (!y) {
      this.currentScaleX = this.currentScaleY = x;
      console.log(" Scales", this);
      this.setScale(this.currentScaleX, this.currentScaleY);
    } else {
      this.currentScaleX = x;
      this.currentScaleY = y;
      this.setScale(this.currentScaleX, this.currentScaleY);
    }
  };
  //flip()
}
