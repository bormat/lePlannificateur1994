/***************************
****test classe planning****
****************************/


QUnit.test( "testPlanningGetMode", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getMode(), "journalier", "Passed!" );
});

QUnit.test( "testPlanningSetMode", function( assert ) {
	var planningTest = new Planning("journalier");
	planningTest.setMode("hebdomadaire");
	assert.equal(  planningTest.getMode(), "hebdomadaire", "Passed!" );
});

QUnit.test( "testPlanningGetCategories", function( assert ) {
	var planningTest = new Planning("journalier");
	planningTest.ajouterCategories("#ccb800","Default");
	planningTest.ajouterCategories("red","sport");
	planningTest.ajouterCategories("orange","foot");
	planningTest.ajouterCategories("white","sieste");
			
	assert.equal(  planningTest.getCategories().length, 4, "Passed!" );
	assert.equal( planningTest._categories, planningTest.getCategories(), "Passed");
});

QUnit.test( "testPlanningSetCategories", function( assert ) {
	var planningTest = new Planning("journalier");
	var tabCat2=[];
	tabCat2.push(new Categorie("orange","foot"));
	tabCat2.push(new Categorie("white","sieste"));
	tabCat2.push(new Categorie("#ccb800","Default"));
	tabCat2.push(new Categorie("red","sport"));
	planningTest.setCategories(tabCat2);
	assert.equal(  planningTest.getCategories().length, 4, "Passed!" );
	assert.equal( planningTest.getCategories(), tabCat2 , "Passed");
});

QUnit.test( "testPlanningGetLargeurMax", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getLargeurMax(), 100, "Passed!" );
});

QUnit.test( "testPlanningSetLargeurMax", function( assert ) {
	var planningTest = new Planning("journalier");
	planningTest.setLargeurMax(666);
	assert.equal(  planningTest.getLargeurMax(), 666, "Passed!" );
});

QUnit.test( "testPlanningGetHauteurLigne1", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getHauteurLigne1(), 50, "Passed!" );
});

QUnit.test( "testPlanningSetHauteurLigne1", function( assert ) {
	var planningTest = new Planning("journalier");
	planningTest.setHauteurLigne1(666);
	assert.equal(  planningTest.getHauteurLigne1(), 666, "Passed!" );
});

QUnit.test( "testPlanningGetNbCelluleHauteur", function( assert ) {
	var planningTest = new Planning("journalier");
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 10,
		minuteFin: 30});
	planningTest.setHoraire(periodeTest);
	assert.equal(  planningTest.getNbCelluleHauteur(), 3, "Passed!" );
});

QUnit.test( "testPlanningGetColonneHoraire", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getColonneHoraire().getLargeur(), 16.66, "Passed!" );
});

QUnit.test( "testPlanningSetColonneHoraire", function( assert ) {
	var planningTest = new Planning("journalier");
	var colonneHoraire = new ElementGraphique(20);
	planningTest.setColonneHoraire(colonneHoraire);
	assert.equal(  planningTest.getColonneHoraire().getLargeur(), 20, "Passed!" );
});

QUnit.test( "testPlanningAddPage", function( assert ) {
	var planningTest = new Planning("journalier");
	var pageTest = new Page();
	planningTest.addPage(pageTest);
	assert.equal(  planningTest.getPages().length, 1, "Passed!" );
});

QUnit.test( "testPlanningOptimerLargeurColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	var colonneTest = new Colonne("salle Rubis",10);
	planningTest.ajoutColonne(colonneTest);
	planningTest.optimiserLargeurColonnes();
	assert.equal( planningTest.getColonnes()[0].getLargeur(), 83.34, "Passed!" );
});

QUnit.test( "testPlanningGetPage", function( assert ) {
	var planningTest = new Planning("journalier");
	var pageTestNumeroUn = new Page();
	var pageTestNumeroDeux = new Page();
	var colonneTest = new Colonne();
	pageTestNumeroDeux.ajoutColonne(colonneTest);
	planningTest.addPage(pageTestNumeroUn);
	planningTest.addPage(pageTestNumeroDeux);
	
	
	assert.equal(  planningTest.getPage(0),pageTestNumeroUn, "Passed!" );
	assert.equal(  planningTest.getPage(1), pageTestNumeroDeux, "Passed!" );
});

