function gererCategorie($){
	$.formCat = {nom : "defaut" , couleur:"black"}
	$.focusCouleur=function(categorie){
		$.formEvmt.categorie = categorie;
		$.formCat.nom = $.formEvmt.categorie.getNom();
	}	
	$.modifierCategorie=function(){
		var cat = ($.formEvmt.categorie != $.planning.getCategories()[0]) ? $.formEvmt.categorie : $.planning.getCategories()[1];
		var nbSim = $.planning.nbCategoriesSimilaires($.formCat.couleur,$.formCat.nom)
		if (cat.getNom() != $.formCat.nom && cat.getCouleur() != $.formCat.couleur){
			nbSim++;
		}
		if(nbSim > 1 ){
				$.message("Catégorie déjà existante");
		}else{
			cat.setNom($.formCat.nom);
			cat.setCouleur($.formCat.couleur);
		}
	}
	
	$.supprimerCategorie=function(){
		$.planning.supprimerCategorie($.formEvmt.categorie);
		$.formEvmt.categorie = '';
		$.formCat.nom = '';
	}
	$.ajoutCategorie=function(){
		if($.planning.nbCategoriesSimilaires($.formCat.couleur,$.formCat.nom) > 0) {
			$.message("nom de catégorie ou couleur déjà existante");
		} else {
			$.planning.ajouterCategories($.formCat.couleur,$.formCat.nom);
			$.fenetreAjoutCategorie.afficher(false);
			$.fenCategorie.afficher(true);
		}		
	}
	
	$.afficherAjouterCategorie=function() {
		if ($.planning.getCategories().length >= 10) {
				alert("Vous ne pouvez ajouter que 10 catégories");
				return false;
		}
		$.fenCategorie.afficher(false);
		$.fenetreAjoutCategorie.afficher(true);
		$.formCat.nom ="";
		$.formCat.couleur = "#000000";
	}
	
	$.afficherModifierCategorie=function() {
		$.fenCategorie.afficher(true);
		$.formCat.nom ="";
		var cat = $.planning.getCategories()[1];
		$.formCat.couleur = cat.getCouleur();
		$.formEvmt.categorie = cat;
	}
	
	$.retourModifierCategorie = function() {
		$.fenCategorie.afficher(true); 
		$.fenetreAjoutCategorie.afficher(false);
		$.formEvmt.categorie = '';
	}
	
	$.getCategoriesUtilises = function() {
		var resListeCat = [];
		var pages = $.planning.getTabPage();
		pages.forEach (function(page) {
			var colonnes = page.getColonnes();
			colonnes.forEach (function(colonne) {
				var taches = colonne.getTaches();
				taches.forEach (function(evnmt) {
					if(evnmt instanceof EvenementClassique) {
						var cat = evnmt.getCategorie();				
						if(resListeCat.indexOf(cat) == -1 && cat != $.planning._categories[0]){
							resListeCat.push(cat);
						}
					}
				});
			});
		});
		return resListeCat;
	}
}