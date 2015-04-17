/***************************
****test serial planning****
****************************/


QUnit.test( "ajoutEvnmt", function( assert ) {
	var cont = controlleur();
	cont.planning = new Planning("journalier");
	cont.mode =="ajout";
	cont.form.col = new Colonne;
	cont.form.col.setPage(cont.planning.addPage());
	cont.formEvmt={
		titre:"titre",
		description:"desc",
		categorie:"cat",
		nbCol:1,	
	}
	cont.validationFormulaireEvenement();
	var evnmt = cont.form.col.getTaches()[0]
	assert.equal(evnmt.getNom() ,"titre"  );
	assert.equal(evnmt.getCategorie(),"cat" );
	assert.equal(evnmt.getTabEvenementAutreCol().length, 0);
});

QUnit.test( "testSupprimer", function( assert ) {
	var cont = controlleur();
	cont.form.evnmt= new EvenementClassique;
	var col = new Colonne;
	col.setPage(new Page)
	cont.form.evnmt.setColonne(col);
	cont.suppEvmt()
	assert.equal(cont.poubelle.length, 1);
})

QUnit.test( "copierColler", function( assert ) {
	var cont = controlleur();
	cont.formEvmt= {
		titre : "un titre",
		description: "uneDesc",
		nbCol:5
	}
	cont.copierEvenement();
	cont.formEvmt.nbCol=9999999;
	cont.collerEvenement();
	assert.equal(cont.formEvmt.nbCol, 5);
	assert.equal(cont.formEvmt.description, "uneDesc");
	assert.equal(cont.formEvmt.titre, "un titre");
})
QUnit.test( "afficherAjouterEvenement", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("journalier")
	cont.afficherAjouterEvenement(new Colonne(),8);
	var $ = cont;
	assert.equal ($.titreCat.val , $.planning.getCategories()[0].getNom());
	assert.equal($.formEvmt.heureDeb, 8)
	assert.equal($.formEvmt.minuteDeb,0);
	assert.equal($.formEvmt.heureFin,9);
	assert.equal($.formEvmt.minuteFin,0);
	assert.equal($.mode,"ajout");
})

