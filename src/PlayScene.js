class PlayScene extends Phaser.Scene {
  constructor() {
    super("play_scene");
    //this.minRandge = 0;
    //this.maxRandge = 6;
    this.nbLife = 3;
    this.cols = 5; // (7 max) nombre de colonnes
    this.rows = 5; //(7 max)nombre de rangées
    this.nbCliks = 0;
  }
  init() {
    this.minRandge = 1;
    this.maxRandge = 6;
  }
  create() {
    /*** Creating the Game GUI and its elements ***/
    this.game.Gui = this.add.image(this.game.config.width - 190, 0, "gui");
    this.game.Gui.setOrigin(0, 0);

    this.playableArea = {
      width: this.game.config.width - this.game.Gui.width,
      height: this.game.config.height,
      x: 0,
      y:0
    }
    console.log("GameBound", this.game.Gui.getBounds())
    let graphics = this.add.graphics();
    graphics.lineStyle(2, 0xff0000);
    graphics.strokeRectShape(this.game.Gui);
    
    // graphics.lineStyle(2, 0xffff00);
    // graphics.strokeRectShape(this.playableArea);


    this.game.Gui.btnMatch = new Button(
      this,
      this.game.Gui.x + this.game.Gui.width / 2,
      this.game.Gui.y + 550,
      "boutonOff"
    );
    this.game.Gui.btnMatch.deactivate();

    this.game.Gui.btnOption = new Button(
      this,
      this.game.Gui.x + this.game.Gui.width / 2,
      this.game.Gui.btnMatch.y + this.game.Gui.btnMatch.height,
      "option"
    );

    this.game.Gui.btnOption.onClick(() => {
      this.launchOption();
    });

    this.game.Gui.btnReload = new Button(
      this,
      this.game.Gui.x + this.game.Gui.width / 2,
      this.game.Gui.btnOption.y + this.game.Gui.btnOption.height + 25,
      "relancerJeu"
    );

    this.game.Gui.btnReload.onClick(() => {
      //this.sonClick.play();
      //this.launchMenu();
    });
    this.game.Gui.btnBack = new Button(
      this,
      this.game.Gui.x + this.game.Gui.width / 2,
      this.game.Gui.btnReload.y + this.game.Gui.btnReload.height + 15,
      "boutonRetour"
    );
    this.game.Gui.btnBack.onClick(() => {
      this.launchMenu();
    });
    /* Adding the card */
    // this.card1 = new Card(this, ["coverface", "objet10"], 500, 500);
    // //this.card3 = new Card(this, ["coverface", "objet9"]);
       this.createBoardGame()
    // this.card2 = new Card(
    //   this,
    //   ["coverface", "objet1"],
    //   this.card1.x + this.card1.width + 3,
    //   500
    // );
    //TODO:Exploring phaser group and grid==========================

    // var group = this.make.group({
    //     key: 'creatures',
    //     //key:['diamonds', 'veg',"apple"],
    //     frame: Phaser.Utils.Array.NumberArray(0, 3),
    //     randomFrame: true,
    //     gridAlign: {
    //         x: 100,
    //         y: 100,
    //         width: 105,
    //         height: 105,
    //         cellWidth: 100,
    //         cellHeight: 100
    //     }
    // });

    // let group = this.add.group();
    // group.createMultiple({ key: ['creatures'], frame: [0, 1, 2, 3, 4], randomKey: true,randomFrame: true , frameQuantity: 1 });
    // //Phaser.Actions.SetXY(group.getChildren(), 32, 100, 105);
    //  //  Align them in a grid
    // Phaser.Actions.GridAlign(group.getChildren(), { width: 9, cellWidth: 58, cellHeight: 48, x: 132, y: 148 });
    // const atlasTexture = this.textures.get('creatures_spritesheets');
    // const frames = atlasTexture.getFrameNames();
    // console.log('TETURE ATLAS', frames)
    
    // //this.add.image(300, 300, 'creatures_spritesheets',frames[0]);
    // this.add.image(300, 300, 'creatures_spritesheets', 'cat-100.png');
  //===============================================================
  // let board = this.make.group({
  //   gridAlign: {
  //     x: 16,
  //     y: 16,
  //     width: 25,
  //     height: 25,
  //     cellWidth: 32,
  //     cellHeight: 32
  //   }
  // })
  //===========================================
  // let rndNumber = Phaser.Math.RND.integerInRange(
  //   this.minRandge,
  //   this.maxRandge
  //   );
    //Phaser.Math.RND.integerInRange(0, 250)
   // console.log("The RndNumber", rndNumber, "\n Grid", board);
 
  } // End Create

  launchMenu = () => {
    //console.log("Menu");
    this.scene.start("menu");
  };

  launchOption = () => {
    console.log("launch OPTION...");
    this.scene.start("options", this.scene);
  };
  //TODO:
  /*1- Work on the generation of the board with its cards 
  * 2-study Phaser3 groupe exemples:
      http://labs.phaser.io/index.html?dir=game%20objects/group/&q=
    how to add sprite/gameObject in the group?
    3: Use phaser grid to align cards (Phaser.action.Grid)


  *///END_TODO

  //======Fonction qui va creer le tableau de jeu avec toutes les tuiles=====//
  createBoardGame() {
    console.log("function creerTableau now!!!!!!", );
    let trap = 0;
    let bonus = 0;
    let _x =100
    let _y =100
    //this.card1 = new Card(this, ["coverface", "objet10"], 500, 500);
    //création des colonnes du tableau
    //==============================================================================
    // for (let i = 0; i < this.cols; i++) {
    //   //creation des rangées du tableau
    //   for (let j = 0; j < this.rows; j++) {
    //     let rndNumber = Phaser.Math.Between(this.minRandge,this.maxRandge);//génére un rndNumber aleatoire
    //     //Phaser.Math.RND.integerInRange(0, 250)
        
    //     //----- condition de création des pieges du jeu
    //     // if (rndNumber == 0 || rndNumber == 1) {
    //       //   trap++;
    //       //   if (trap > maxTraps) {
    //         //     rndNumber += 2; //cree une autre tuile au lieu de la bombe
    //         //   }
    //         // }
    //         // //----condition de creation des bonus du jeu
    //         // if (rndNumber == 4) {
    //           //   bonus++;
    //           //   if (bonus > nbMaxBonus) {
    //             //     rndNumber += 1; // cree une autre tuile au lieu du bonus
    //             //   }
    //             // }
                
    //   //----CREATION D'UNE TUILE AVEC SES PARAMETTRES--------
      
    //   // _tuileFace = _jeu.add.sprite(
    //     //   this.cols + 110 * i,
    //     //   this.rows + 110 * j,
    //     //   "objet" + rndNumber
    //     // ); //creation de l'objet1
    //     let _idTuile = "objet" + rndNumber;
        
    //     this.card = new Card(this, ["coverface", _idTuile], this.cols + 110 * i+_x,this.rows + 110 * j+_y,);
    //     //-------DEBOGAGE------//
    //     //_tuileFace = _jeu.add.sprite(cols + 110 * i, rows + 110 * j, 'objet' + _niveau1[i], _niveau1[i]); //====debogage
    //     //let _idTuile = 'objet' + _niveau1[i];
    //     //-------FIN DEBOGAGE------//
        
    //     // tuile = _jeu.add.sprite(cols + 110 * i, this.rows + 110 * j, "bgTuile");
    //     // tuile.texture.renderable = true; //annule la visibilité de la texture.
    //     // _tuilePile = _jeu.add.sprite(
    //       //   cols + 110 * i,
    //       //   rows + 110 * j,
    //       //   "coverface"
    //       // ); //crée la face arrière des tuiles
    //       // tuile.idTuile = _idTuile; //cree une nouvelle proprieté a la tuile ppour faciliter son identification
    //       // tuile.etatActif = true;
    //       // tuile.faceFace = _tuileFace; //cree une nouvelle proprieté a la tuile pour facilité acces a cette face
    //       // tuile.faceCouvert = _tuilePile; //cree une nouvelle proprieté a la tuile pour facilité acces a cette face
    //       // tuile.inputEnabled = true; //active la detection d'input sur la face arriere des tuiles
    //       // tuile.input.useHandCursor = true; //active la proprièté curser main
    //       // tuile.events.onInputDown.add(this.flip, this); //appel de la fonction flip au click
    //       //TabTuiles.push(tuile); //garde la tuile dans le tableau de reference
    //   }
    // }
      //==============================================================================
    var group = this.add.group();
    const cardGroup = []
    const x = 16
    for (let i = 0; i <= x-1; i++ ) {
      let rndNumber = Phaser.Math.Between(this.minRandge,this.maxRandge);//génére un rndNumber aleatoire
      let _idTuile = "objet" + rndNumber;
        
      let card = new Card(this);
      cardGroup.push(card)
      // group.create(this.cols + 110 * i+_x,this.rows + 110, card);
    }
     
    //anomyme fonction to calculate the center of created element in the grid
    const gridCenter = () => {
      return {
          x:(this.playableArea.width + 100 - Math.round(Math.sqrt(x)) * 100)/2,
          y: (this.playableArea.height + 100 - Math.round(Math.sqrt(x)) * 100)/2
      }
      
       }
    
    Phaser.Actions.GridAlign(cardGroup, {
          width:  Math.round(Math.sqrt(x)),
          cellWidth: 100,
          cellHeight: 100,
          x: gridCenter().x,//set the first element at x to center the grid 
          y: gridCenter().y,//set the first element at y to center the grid 
    });
  }
}
