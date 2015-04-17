/*****************************
****test gererCreationPlanning*****
******************************/
QUnit.test( "GererCréationPlanning", function( assert ) {
	//création planning
	var cont = controlleur();
	cont.creerPlanning("journalier");
	assert.equal(cont.planning.getMode(), "journalier");
	});