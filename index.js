/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');

module.exports = {

  name: 'ember-cli-chartist',

  treeForVendor(vendorTree) {
    var chartistPath = path.dirname(require.resolve('chartist'));

    var chartistTree = new Funnel(chartistPath, {
      files: [
        'chartist.js',
        'chartist.css',
      ],
    });

    return mergeTrees([
      vendorTree,
      chartistTree,
    ]);
  },

  treeForStyles() {
    var chartistPath = path.dirname(require.resolve('chartist'));

    return new Funnel(chartistPath, {
      srcDir: 'scss',
    });
  },

  included(app) {
    this._super.included.apply(this, arguments);
    app.import('vendor/chartist.js');
  },

};
