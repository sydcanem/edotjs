### Configure

	var edotjs = require( 'edotjs' );

	// Configure express to render
	// .html views using dot.js
    app.set( 'view engine', 'html' );
    app.engine( 'html', edotjs.renderFile );

    app.get( '/', function ( req, res ) {

    	edotjs.defines = {}; // dot.js defines
        res.render( 'index', some data );	
    } );

### Supports
- All features of dot.js
- Template and partials caching

Examples coming soon.