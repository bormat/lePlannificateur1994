		/*******************************/
		/********Afficher formulaire****/
		/*******************************/
function gererEvenmt($){
		$.validationFormulaireEvenement= function(){
			var evnmt = ($.mode =="ajout") ? new EvenementClassique() : $.form.evnmt ;
			if ($.planning.testDepassementNombreColonnes($.form.col, $.formEvmt.nbCol)) {
					alert("Impossible de modifier l'évènement : débordement de la page");
					return false;
			}
			evnmt.initialize($.formEvmt.titre, $.formEvmt.description, new Periode($.formEvmt), $.formEvmt.categorie, $.formEvmt.nbCol);
			if($.mode =="ajout"){
				$.form.col.ajouterEvenement(evnmt)
			}
			evnmt.setNbEvenementSecondaire($.formEvmt.nbCol)
			$.fenetreEditEvnt.afficher(!$.form.fermer);
			return true;
		}
				
		$.suppEvmt=function(){
			$.poubelle.push($.form.evnmt);
			$.form.evnmt.supprimer();
		}
		
		$.copierEvenement=function() {
			var f = $.formEvmt;
			$.evenementCopie={};
			for (i in $.formEvmt){
				$.evenementCopie[i] = $.formEvmt[i];
			}			
			$.fenetreEditEvnt.afficher(false);
		}
		
		$.collerEvenement=function() {
			for (i in $.formEvmt){
				$.formEvmt[i] = $.evenementCopie[i];
			}
		}
		
		function viderInput(){
			$.formEvmt.titre="";
			$.formEvmt.description="";
		}
		$.afficherAjouterEvenement=function(col,ligneDeb){
			$.formEvmt.categorie = $.planning.getCategories()[0];
			$.form.col=col;
			$.fenetreEditEvnt.afficher(true);
			viderInput();
			$.mode="ajout";
			$.titreCat.val = $.planning.getCategories()[0].getNom();
			$.formEvmt.nbCol = 1;
			initHeureEvmt(ligneDeb,ligneDeb+1);	
		}
		
		$.afficherModifierEvenement=function(evmt,col){
			$.formEvmt.categorie = evmt.getCategorie();
			$.form.col=col;	
			$.fenetreEditEvnt.afficher(true);	
			$.mode="modif";
			$.titreCat.val = $.formEvmt.categorie.getNom();
			var p = evmt.getPeriode();
			var hDeb = p.getHeureDebut();
			var hFin = p.getHeureFin();
			var mDeb = p.getMinuteDebut();
			var mFin = p.getMinuteFin();
			initHeureEvmt(hDeb,hFin,mDeb,mFin);
			$.formEvmt.titre=evmt.getNom();
			$.formEvmt.description=evmt.getDescription();
			$.form.evnmt=evmt;
		}
		
		var initHeureEvmt=function(hDeb,hFin,mDeb,mFin){
			$.formEvmt.heureDeb=hDeb || 8;
			$.formEvmt.minuteDeb=mDeb || 0;
			$.formEvmt.heureFin=hFin || 9;
			$.formEvmt.minuteFin=mFin || 0;
		}
}