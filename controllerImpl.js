var publicAccessToScope = publicAccessToScope || {};
function controlleur ($scope){
		var $=$scope || {};//pour les tests 
		$.form={fermer:true};//contient col derniere colonne cliqué, heureDeb, minuteDeb, heureFin, minuteFin
		$.mode="ajout";
		$.formEvmt = {categorie:""};
		$.formCol = {};
		$.formPerso={classCss:"cell"};
		
		$.poubelle= new Tab;
		$.annuler=function(){
			$.poubelle.length && $.poubelle.pop().undo();
			$.planning.repartirColonnes();
		}
		
		$.tabFen=[];
		var creerFen = function(){
			for (var i in arguments){
				var fenName = arguments[i];
				var ind = $.tabFen.push($[fenName] = new Fenetre (false)) - 1;
				$.tabFen[ind].setName(fenName)
			}
		}
		
		//l'ordre compte
		creerFen("accueilVisible","grillePlanning","fenetreEditEvnt","fenetreAjoutColonne","fenetreModifHoraire",
			"fenCategorie","fenetreModifSupprColonne","fenImport","fenetreAjoutCategorie","fenExport","fenPolice");
		$.accueilVisible.afficher();
		$.grillePlanning.anime();
		$.ligne=[8,9,10,11,12,13,14,15,16];
		$.horaire = {heureDeb:8, heureFin:17, minDeb:0,minFin:0};
		$.evenementCopie = undefined;
		$.changerPoliceEcriture = new Fenetre (false);
		

		$.titreCat={val:""};
		$.couleurCat={val:""};
		
		$.afficherAccueil = function(afficher){
				$.grillePlanning.afficher(!afficher);
		}

						
		$.modifHeure = function(){
			if ($.horaire.heureDeb >= $.horaire.heureFin) {
				alert('Veuillez saisir un créneau horaire valide.');
			}else{
				$.planning.getHoraire().initialize($.horaire);
				$.ligne = [];
				for (var h = $.horaire.heureDeb ; h < $.horaire.heureFin; h++) {
				  $.ligne.push(h);
				}
				$.fenetreModifHoraire.afficher(false);
			}
		}
		
		gererEvenmt($);
		gestionColonne($)
		gererCategorie($)
		gererPlanning($)
		gererPolice($)   
		
    
	$.setLigne1Hauteur=function(){
		$.planning.setHauteurLigne1($.accessToResizableElmt.offsetHeight);
	}
	
	$.tacheRedim=function(tache){
		var uneHeureEnpx = $$(".cellHoraire")[0].offsetHeight;
		var htrTacEnPx = $.accessToResizableElmt.offsetHeight;
		var ratioTacheHeure = htrTacEnPx / uneHeureEnpx;
		tache.getPeriode().setIntervalle(parseInt(ratioTacheHeure * 60));	
	}
    		
	
	void function glisserDeposer(){
			var tacheQuiBouge,colonneDepart;
			$.glisser=function(tache,salDep){
				colonneDepart=salDep;
				tacheQuiBouge=tache;		
			}
			$.deposer=function(colonneFinal,lig){
				var per=tacheQuiBouge.getPeriode();
				if (!$.planning.testDepassementNombreColonnes(colonneFinal, tacheQuiBouge.getNbCol())) {
					per.decallerA({heure:lig});
					colonneFinal.ajouterEvenement(tacheQuiBouge);
					colonneDepart.supprimerEvenement(tacheQuiBouge);	
				}
			}
	}()

	
	$.serializePlanning = function(){		
		$.export = serializeObjet($.planning);
		$.fenExport.afficher(true);
		return $.export;
	}
	
	$.parsePlanning = function(chaine){
		$.planning = parseChaine($.form.import);
		$.modifHeure();
		$.fenImport.afficher(false);
	}
	
	$.actualiser = function(){
		$.planning = parseChaine(serializeObjet($.planning));
		$.planning.repartirColonnes();
	}
	
	if(window.hasOwnProperty("pasUnTest")){
		$.message = function (m){
			alert(m)
		}
	}else{
		$.message = function (m){
			throw m;
		}	
	}
	return $;	
}

