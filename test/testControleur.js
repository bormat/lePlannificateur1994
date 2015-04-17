/***************************
****test serial planning****
****************************/


QUnit.test( "testCyclicObjet", function( assert ) {
	var cont = controlleur();
	assert.equal(  cont.grillePlanning.isAfficher(), false );
	assert.equal(  cont.accueilVisible.isAfficher(), true );
	//à vous les tests de controleur

});
QUnit.test( "actualiser", function( assert ){
	var cont = controlleur();
	cont.creerPlanning("journalier")
	var oldPlan = cont.planning;
	cont.actualiser()
	assert.notEqual(oldPlan, cont.planning);
	assert.equal(cont.planning.getMode(),"journalier");
})