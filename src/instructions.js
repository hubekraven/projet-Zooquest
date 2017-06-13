var instructions = (function(){
	var _jeu;
    var _instruction = function(jeu){
        _jeu = jeu;
    };
    
    _instruction.prototype = {
        create : function(){
            
            _jeu.add.sprite(0,0, "bgInstruction");
            var boutonRetour = _jeu.add.button(870, 700, "boutonRetour", this.retourMenu);
        },
        
         retourMenu : function()
        {
            _jeu.sonJeu.stop();
			console.log('Menu');
            _jeu.state.start('Menu');
        }
        
    };
   
    return _instruction;  
})();

