var perdu = (function(){
	var _jeu;
    var _perdu = function(jeu){
        _jeu = jeu;
    };
    
    _perdu.prototype = {
        create : function(){
			//reabilite input du mouse;
            _jeu.input.mouse.enabled=true;
			
			_jeu.sonClickSouris=_jeu.add.audio('clickSouris');
			_jeu.GameOver=_jeu.add.audio('gameOver',1);
			_jeu.GameOver.play();
			
            _jeu.ecranGanant=_jeu.add.sprite(0,0, "ecranPerdant");
			
			_jeu.textPerdu=_jeu.add.text(0, 0,"VOUS AVEZ PERDU ",{font:"38px Arial",fill:'#ff0000'});
			_jeu.textPerdu.alignIn(_jeu.ecranGanant,Phaser.CENTER,0,-100);
			_jeu.textPerdu.setShadow(2, 2, "#333333", 2, false, true);
			
			_jeu.textPerdu2=_jeu.add.text(0, 0,"VOTRE SCORE POUR CE NIVEAU:",{font:"38px Arial",fill:'#ff0000'});
			_jeu.textPerdu2.alignIn(_jeu.textPerdu,Phaser.CENTER,0,60);
			_jeu.textPerdu2.setShadow(2, 4, "#333333", 2, false, true);
			
			_jeu.textScore=_jeu.add.text(0, 0,_jeu.scoreJoueur,{font:"64px Arial",fill:'#ffffff'});
			_jeu.textScore.alignIn(_jeu.textPerdu,Phaser.CENTER,0,160);
			_jeu.textScore.setShadow(2, 4, "#333333", 2, false, true);
			
			
			_jeu.textRejoueur=_jeu.add.text(0, 0,"REJOUER",{font:"38px Arial",fill:'#ffff00'});
			_jeu.textRejoueur.alignIn(_jeu.ecranGanant,Phaser.CENTER,0,200);
			_jeu.textRejoueur.stroke = "#de77ae";
			_jeu.textRejoueur.strokeThickness = 12;
			_jeu.textRejoueur.setShadow(2, 2, "#333333", 2, true, true);
			_jeu.textRejoueur.inputEnabled = true;//active la detection d'input sur la face arriere des tuiles
			_jeu.textRejoueur.input.useHandCursor = true;//active la proprièté curser main 
			_jeu.textRejoueur.events.onInputDown.add(this.rejouerNiveau, this);//appel de la fonction flip au click
			
			_jeu.textSortir=_jeu.add.text(0, 0,"SORTIR",{font:"38px Arial",fill:'#ffff00'});
			_jeu.textSortir.alignIn(_jeu.ecranGanant,Phaser.CENTER,0,250);
			_jeu.textSortir.stroke = "#de77ae";
			_jeu.textSortir.strokeThickness = 12;
			_jeu.textSortir.setShadow(2, 2, "#333333", 2, true, true);
			_jeu.textSortir.inputEnabled = true;//active la detection d'input sur la face arriere des tuiles
			_jeu.textSortir.input.useHandCursor = true;//active la proprièté curser main 
			_jeu.textSortir.events.onInputDown.add(this.sortir, this);//appel de la fonction flip au click
			
			
			
        },
        
        rejouerNiveau : function()
        { 	
			_jeu.sonClickSouris.play();
			_jeu.scoreJoueur=0;
			_jeu.state.start('Jouer');//redemare le jeu 	
        },
		
		sortir : function()
        {
			_jeu.sonClickSouris.play();
			_jeu.scoreJoueur=0; 
			_jeu.state.start('Menu');//redemare le jeu 	
        }
        
    };
   
    return _perdu;  
})();

