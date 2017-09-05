var jouer2 = (function(){
	var _jeu;
	
    //===Variables======//
    
	var TabTuiles=new Array();//tableau qui va garder la reference de toute les tuiles crée
	var tuilesChoisie=new Array();//tableau qui des tuiles
	var choixJoueur=new Array();//tableau qui des tuiles
	var nbVie=new Array();//tableau qui des tuiles
	var _tuilePile;//face couverture
	var _tuileFace;//face objet
	var finJeu=false;
	var nbMaxBomb;//nombre de b0mbes
	var nbMaxBonus;//nombre de bonus max
	var nbMaxPieges;//nombre de piege max
	var tuileActuel= 'null';
	var tuilePrecedent= 'null';
	var minRange=0;
	var maxRange=9;
	var nbInicoeur=3;
	var cols=7;// (7 max) nombre de colonnes
	var rows=7;//(7 max)nombre de rangées	
	var nbclique=0;
    //----DEBOGAGE-----//
		//var cols=4;// (7 max) nombre de colonnes
		//var rows=2;//(7 max)nombre de rangées	
		//var _niveau1 = [ 2, 3, 2, 5];//
    //----FIN DEBOGAGE-----//
    	
    
	var _jouer2 = function(jeu)
    {
	   _jeu = jeu; //variable local reçoit objet jeu
        //console.log('constructeur');    
    };
    
//===========================================================================================//
    
	_jouer2.prototype = {
        //permet de faire le chargement de tout les elements necessaire a mon jeu
	
        create : function()
		{
			_jeu.sonJeu.stop();
			console.log("function create");
			_jeu.scoreJoueur=0;
			nbMaxPieges=Math.round(rows*cols* 0.15);//nombre maximun de pieges peut creer
			nbMaxBonus=Math.round(rows*cols* 0.05);//nombre maximun de bonus peut creer
			this.creerTableau();//appelle de la fonction pour creer le tableau
            _jeu.Gui= _jeu.add.sprite(800, 0, 'gui')
			_jeu.boutonMatch= _jeu.add.button(835, 530, 'boutonOff', this.valideMatch, this);//cree le bouton de match
            _jeu.relancer= _jeu.add.button(830, 680,'relancerJeu', this.redemareJeu, this);
            _jeu.time.events.add(300, function(){ this.flipface(choixJoueur)}, this);
            _jeu.butonMenu= _jeu.add.button(870, 735, 'boutonRetour', this.retourMenu, this);
            _jeu.boutonOption= _jeu.add.button(830, 630, 'option', this.menuPause, this);
			
			 //_jeu.sound.onSoundDecode.add(this.demarreMusique,this);
			_jeu.musique=_jeu.add.audio('bgMusique2',0.3);
			 _jeu.sonFlip=_jeu.add.audio('flip');
			 _jeu.noMatch=_jeu.add.audio('noMatch');
			 _jeu.sonClickSouris=_jeu.add.audio('clickSouris');
             _jeu.musique.play("",0,1,true);//joue en loop 
			 
			this.textChargement=_jeu.add.text(895, 415,_jeu.scoreJoueur,{font:"38px Arial",fill:'rgb(0,255,0)'});
			this.textChargement.anchor.set(0.5,0.5);
            
			//------creation des vie du Joueurs dans un tableau
			
			for(var i=0; i< nbInicoeur/3; i++)
			{   
				for(var j=0; j < nbInicoeur;j++)
				{
					nbVie.push(_jeu.add.sprite(j * 33  + 850, i* 33 + 70, 'coeur'));//cree les vie
				}
			}
			
			_jeu.boutonMatch.inputEnabled=false;//deactive 
        },
		
		
		//======Fonction qui va creer le tableau de jeu avec toutes les tuiles=====//
		
		creerTableau : function()
		{ 	
			console.log("function creerTableau");
			var piege=0;
			var bonus=0;
			//création des colonnes du tableau
			for(var i=0; i<cols; i++)
			{   //creation des rangées du tableau
				for(var j=0; j<rows;j++)
				{
					
					var nombre =_jeu.rnd.integerInRange(minRange,maxRange);//génére un nombre aleatoire
                    
                    //----- condition de création des pieges du jeu
						if((nombre==0)||(nombre==1))
						{
							piege++;
							if(piege > nbMaxPieges)
							{
								nombre+=1;//cree une autre tuile au lieu de la bombe
							}
						}
                    //----condition de creation des bonus du jeu
						if(nombre==4)
						{
							bonus++;
							if(bonus>nbMaxBonus)
							{
							  nombre+=1;// cree une autre tuile au lieu du bonus
							}	
						}

					//----CREATION D'UNE TUILE AVEC SES PARAMETTRES--------
        
					_tuileFace=_jeu.add.sprite(cols + 110 * i, rows + 110 * j,'objet'+nombre);//creation de l'objet1
                   var _idTuile = 'objet'+nombre;
                    
                    //-------DEBOGAGE------//
                        //_tuileFace=_jeu.add.sprite(cols + 110 * i, rows + 110 * j,'objet'+_niveau1[i], _niveau1[i]);//====debogage
                      // var _idTuile = 'objet'+_niveau1[i];
                    //-------FIN DEBOGAGE------//
					
                    tuile=_jeu.add.sprite(cols + 110 * i, rows + 110 * j,'bgTuile');
					 tuile.texture.renderable = false;//annule la visibilité de la texture. 
					_tuilePile=_jeu.add.sprite(cols + 110 * i, rows + 110 * j,'coverface');//crée la face arrière des tuiles
					tuile.idTuile=_idTuile;//cree une nouvelle proprieté a la tuile ppour faciliter son identification
					tuile.etatActif=true;
					tuile.faceFace=_tuileFace;//cree une nouvelle proprieté a la tuile pour facilité acces a cette face
					tuile.faceCouvert=_tuilePile;//cree une nouvelle proprieté a la tuile pour facilité acces a cette face
					tuile.inputEnabled=true;//active la detection d'input sur la face arriere des tuiles
					tuile.input.useHandCursor = true;//active la proprièté curser main 
			        tuile.events.onInputDown.add(this.flip, this);//appel de la fonction flip au click
                    TabTuiles.push(tuile);//garde la tuile dans le tableau de reference
					
					//console.log(TabTuiles);
				}
				
			}
		},
		
		update : function()
		{
			// actualisation et affichage du score Joueur
			
			if( _jeu.scoreJoueur< 0 ){
                _jeu.scoreJoueur=0;
            }
			this.textChargement.text=_jeu.scoreJoueur;	
				
			
			//-------------------CONDITIONS DE FIN DE JEU-perdant--------------------//

            //--cas ou il n'y a plus de vie--//
            if(nbVie.length<=0)
			{	
				this.perduJeu();
			}
            
            //--cas ou il y a une seul tuile restante--// 
            if((TabTuiles.length==1)&&(choixJoueur.length==1))
            {
                if((choixJoueur.idTuile!=='objet0')||(choixJoueur.idTuile!=='objet1')||(choixJoueur.idTuile!=='objet4'))
                {
                    finJeu=true;						
                }
            }
                         
			//----- a la fin du Jeu--------//
			if(finJeu==true)
                {
					_jeu.musique.stop();
					_jeu.time.events.add(700,this.perduJeu,this);
                    finJeu=false;
                }
              

			//-------------------CONDITIONS Gagnante--------------------//
			var _tuileDiponible= this.tuileDisponible(TabTuiles);
			if((nbVie.length>0) && (_tuileDiponible==0) && (_jeu.boutonMatch.inputEnabled==false))
			{	
				_jeu.textNoMatch.destroy();
				_jeu.noMatch.stop();
				_jeu.musique.stop();
				_jeu.time.events.add(700,this.gagnerJeu,this);
			}
			
		},
		
		
		//======fonction qui va simuler le flip des tuiles au clique/touche====//
		
		flip : function(sprite1,pointer)
		{
			sprite1.faceCouvert.visible = false;//desactive la cette face de la tuile
			sprite1.faceFace.visible = true;//active la visibilité du sprite
			_jeu.sonFlip.play();
			//recuper le choix dans un tableau
			nbclique++;
            tuilesChoisie.push(sprite1);    
			sprite1.inputEnabled=false;
			 
            //----cas ou la tuile choisie est une bombe
			if(sprite1.idTuile=='objet1')
			{
				sprite1.inputEnabled=false;
				this.explosion=_jeu.add.audio('explosion',0.5);
				this.explosion.play();
				var uneVie= nbVie.pop();//recuper la derniere vie du tableau de  vie 
				uneVie.kill();//retire une vie du joueur
				//sprite1.etatActif=false;
                 nbclique=0; //reinitialise le nombre de click
				 
				
                //remetir des point au joueur si celui-ci en a
                if(_jeu.scoreJoueur>=0)
                {
                    _jeu.scoreJoueur-=5;   
                }
                if(choixJoueur.length>0)
				{
					this.detruitTuile(choixJoueur);//detruit les elements collecter par le joueur	
                    
				}
                sprite1.faceCouvert.visible = false;//desactive la cette face de la tuile
               // sprite1.faceFace.visible = false;
			}

            //cas ou la tuile choisie est une tournade
            if (sprite1.idTuile == 'objet0') {
                //this.desactiveClick(),
                _jeu.time.events.add(300, function () {
                    sprite1.faceFace.tint = 0x4d0026;
                }, this.flipface(choixJoueur));

                sprite1.faceCouvert.visible = false; //desactive la face de la tuile
                sprite1.inputEnabled = false;

                this.melangerTuile(TabTuiles);

                nbclique = 0;
            }

			//----cas ou la tuile choisie est une Vie
            if(sprite1.idTuile=='objet4')
			{
				this.lifeUp=_jeu.add.audio('lifeUp',1);
				this.lifeUp.play();
				var posX= nbVie[nbVie.length-1].x;//recuper la position du dernier coeur
				var posY= nbVie[nbVie.length-1].y;//recuper la position du dernier coeur
                if(nbVie.length < 6)
				{
					nbVie.push(_jeu.add.sprite(posX + 33, posY, 'coeur'));
					//nbVie.push(_jeu.add.sprite(nbVie.length * 33+850, 70, 'coeur'));					
				}
                _jeu.time.events.add(700, function(){ sprite1.faceFace.tint= 0x4d0026;});
                sprite1.inputEnabled=false;
				//sprite1.etatActif=false;
                nbclique=1;
                //TabTuiles.length-=1;
				
			}
            
            //----Gestion des des evenement selon le clique
			 if (nbclique == 1) {
                if ((sprite1.idTuile !== 'objet1') && (sprite1.idTuile !== 'objet4') && (sprite1.idTuile !== 'objet0')) {
                    tuileActuel = tuilesChoisie.pop(); //garde la derniere tuile clique dans la variable tuile actuelle
                    choixJoueur.push(tuileActuel);
                }

            } else if (nbclique > 1) {

                if ((sprite1.idTuile !== 'objet1') && (sprite1.idTuile !== 'objet4') && (sprite1.idTuile !== 'objet0')) {    
				tuilePrecedent=tuileActuel;//derniere tuile devient la tuile acutelle
				tuileActuel=tuilesChoisie.pop();//garde la derniere tuile clique dans la variable tuile actuel
				}
                choixJoueur.push(tuileActuel);
                
				if(tuileActuel.idTuile!==tuilePrecedent.idTuile)
				{
					_jeu.time.events.add(300, function(){ this.flipface(choixJoueur)}, this);
					//peutTourner = true;
					_jeu.boutonMatch.loadTexture('boutonOff');
					_jeu.boutonMatch.inputEnabled=false;
					
					nbclique=0;

				}
				//compare les valeur des tuiles cliquée.
				else if(tuileActuel.idTuile==tuilePrecedent.idTuile)
				{
					_jeu.boutonMatch.loadTexture('boutonOn');//change la texture du bouton match pour actif
					_jeu.boutonMatch.inputEnabled=true;	
				}				
			}
		},
		
		
		//====fonction qui va permettre de confirmer le choix du joueur de faire le== match.==//
		
		valideMatch : function(monButon) 
		{
			 
			monButon.key="boutonOff";//change le nom
			monButon.loadTexture(monButon.key);//change la texture avec le nom
			
			for(var i=0; i<choixJoueur.length;i++)
			{
				//tuileFace.kill
				choixJoueur[i].faceFace.tint= 0x4d0026;
				choixJoueur[i].inputEnabled=false;
			}
			
            _jeu.scoreJoueur+=this.contatagePoint(choixJoueur);//compte les point du joeur
            choixJoueur=[];// vide le tableau de choix
			nbclique=0;//remet le click a zero
			
			_jeu.boutonMatch.inputEnabled=false;
			
			var match=_jeu.add.audio('match',1);//son du match
			match.play();
			
            //---------------TEST FIN--------------//
             var matchPossible= this.compareTuile(TabTuiles);
            
					if(matchPossible ==false)
					{
                       finJeu=false;
					} 
                    else
                    {
                        _jeu.musique.stop();
						_jeu.noMatch.play();
						_jeu.textNoMatch =_jeu.add.text(370,350,"PLUS DE COMBINAISONS POSSIBLE",{font:"36px Arial",fill:"#e69900"});
						_jeu.textNoMatch.alignIn(_jeu.world.bounds,Phaser.CENTER,-100,0);
						_jeu.textNoMatch.stroke = "#c4fcf5";
						_jeu.textNoMatch.strokeThickness = 4;
						_jeu.time.events.add(2000,function(){
							
							_jeu.input.mouse.enabled=false;
							finJeu=true;	
						});

                    }
            
            //---------------TEST FIN--------------//
            
		},
		
		
		//========function qui va simuler le flip des tuile==========//
		
		flipface : function(tab)
		{

			for(var i=0;i<tab.length;i++)
					{
						tab[i].faceCouvert.visible=true;
						tab[i].faceFace.visible=false;
						tab[i].inputEnabled=true;
						
					}
			choixJoueur=[];	// Vider le tableau des choix du joeur
		},
		
		
		//=======function qui va faire le contage des point========//
		
		contatagePoint :function(tab)
		{
            var pointsMatch=0;
			var pointage=2;
            var pointAnimal=0
			
			if(tuileActuel.idTuile == 'objet2')
			{
				pointAnimal=1;

			}
			 if(tuileActuel.idTuile == 'objet3')
			{
				pointAnimal=2;
				
			}
			 if(tuileActuel.idTuile == 'objet5')
			{
				pointAnimal=3;
				
			}
			 if(tuileActuel.idTuile == 'objet6')
			{
				pointAnimal=4;
				
			}
			 if(tuileActuel.idTuile == 'objet7')
			{
				pointAnimal=5;
				
			}
			 if(tuileActuel.idTuile == 'objet8')
			{
				pointAnimal=6;
				
			}
			 if(tuileActuel.idTuile == 'objet9')
			{
				pointAnimal=7;
				
			}
			 if(tuileActuel.idTuile == 'objet10')
			{
				pointAnimal=8;
				
			}
            
			pointsMatch = pointage + pointAnimal * (tab.length-2);
            
            return pointsMatch;
		},
		
		
		//========function qui va detruire les tuiles choisie=========//
		
		detruitTuile :function(tab)
		{
			for( var i= 0; i<tab.length; i++)
			{				
				
                tab[i].kill();
                tab[i].faceCouvert.visible=false;
                tab[i].faceFace.visible=false;
                tab[i].inputEnabled=false;
			//----animation explosion---//
                _jeu.explosion = _jeu.add.sprite(tab[i].x, tab[i].y, "explosion");//ajoute la feuille de sprite de explosion
                _jeu.explosion.scale.setTo(0.6, 0.8);
                _jeu.explosion.anchor.set(0.2,0);
                _jeu.explosion.animations.add("explosionBombe");//crée l' animation d'explosion
                _jeu.explosion.animations.play("explosionBombe",12,"false", "true");//joue l'animation et l'exclu à la fin de animation
			}
			
            choixJoueur=[];
			
            _jeu.boutonMatch.loadTexture('boutonOff');
			_jeu.boutonMatch.inputEnabled=false;	
			
		},

		//===function qui verifie s'il existe des tuiles pareilles dans l'air de jeu====//
		
		compareTuile: function(TabTuiles)
		{
			var _TabTuiles=TabTuiles;
			var cont=0;
            var i=0;
            var nouveauTableau = [];
            var bFin = true;
            var element="";
            for(var i=0;i <_TabTuiles.length;i++)
			{
                if(_TabTuiles[i].inputEnabled)  // Seul les éléments "actifs"
                {
                    if((_TabTuiles[i].idTuile!=="objet0")||(_TabTuiles[i].idTuile!=="objet1")||(_TabTuiles[i].idTuile!=="objet4"))
                    {   
                        element= _TabTuiles[i].idTuile;
                        if(nouveauTableau[element] == null)
                        {
                            nouveauTableau[element] = element;
                        }
                        else
                        {
                            bFin = false;   // Pas de condition de fin
                        }  
                   }
                }  
            }
                return bFin;
		},
		
         
		retourMenuOption : function()
		{
			_jeu.state.start('Options');   //redemare le jeu 	

		},
        
        //-------fonction pour verifier les tuiles encore disponible
        
		tuileDisponible : function(tab){
            var _TabTuiles=tab;
             var nb=0;
                for(var i=0; i<_TabTuiles.length; i++){
                if(_TabTuiles[i].inputEnabled)
                {	
                   nb++;
                }
             }
            return nb;
        },
		
		//------function met le jeu dans un état pause
		
		menuPause:function(){
			
			//deactive le click sur les tuiles
			this.desactiveClick (TabTuiles);
			
			//reactive le click des boutons
			_jeu.boutonMatch.inputEnabled = false;
			_jeu.butonMenu.inputEnabled = false;
			_jeu.relancer.inputEnabled = false;
			_jeu.boutonOption.inputEnabled=false;
			
            //Cree les elements du menuPause
			_jeu.menu =_jeu.add.sprite(800, 500, "bgOption");
			_jeu.menu.scale.setTo(0.8,0.8);
			_jeu.menu.anchor.setTo(1, 0.6);
			_jeu.boutonfermer = _jeu.add.sprite(640, 680, "sortir");
			_jeu.boutonfermer.inputEnabled = true;
			_jeu.boutonfermer.input.useHandCursor = true
			_jeu.boutonfermer.events.onInputDown.add(this.retourJeu,this);
			
            _jeu.sourdine = _jeu.add.sprite(330, 350,"cercleVolume");
			_jeu.sourdine.alignIn(_jeu.menu, Phaser.TOP_CENTER, 15, -200);
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
			_jeu.sonVolumeUp.alignTo(_jeu.sourdine, Phaser.BOTTOM_CENTER, 0, 90);
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
		
		//------function retire le jeu de état pause
		
		retourJeu:function(){
				
				//reactive le click sur les tuiles
				this.activeClick(TabTuiles);
				
				//reactive le click des boutons
				_jeu.boutonMatch.inputEnabled=true;
				_jeu.butonMenu.inputEnabled=true;
				_jeu.relancer.inputEnabled=true;
				_jeu.boutonOption.inputEnabled=true;
            
				//detruits les elements du menuPause
				_jeu.menu.destroy();
				_jeu.sourdine.destroy();
				_jeu.boutonfermer.destroy();
				_jeu.sonVolumeDown.destroy();
                _jeu.sonVolumeUp.destroy();
				_jeu.textSourdine.destroy();
				_jeu.textSourdine.destroy();
                _jeu.textVolumeUp.destroy();
				_jeu.textVolumeDown.destroy();
                
		},
		
		//--function retire evenement flip des tuiles en pause--
		
		desactiveClick : function (tab){
			 var _TabTuiles=tab;
			for(var i=0; i<_TabTuiles.length; i++){
			
				if(_TabTuiles[i].inputEnabled)
				{	
				   TabTuiles[i].events.onInputDown.remove(this.flip,this);
				}
			}
			
		},
		
		//--function reactive evenement flip des tuiles au sortir de la pose--//
		activeClick : function (tab){
			 var _TabTuiles=tab;
			for(var i=0; i<_TabTuiles.length; i++){
			
				if(_TabTuiles[i].inputEnabled)
				{	
				   TabTuiles[i].events.onInputDown.add(this.flip, this);
				}
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

        //------Funtion pour sortir du jeu vers le Menu
         retourMenu : function()
		{
			_jeu.musique.stop();
            _jeu.scoreJoueur=0;
            TabTuiles=[];//vide le tableau de tuile 
            nbVie=[];
            _jeu.state.start('Menu');//redemare le jeu 	
			
		},	
		
		//------Fonction pour muter le son
		//code adapté de ce lien https://gist.github.com/zackproser/1aa1ee41f326fc00dfb4
		
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
		
		
		//===function qui redemare le jeu====//
        
		redemareJeu : function()
		{	_jeu.sonClickSouris.play();
			_jeu.input.mouse.enabled=false;//déactive l, input de la souris pour ne plus permettre au joueur de pouvoir cliquer 
			_jeu.musique.stop();
			_jeu.time.events.add(2000, function(){ 
				TabTuiles=[];//vide le tableau de tuile 
				nbVie=[];
				choixJoueur=[];
			   _jeu.state.restart("Jouer2");   //redemare le jeu 	
				_jeu.scoreJoueur;
			   _jeu.input.mouse.enabled=true;//reactive l' input de la souris
			});
			finJeu=false;
		},
			
		//----function appeler dans la condition de jeu Gagner
		
		gagnerJeu:function(){
			TabTuiles=[];//vide le tableau de tuile 
				nbVie=[];
				choixJoueur=[];	
				_jeu.scoreJoueur;
			   _jeu.input.mouse.enabled=true;//reactive l' input de la souris
			   _jeu.state.start("Gagner");   //redemare le jeu 
		},
		
		//----function appeler dans la condition de jeu PERDU
		
		perduJeu:function(){
			TabTuiles=[];//vide le tableau de tuile 
				nbVie=[];
				choixJoueur=[];
			_jeu.musique.stop();
		   _jeu.scoreJoueur;
		   _jeu.state.start("Perdu");   //redemare le jeu 
		},
        
        //--- function permet de tirer un nombre aléatoire une seule fois et de melanger la face des tuiles actives
        
        melangerTuile: function (tab) {
            console.log("function MelangerTuile");
            var _tabFace = []; //garde les faces des elements actives
            var sortedNum = []; //garde les nombres deja tirés
            var randNum;
            var tempTuile;
            var index = tab.length - 1;
            var i = index;

            while (i > 0) {
                randNum = Math.floor((Math.random() * index) + 0);
                if (sortedNum.indexOf(randNum) < 0) {
                    sortedNum.push(randNum);

                    if (tab[randNum].inputEnabled) {
                        _tabFace.push(tab[randNum].idTuile);
                    }
                    i--;
                }

            }

            this.dessineCard(TabTuiles, _tabFace);

        },
        
        //-----function redessine les tuiles du tableau passée en paramettre et du tableau des faces passés en paramettre
        
        dessineCard: function (tab, tabFace) {
            var j = 0; //variable iteration dans le tableau des images
            
            for (i = 0; i < tab.length; i++) {

                if (tab[i].inputEnabled && tabFace[j] != null) {
                    //console.log(" Objet " + i + ", Key: " + tab[i].faceFace.key + " idface: " + tab[i].idTuile);//debocage
                    var face = tabFace[j];
                    tab[i].faceFace.loadTexture(face);
                    tab[i].idTuile = face;
                    j++;
                }
            }
            return tab;
        }
	
	};
    return _jouer2;
})();

