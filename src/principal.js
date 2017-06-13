//IIFE - Immediatly invoke function expression

var jeu = (function(){
	var _jeu = new Phaser.Game(1000, 800, Phaser.Auto, 'jeu');//cree un nouveau jeu avec frame de 1000x800, type d'affichage automatique et de non jeu 
    _jeu.state.add("Prechargement", prechargement);
    _jeu.state.add("Chargement", chargement);
    _jeu.state.add("Menu", menu);
    _jeu.state.add("Gagner", gagner);
	_jeu.state.add("Perdu", perdu);
	_jeu.state.add("Jouer", jouer);
	_jeu.state.add("Jouer2", jouer2);
    _jeu.state.add("Instructions", instructions);
	_jeu.state.add("Options", options);
    _jeu.state.start("Prechargement");
    //_jeu.state.start("Jouer");//debug
    return _jeu;
})();
