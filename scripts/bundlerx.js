// NOTE: java -jar ../closure-compiler-v20181210.jar --process_common_js_modules --module_resolution=NODE -O SIMPLE --formatting PRETTY_PRINT --js_output_file=./out.js --language_in=ECMASCRIPT5 --language_out=ECMASCRIPT5 --js=output.core.js

var _ = require('lodash');

var rollup = require('rollup');
var rollupInject = require('rollup-plugin-inject');
var rollupNodeResolve = require('rollup-plugin-node-resolve');

var fs = require('fs');
var path = require('path');

var tslib = require('tslib');

rollup.rollup({
  entry: 'umd.core.js',
  plugins: [
    rollupNodeResolve({
      jsnext: true,
    }),
    rollupInject({
      exclude: 'node_modules/**',
      modules: _.mapValues(tslib, function (value, key) {
        return ['tslib', key];
      }),
    }),
  ],
}).then(function (bundle) {
  var result = bundle.generate({
    format: 'cjs',
    moduleName: 'rxjs',
    sourceMap: true
  });

  fs.writeFileSync('output.core.js', result.code);
});

rollup.rollup({
  entry: 'umd.operators.js',
  plugins: [
    rollupNodeResolve({
      jsnext: true,
    }),
    rollupInject({
      exclude: 'node_modules/**',
      modules: _.mapValues(tslib, function (value, key) {
        return ['tslib', key];
      }),
    }),
  ],
}).then(function (bundle) {
  var result = bundle.generate({
    format: 'cjs',
    moduleName: 'rxjs',
    sourceMap: true
  });

  fs.writeFileSync('output.operators.js', result.code);
});
