var menu = (function(){
    var _jeu;
    var _menu = function(jeu){
        _jeu = jeu;
    };
    
    _menu.prototype = {
        create : function(){
            
            _jeu.titre=_jeu.add.sprite(0,0, "titre");
            _jeu.sonJeu=_jeu.add.sound("musiqueJeu",0.2);
            _jeu.titre.alignIn(_jeu.world.bounds,Phaser.TOP_CENTER,0,-30);
			
			_jeu.boutonInstruction = _jeu.add.button(0, 0, "bouton_Instructions", this.instruction);
			_jeu.boutonInstruction.anchor.set(0.5,0.5);	
			_jeu.boutonInstruction.alignTo(_jeu.titre,Phaser.BOTTOM_CENTER,0, 100);
			_jeu.boutonInstruction.onInputOver.add(function(){_jeu.boutonInstruction.loadTexture("bouton_Instructions2");});
			_jeu.boutonInstruction.onInputOut.add(function(){_jeu.boutonInstruction.loadTexture("bouton_Instructions");});
				
            _jeu.boutonJouer = _jeu.add.button(0,0, "bouton_Demarrer", this.demarrer);
			_jeu.boutonJouer.anchor.set(0.5,0.5);	
			_jeu.boutonJouer.alignTo(_jeu.boutonInstruction,Phaser.BOTTOM_CENTER,0, -15);
			_jeu.boutonJouer.onInputOver.add(function(){_jeu.boutonJouer.loadTexture("bouton_Demarrer2");});
			_jeu.boutonJouer.onInputOut.add(function(){_jeu.boutonJouer.loadTexture("bouton_Demarrer");});
			
			_jeu.boutonOption=_jeu.add.button(0,0, "bouton_Option", this.option);
			_jeu.boutonOption.alignTo(_jeu.boutonJouer,Phaser.BOTTOM_CENTER,80, 30);
			_jeu.boutonOption.anchor.set(0.5,0.5);	
			_jeu.boutonOption.onInputOver.add(function(){_jeu.boutonOption.loadTexture("bouton_Option2");});
			_jeu.boutonOption.onInputOut.add(function(){_jeu.boutonOption.loadTexture("bouton_Option");});
				
				
            //_jeu.state.start('Jouer');//initie immediatement le jeu(debocage)
			_jeu.sonJeu.play("",0,1,true);
        },
        demarrer : function()
        {	_jeu.sonJeu.stop();
            _jeu.state.start('Jouer');
        },
         instruction : function()
        {
            console.log('INSTRUCTION');
            _jeu.state.start('Instructions');
        },
        option : function()
        {
            console.log('OPTION');
            _jeu.state.start('Options');
        }
    };
    
    return _menu;
})();