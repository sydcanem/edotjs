### Configure

    var utils = require( './utils' );

   	app.set( 'view engine', '.html' );
	app.engine( 'html', utils.renderFile );


### Supports
- All features of dot.js
- Template and partials caching

Examples coming soon.