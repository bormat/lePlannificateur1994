/*****************************
****test classe fenetre*****
******************************/
QUnit.test( "testFenetreIsAfficher", function( assert ) {
	var fenetreTest = new Fenetre(false);

	assert.equal(fenetreTest.isAfficher(), false, "Passed!" );
});

QUnit.test( "testFenetreAfficher", function( assert ) {
	var fenetreTest = new Fenetre(false);
	fenetreTest.afficher(true);
	assert.equal(fenetreTest.isAfficher(), true, "Passed!" );
});

QUnit.test( "testFenetreAvecTransitionTrue", function( assert ) {
	var fenetreTest = new Fenetre();
	fenetreTest.setName("toto");
	fenetreTest.afficher(true);
	assert.equal(fenetreTest.getClasses(), "fenVisible fen toto", "Passed!" );
	fenetreTest.afficher(false);
	assert.equal(fenetreTest.getClasses(), "fenInvisible fen toto", "Passed!" );

});

QUnit.test( "testFenetreAvecTransitionFalse", function( assert ) {
	var fenetreTest = new Fenetre();
	fenetreTest.setName("toto");
	fenetreTest.afficher(true);
	assert.equal(fenetreTest.getClasses(), "fenVisible fen toto", "Passed!" );
	fenetreTest.afficher(false);
	assert.equal(fenetreTest.getClasses(), "fenInvisible fen toto", "Passed!" );
});