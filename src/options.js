var options = (function(){
	var _jeu;
    var _options = function(jeu){
        _jeu = jeu;
    };
    
    _options.prototype = {
        create : function(){
            
            _jeu.bgOption=_jeu.add.sprite(0,0, "bgOption");
			 var boutonMenu = _jeu.add.button(870, 700, "boutonRetour", this.retourMenu);
			 
			 _jeu.sonClickSouris=_jeu.add.audio('clickSouris');
			 
			 //creation des boutons Texte et leur texte
			_jeu.sourdine = _jeu.add.sprite(330, 350,"cercleVolume");
			_jeu.sourdine.alignIn(_jeu.bgOption, Phaser.TOP_CENTER, 15, -250);
            _jeu.sourdine.scale.setTo(0.5,0.5);
			_jeu.sourdine.tint = 16777215;
			_jeu.textSourdine =_jeu.add.text(370,350,"OFF",{font:"24px Arial",fill:"#e69900"}); 
			_jeu.textSourdine.setShadow(1, 1, "#333333", 2, false, true);
			_jeu.textSourdine.alignTo(_jeu.sourdine,Phaser.RIGHT_CENTER,10,0);			
			_jeu.sourdine.inputEnabled = true;//active la detection d'input sur la face arriere des tuiles
			_jeu.sourdine.input.useHandCursor = true;//active la proprièté curser main 
			_jeu.sourdine.events.onInputDown.add(this.muteSon, this);//appel de la fonction flip au click
			 
			_jeu.sonVolumeUp = _jeu.add.sprite(0, 0,"boutonVolume");
            _jeu.sonVolumeUp.anchor.setTo(0.5,0.5);
			_jeu.sonVolumeUp.alignTo(_jeu.sourdine, Phaser.BOTTOM_CENTER, 0, 120);
            _jeu.sonVolumeUp.angle=180;
            _jeu.sonVolumeUp.inputEnabled = true;
			_jeu.sonVolumeUp.useHandCursor = true;//active la proprièté curser main 
			_jeu.sonVolumeUp.events.onInputDown.add(this.controleVolume,this);
            _jeu.textVolumeUp =_jeu.add.text(300,350,"+",{font:"38px Arial",fill:"#e69900"}); 
			_jeu.textVolumeUp.setShadow(1, 1, "#333333", 2, false, true);			
            _jeu.textVolumeUp.alignTo(_jeu.sonVolumeUp, Phaser.TOP_CENTER, 0, -15);
           
            _jeu.sonVolumeDown = _jeu.add.sprite(0, 0,"boutonVolume");
			_jeu.sonVolumeDown.alignTo(_jeu.sonVolumeUp, Phaser.BOTTOM_CENTER,15,40 );
			_jeu.sonVolumeDown.anchor.setTo(0.5,0.5);
            _jeu.sonVolumeDown.inputEnabled = true;
			_jeu.sonVolumeDown.useHandCursor = true;//active la proprièté curser main 
			_jeu.sonVolumeDown.events.onInputDown.add(this.controleVolume,this);
			_jeu.textVolumeDown = _jeu.add.text(300,420,"-",{font:"38px Arial",fill:"#e69900"})
            _jeu.textVolumeDown.setShadow(1, 1, "#333333", 2, false, true);
			_jeu.textVolumeDown.alignTo(_jeu.sonVolumeDown, Phaser.BOTTOM_CENTER,0,-15 );
		},
        
         
		 
		//code tirée de ce lien https://gist.github.com/zackproser/1aa1ee41f326fc00dfb4
		muteSon:function(){
					_jeu.sonClickSouris.play();
				if (!_jeu.sound.mute) {
					_jeu.sound.mute = true;
					_jeu.sourdine.tint = 0x4d0026;
					
					_jeu.textSourdine.text=("ON");
				} else {
					_jeu.sound.mute = false;
					_jeu.sourdine.tint = 16777215;
					_jeu.textSourdine.text=("OFF");
				}
			},	
		
      //------fonction pour le controle du volume
		
        controleVolume:function(controle){
				
				_jeu.sonClickSouris.play();
            
			if(controle==_jeu.sonVolumeUp){
				_jeu.sound.volume+=0.1;
            }
            else if(controle==_jeu.sonVolumeDown){
                
                _jeu.sound.volume-=0.1;
            }
        },

		 retourMenu : function()
        {
            _jeu.sonJeu.stop();
            _jeu.state.start('Menu');
        }
        
    };
   
    return _options;  
})();

