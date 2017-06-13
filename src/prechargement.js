var prechargement = (function(){
    var _jeu;
    var _prechargement = function(jeu){
        _jeu = jeu;
    };
    
    _prechargement.prototype = {
        preload: function(){
            console.log('prechargement debut');
            _jeu.load.image('ecran_demarrage', './assets/GUI-ELEMENTS-GameOver.png');    
            _jeu.load.image('barre_chargement', './assets/chargement.png'); 
			_jeu.load.audio('musiqueJeu', './sons/musiqueDeFond_1.mp3');
				
        },
        create : function(){
            console.log('prechargement fin');
            
            _jeu.state.start('Chargement');
        }
    };
    
    return _prechargement;
})();