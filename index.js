'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-chartist',

  included(app) {
    this._super.included.apply(this, arguments);

    this.chartistPath = path.dirname(require.resolve('chartist'));
    this.appOptions = app.options['ember-cli-chartist'] || {};

    app.import('vendor/chartist.js');
    if (!this.appOptions.useCustomCSS) {
      app.import('vendor/chartist.css');
    }
  },

  treeForVendor(vendorTree) {
    const chartistTree = new Funnel(this.chartistPath, {
      files: [
        'chartist.js',
        'chartist.css',
      ],
    });

    return vendorTree ? mergeTrees([vendorTree, chartistTree]) : chartistTree;
  },

  treeForStyles(stylesTree) {
    if (this.appOptions.useCustomCSS) {
      this.ui.writeDeprecateLine(
        "[ember-cli-chartist]: In the next major release (v2.0.0) of " +
        "ember-cli-chartist, the import paths for chartist.scss and chartist-settings.scss will" +
        " be changing. They will become 'chartist/chartist.scss' and " +
        "'chartist/settings/chartist-settings.scss', respectively.\n"
      );

      const chartistTree = new Funnel(this.chartistPath, {
        srcDir: 'scss',
        // destDir: 'chartist',
      });

      return stylesTree ? mergeTrees([stylesTree, chartistTree]) : chartistTree;
    }
  },
};