QUnit.test( "testPlanningAjoutColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	
	assert.equal(  planningTest.getColonnes()[0].getTitre(), "salle Rubis"
	, "Passed!" );
	assert.equal(  planningTest.getColonnes()[0].getLargeur(), 16.66
	, "Passed!" );
	
});

QUnit.test( "testPlanningSupprimerColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	planningTest.supprimerColonne(colonneTest);
	
	assert.equal(  planningTest.getColonnes().indexOf(colonneTest), -1, "Passed!" );
	
});

QUnit.test( "testPlanningGetColonnes", function( assert ) {
	var planningTest = new Planning("journalier");
	var colonneTest = new Colonne("salle Rubis",10);
	planningTest.ajoutColonne(colonneTest);
	assert.equal(  planningTest.getColonnes(0).length, 1, "Passed!" );
});

QUnit.test( "testPlanningRepartirColonnes", function( assert ) {
	var planningTest = new Planning("journalier");
	var pageTestNumeroUn = new Page();
	var pageTestNumeroDeux = new Page();
	var colonneTest = new Colonne();
	planningTest.addPage(pageTestNumeroUn);
	planningTest.addPage(pageTestNumeroDeux);
	pageTestNumeroDeux.ajoutColonne(colonneTest);
	planningTest.repartirColonnes();
	assert.equal(  planningTest.getPage(0).getColonnes().length,1, "Passed!" );
	assert.equal(  planningTest.getPage(1), undefined, "Passed!" );
});

QUnit.test( "testPlanningEstCategorieExistante", function( assert ) {
	var planningTest = new Planning("journalier");
	var tabCat2=[];
	tabCat2.push(new Categorie("orange","foot"));
	tabCat2.push(new Categorie("white","sieste"));
	tabCat2.push(new Categorie("#ccb800","Default"));
	tabCat2.push(new Categorie("red","sport"));
	planningTest.setCategories(tabCat2);
	
	assert.equal(  planningTest.nbCategoriesSimilaires("red","sport"),1, "Passed!" );
	assert.equal(  planningTest.nbCategoriesSimilaires("green","sport"),1, "Passed!" );
});

QUnit.test( "testPlanningTestDepassementColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,"Informatique",4);

	var col = new Colonne("blabla");
	var col2 = new Colonne("col2");
	var col3 = new Colonne ("col3");
	col.ajouterEvenement(evmt);
	var planning = new Planning();
	var page = new Page();
	page.ajoutColonne(col);
	page.ajoutColonne(col2);
	page.ajoutColonne(col3);
	planningTest._page.push(page);
	
	assert.equal(  planningTest.testDepassementNombreColonnes(col,evmt.getNbCol()), true, "Passed!" );
});


QUnit.test( "testPlanningAjouterCategories", function( assert ) {

	var planningTest = new Planning("journalier");
	planningTest.ajouterCategories("jaune","Informatique");
	var cat = planningTest.getCategories();
	assert.equal( cat.length,1,"Passed!");
	
});




QUnit.test( "testPlanningSupprimerCategories", function( assert ) {
	var planningTest = new Planning("journalier");
	planningTest.ajouterCategories("jaune","Informatique");
	planningTest.supprimerCategorie(planningTest.getCategories()[0]);
	var cat = planningTest.getCategories();
	
	assert.equal( cat.length,0,"Passed!");
	
});


QUnit.test( "testPlanningReinitialiserJournalier", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	planningTest.ajoutColonne(colonneTest);
	planningTest.reinitialiser();
	
	assert.equal(planningTest.getColonnes()[0],undefined , "Passed!");
	
});

QUnit.test( "testReinitialiserHebdo", function( assert ) {
	var planningTest = new Planning("hebdomadaire");
	var periodeTest = new Periode({heureDeb:8});
	var colonneTest = new Colonne("Lundi",10);
	var evenementTest = new EvenementClassique("TD","UML",periodeTest,1,"conception informatique");
	
	planningTest.ajoutColonne(colonneTest);
	colonneTest.ajouterEvenement(evenementTest);
	planningTest.reinitialiser();
	
	assert.equal(planningTest.getColonnes()[0].getTaches()[0],undefined , "Passed!");
	
});