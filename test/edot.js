var edot = require( '..' );
var should = require( 'should' );

describe( 'Features', function () {
	
	it( 'interpolation', function () {
		var data = { 'name' : 'Jake', 'age' : 31 };

		edot.renderFile( 'test/fixtures/interpolation.html', data, function( err, str ) {
			str.should.equal( '<div>Hi Jake!</div><div>31</div>' );
		} );
	} );

	it( 'evaluation', function () {
		var data = { 'name' : 'Jake', 'age' : 31, 'mother' : 'Kate' };
		
		edot.renderFile( 'test/fixtures/evaluation.html', data, function( err, str ) {
			str.should.equal( '<div>name</div><div>age</div><div>mother</div>' );
		} );
	} );

	it( 'partials', function () {
		var data = { 'name' : 'Jake', 'age' : 31 };
		var def = { 'joke' : '<div>{{=it.name}} who?</div>' };

		// Set compile-time evaluation
		edot.defines = def;

		edot.renderFile( 'test/fixtures/partials.html', data, function( err, str ) {
			str.should.equal( '<div>Jake</div><div>Jake who?</div>' );
		} );
	} );

	it( 'conditionals', function () {
		var data = { 'name' : 'Jake', 'age' : 31 };

		edot.renderFile( 'test/fixtures/conditionals.html', data, function( err, str ) {
			str.should.equal( '<div>Oh, I love your name, Jake!</div>' );
		} );
	} );

	it( 'arrays', function () {
		var data = { 'array' : [ 'banana', 'apple', 'orange' ] };

		edot.renderFile( 'test/fixtures/arrays.html', data, function( err, str ) {
			str.should.equal( '<div>banana!</div><div>apple!</div><div>orange!</div>' );
		} );
	} );

	it( 'encodes', function () {
		var data = { 'uri' : 'http://bebedo.com/?keywords=Yoga' };

		edot.renderFile( 'test/fixtures/encode.html', data, function( err, str ) {
			str.should.equal( 'Visit http:&#47;&#47;bebedo.com&#47;?keywords=Yoga' );
		} );
	} );
} );
