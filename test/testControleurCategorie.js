/***************************
****test serial planning****
****************************/


QUnit.test( "testModifierCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	var cat = new Categorie("blue","azerty");
	cont.formCat.nom = cat.getNom();
	cont.formCat.couleur = cat.getCouleur();
	cont.ajoutCategorie();
	var res = cont.planning._categories.length;
	cont.formEvmt.categorie = cat;
	cont.formCat.nom = "azerty";
	cont.modifierCategorie();
	
	assert.equal( cont.planning._categories[res-1].getNom(), "azerty");
});


QUnit.test( "testSupprimerCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	var res = cont.planning._categories.length;
	cont.formEvmt.categorie = cont.planning._categories[0];
	cont.supprimerCategorie();
	
	assert.equal( cont.planning._categories.length, res-1);
});

QUnit.test( "testAjoutCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	var res = cont.planning._categories.length;
	cont.formCat.nom = "Test";
	cont.formCat.couleur = "rgb(255,255,255)";
	cont.ajoutCategorie();
	
	assert.equal( cont.planning._categories.length, res+1);
	assert.equal( cont.planning._categories[res].getNom(), "Test");
	assert.equal( cont.planning._categories[res].getCouleur(), "rgb(255,255,255)");
});

QUnit.test( "testAjoutCategorieException", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	var res = cont.planning._categories.length;
	cont.formCat.nom = "Test";
	cont.formCat.couleur = "green";
	assert.throws(
		function() {
		  cont.ajoutCategorie();
		},
		"catégorie en double"
	);
});


QUnit.test( "testAfficherAjouterCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	cont.afficherAjouterCategorie();
	
	assert.equal( cont.fenCategorie._visible, false);
	assert.equal( cont.fenetreAjoutCategorie._visible, true);
	assert.equal( cont.formCat.nom, "");
	assert.equal( cont.formCat.couleur, "#000000");
});

QUnit.test( "testAfficherModifierCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	cont.afficherModifierCategorie();
	assert.equal( cont.fenCategorie._visible, true);
	assert.equal( cont.formCat.nom, "");
	assert.equal( cont.formCat.couleur, cont.planning.getCategories()[1].getCouleur());
});

QUnit.test( "testRetourModifierCategorie", function( assert ) {
	var cont = controlleur();
	cont.creerPlanning("hebdomadaire");
	cont.retourModifierCategorie();
	
	assert.equal( cont.fenCategorie._visible, true);
	assert.equal( cont.fenetreAjoutCategorie._visible, false);
	assert.equal( cont.formEvmt.categorie, "");
});

QUnit.test( "testGetCategoriesUtilises", function( assert ) {
	var cont = controlleur();
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	cont.creerPlanning("hebdomadaire");
	cont.formEvmt.titre = "titre";
	cont.formEvmt.description = "description";
	cont.formEvmt = periodeTest;
	cont.formEvmt.categorie = cont.planning._categories[1];
	cont.formEvmt.nbCol = 1;
	cont.form.col = cont.planning._page[0]._colonnes[0];
	var eve = new EvenementClassique ("titre","description",periodeTest,cont.planning._categories[1], 1);
	cont.validationFormulaireEvenement();
	var tab = cont.getCategoriesUtilises();
	
	assert.equal( tab.length, 1);
	assert.equal( tab[0], eve.getCategorie());
});


