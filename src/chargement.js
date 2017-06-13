var chargement = (function(){
    var _jeu;
    var _chargement = function(jeu){
        _jeu = jeu;
    };
    
    _chargement.prototype = {
        preload: function(){
            _jeu.ecran_demarrage = _jeu.add.sprite(0,0, 'ecran_demarrage');   
            _jeu.barre_chargement = _jeu.add.sprite(20,500, "barre_chargement");
			_jeu.barre_chargement.alignIn(_jeu.ecran_demarrage,Phaser.BOTTOM_CENTER,0,-200);
            _jeu.load.image('bgTuile','./assets/images/bgTransparant.png');
			_jeu.load.image('coverface','./assets/images/green_grass-100c.png');
			_jeu.load.image('objet1','./assets/images/bomb-3-100-red.png');
			_jeu.load.image('objet2','./assets/images/cat-100.png');
			_jeu.load.image('objet3','./assets/images/easter-rabbit-100.png');
			_jeu.load.image('objet4','./assets/images/heart-life-100.png');
			_jeu.load.image('objet5','./assets/images/cow-100.png');
            _jeu.load.image('objet6','./assets/images/elephant-100.png');
            _jeu.load.image('objet7','./assets/images/fish-100.png');
            _jeu.load.image('objet8','./assets/images/fox-100.png');
            _jeu.load.image('objet9','./assets/images/giraffe-100.png');
            _jeu.load.image('objet10','./assets/images/sheep-2-100.png');
            _jeu.load.image('objet11','./assets/images/pig-100.png');
            _jeu.load.image('objet12','./assets/images/Chicken-100.png');
			_jeu.load.image('boutonOff','./assets/images/bouton-offc.png');
			_jeu.load.image('boutonOn','./assets/images/bouton-actifc.png');
            _jeu.load.spritesheet('explosion', './assets/images/explosion.png', 256, 128, -1);
            
			//les sons
			_jeu.load.audio('musiqueJeu', './assets/sons/musiqueDeFond_1.mp3');
            _jeu.load.audio('gameOver', './assets/sons/gameOver.mp3');
            _jeu.load.audio('bgMusique','./assets/sons/shadydave__skyline_01.mp3');//musique de fond 
			_jeu.load.audio('bgMusique2','./assets/sons/musiqueDeFond_2.mp3');//musique de fond 
			_jeu.load.audio('clickSouris','./assets/sons/SonJeu_Track6.mp3');	
			_jeu.load.audio('noMatch','./assets/sons/SonJeu_Track7.mp3');	
			_jeu.load.audio('match','./assets/sons/SonJeu_Track8.mp3');//son				
			_jeu.load.audio('flip','./assets/sons/flip.mp3');//son
			_jeu.load.audio('explosion','./assets/sons/explosion.mp3');//son
			_jeu.load.audio('niveauClear','./assets/sons/win.mp3');//son
			_jeu.load.audio('lifeUp','./assets/sons/lifeUp.mp3');//son
           // _jeu.load.audio('gameOver','sons/gameOver.mp3');//son
			//_jeu.load.image('boutonDown','./images/bouton-down.png');
           
			//elements Menu
            _jeu.load.image('titre','./assets/images/TitreJeu.png');  
            _jeu.load.image('bouton_Instructions','./assets/images/boutonInstruction.png');
			_jeu.load.image('bouton_Instructions2','./assets/images/boutonInstruction2.png');
            _jeu.load.image('bouton_Demarrer','./assets/images/boutonJouer.png');
			_jeu.load.image('bouton_Demarrer2','./assets/images/boutonJouer2.png');
			_jeu.load.image('bouton_Option','./assets/images/boutonOption1.png');
			_jeu.load.image('bouton_Option2','./assets/images/boutonOption2.png');
            _jeu.load.image('bgInstruction','./assets/images/GUI_instruction.png');
			_jeu.load.image('bgOption','./assets/images/GUI-ELEMENTS-Options.png');
			_jeu.load.image('ecranGanant','./assets/images/GUI-ELEMENTS-Victoire.png');
			_jeu.load.image('ecranPerdant','./assets/images/GUI-ELEMENTS-GameOver.png');
            _jeu.load.image('boutonRetour','./assets/images/bouton-RetourMenu.png');
			
			_jeu.load.image('ligneSon','./assets/images/ligneVolume.png');
            _jeu.load.image('cercleVolume','./assets/images/volumecircle.png');
            _jeu.load.image('boutonVolume','./assets/images/arrow-down_32.png');
			
            //elements du GUI
			_jeu.load.image('gui','./assets/images/gui_bg.png');
            _jeu.load.image('relancerJeu','./assets/images/restart.png');
            _jeu.load.image('sortir','./assets/images/bouton-Exit.png');
            _jeu.load.image('coeur','./assets/images/heart-life-32.png');
			_jeu.load.image('option','./assets/images/boutonsOption.png');
            
            _jeu.load.setPreloadSprite(_jeu.barre_chargement);
        },
        create : function(){
            _jeu.barre_chargement.destroy();
            _jeu.state.start('Menu');
            //_jeu.state.start('Jouer');
        }
    };
    
    return _chargement;
})();