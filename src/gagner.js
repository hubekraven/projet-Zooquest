var gagner = (function(){
	var _jeu;
    var _gagner = function(jeu){
        _jeu = jeu;
    };
    
    _gagner.prototype = {
        create : function(){
            
            _jeu.niveauCleared=_jeu.add.audio('niveauClear',0.6);
			_jeu.niveauCleared.play();
			
			 _jeu.sonClickSouris=_jeu.add.audio('clickSouris');
			 
			_jeu.ecranGanant=_jeu.add.sprite(0,0, "ecranGanant");
			
			_jeu.textGagner=_jeu.add.text(0, 0,"BRAVO!",{font:"38px Arial",fill:'rgb(0,255,0)'});
			_jeu.textGagner.alignIn(_jeu.ecranGanant,Phaser.CENTER,0,-100);
			_jeu.textGagner.setShadow(2, 4, "#333333", 2, false, true);
			
			_jeu.textGagner2=_jeu.add.text(0, 0,"VOTRE SCORE POUR CE NIVEAU:",{font:"38px Arial",fill:'rgb(0,255,0)'});
			_jeu.textGagner2.alignIn(_jeu.textGagner,Phaser.CENTER,0,60);
			_jeu.textGagner2.setShadow(2, 4, "#333333", 2, false, true);
			
			_jeu.textScore=_jeu.add.text(0, 0,_jeu.scoreJoueur,{font:"64px Arial",fill:'#ffffff'});
			_jeu.textScore.alignIn(_jeu.textGagner,Phaser.CENTER,0,160);
			_jeu.textScore.setShadow(2, 4, "#333333", 2, false, true);
			
			_jeu.textContinuer=_jeu.add.text(0, 0,"CONTINUER",{font:"38px Arial",fill:'#ffff00'});
			_jeu.textContinuer.alignIn(_jeu.ecranGanant,Phaser.CENTER,0,200);
			_jeu.textContinuer.stroke = "#de77ae";
			_jeu.textContinuer.strokeThickness = 12;
			_jeu.textContinuer.setShadow(2, 2, "#333333", 2, true, true);
			_jeu.textContinuer.inputEnabled = true;//active la detection d'input sur la face arriere des tuiles
			_jeu.textContinuer.input.useHandCursor = true;//active la proprièté curser main 
			_jeu.textContinuer.events.onInputDown.add(this.continuer, this);//appel de la fonction flip au click
			
			_jeu.textSortir=_jeu.add.text(0, 0,"SORTIR",{font:"38px Arial",fill:'#ffff00'});
			_jeu.textSortir.alignIn(_jeu.ecranGanant,Phaser.CENTER,0,250);
			_jeu.textSortir.stroke = "#de77ae";
			_jeu.textSortir.strokeThickness = 12;
			_jeu.textSortir.setShadow(2, 2, "#333333", 2, true, true);
			_jeu.textSortir.inputEnabled = true;//active la detection d'input sur la face arriere des tuiles
			_jeu.textSortir.input.useHandCursor = true;//active la proprièté curser main 
			_jeu.textSortir.events.onInputDown.add(this.sortir, this);//appel de la fonction flip au click
			
	
        },
        
		continuer : function()
        {  	
			_jeu.sonClickSouris.play();
			_jeu.scoreJoueur=0; 
			_jeu.state.start('Jouer2');//redemare le jeu 
        },
		
		sortir : function()
        {
			_jeu.sonClickSouris.play();
			_jeu.scoreJoueur=0; 
			_jeu.state.start('Menu');//redemare le jeu 	
        }
        
    };
   
    return _gagner;  
})();

