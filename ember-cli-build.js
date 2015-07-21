/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
var _ = require('lodash');

module.exports = function(defaults) {
  // NOTE: This is temporary until the fix for
  // https://github.com/ember-cli/ember-cli/issues/4435
  // is released.
  var opts = _.merge(defaults, {
    'ember-cli-chartist': {
      useCustomCSS: true
    }
  });

  var app = new EmberAddon(opts);

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
