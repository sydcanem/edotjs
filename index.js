'use strict';

var fs   = require( 'fs' );
var path = require( 'path' );
var dot  = require( 'dot' );

var cache = {}; // view cache
var read  = fs.readFileSync;
var prod  = (process.env.NODE_ENV === 'production');

function include (cwd, options) {
  return function (file) {
    file = path.resolve(cwd, file);

    var def = merge(dot.defines || {}, {'include' : include(path.dirname(file), options)});
    var pagefn;
    try {
      pagefn = dot.template(load(file, options), undefined, def);
    } catch (error) {
      throw error;
    }

    return pagefn(options);
  }
}
function load (file, options) {
  var opts = options || {};
  var view;

  file = path.resolve(file);
  if (cache[file]) {
    return cache[file];
  }

  view = read(file, 'utf8');

  if (opts.cache || (!opts.cacheOff && prod)) {
    cache[file] = view;
  }

  return view;
}

function merge (a, b) {
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
}

function renderFile (file, options, fn) {
  var pagefn;
  var def = merge(dot.defines || {}, {'include' : include(path.dirname(file), options)});

  try {
    pagefn = dot.template(load(file, options), undefined, def);
  } catch (error) {
    fn(error);
  }

  fn(null, pagefn(options));
}

module.exports            = dot;
module.exports.renderFile = renderFile;
module.exports.cache      = cache;