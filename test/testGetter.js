/*****************************
****test classe evenement*****
******************************/
QUnit.test( "testGetterSetterSimple", function( assert ) {
	Class.create("classee",{
		getteurEtSetteur: "a,b"
	})
	var instance= new classee({});
	instance.setA(5);
	instance.setB(8);
	assert.equal(  instance.getB(), 8, "Passed!" );
	assert.equal(  instance.getA(), 5, "Passed!" );
});

QUnit.test( "testGetterSetterLier", function( assert ) {
	Class.create("classee",{
		getteurEtSetteur: "a,b"
	})
	var instance= new classee({});
	instance.setA(5);
	instance.setB(8);
	assert.equal(  instance.getA(), 5, "Passed!" );
	assert.equal(  instance.getB(), 8, "Passed!" );
});

QUnit.test( "testGetterOnly", function( assert ) {
	Class.create("classee",{
		initialize:function (a,b){
			this._a=2;
			this._b=5;
		},
		getteur:"a,b"
	})
	var instance= new classee();
	assert.equal(  instance.getA(), 2, "Passed!" );
	assert.equal(  !instance.getA(), false, "Passed!" );
	assert.equal(  !instance.set, true, "Passed!" );
	assert.equal(  !instance.setB, true, "Passed!" );
	assert.equal(  !instance.setA, true, "Passed!" );
})

QUnit.test( "testGetterOnly", function( assert ) {
	Class.create("classee",{
		getTheA:function (a){
			return this._a;
		},
		setteur:"a"
	})
	var instance= new classee();
	instance.setA(8)
	assert.equal(  !instance.getA, true, "Passed!" );
	assert.equal(  instance.getTheA(), 8, "Passed!" );
})


