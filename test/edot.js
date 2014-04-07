var edot = require( '..' );
var should = require( 'should' );

describe( 'Features', function () {
	
	it( 'interpolation', function () {
		var data = { 'name' : 'Jake', 'age' : 31 };

		edot.renderFile( 'test/fixtures/interpolation.html', { 'data' : data }, function( err, str ) {
			str.should.equal( '<div>Hi Jake!</div><div>31</div>' );
		} );
	} );

	it( 'evaluation', function () {
		var data = { 'name' : 'Jake', 'age' : 31, 'mother' : 'Kate' };
		
		edot.renderFile( 'test/fixtures/evaluation.html', { 'data' : data }, function( err, str ) {
			str.should.equal( '<div>name</div><div>age</div><div>mother</div>' );
		} );
	} );

	it( 'partials', function () {
		var data = { 'name' : 'Jake', 'age' : 31 };
		var def = { 'joke' : '<div>{{=it.name}} who?</div>' };

		edot.renderFile( 'test/fixtures/template.html', { 'data' : data, 'def' : def }, function( err, str ) {
			str.should.equal( '<div>Jake</div><div>Jake who?</div>' );
		} );
	} );
} );
