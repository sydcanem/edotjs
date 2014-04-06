'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var dot = require( 'dot' );

// view cache
var cache = {};
var read = fs.readFileSync;

function load( file, options ) {
	var opts = options || {};
	var view;

	file = path.resolve( file );
	if ( cache[ file ] ) {
		return cache[ file ];
	}

	view = read( file, 'utf8' );

	if ( opts.cache ) {
		cache[ file ] = view;
	}

	return view;
}

function merge( a, b ) {
  if ( a && b ) {
    for ( var key in b ) {
      a[ key]  = b[ key ];
    }
  }
  return a;
}

function renderFile( path, options, fn ) {
	var pagefn;
	var def = merge( options, { '_load' : load } );

	try {
		pagefn = dot.template( load( path, options ), undefined, def );
	} catch ( error ) {
		fn( error );
	}

	fn( null, pagefn( options ) );
}

exports.dot = dot;
exports.renderFile = renderFile;