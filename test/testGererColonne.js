/*****************************
****test  GererColonne*****
******************************/
QUnit.test( "GererColonne", function( assert ) {
	var cont = controlleur();
	//afficherModifierColonne
	assert.equal(  cont.fenetreAjoutColonne.isAfficher(), false);
	//ajoutColonne
	cont.creerPlanning("journalier");
	var colonneTest = new Colonne("salle Rubis",10);
	cont.planning.ajoutColonne(colonneTest);
	assert.equal(  cont.planning.getColonnes()[0].getTitre(), "salle Rubis");
	//supprColonne
	cont.form.col=cont.planning.getColonnes()[0];
	cont.supprColonne();
	assert.equal(cont.poubelle.length,1);
	
	});