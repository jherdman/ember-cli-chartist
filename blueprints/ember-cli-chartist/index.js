module.exports = {
  normalizeEntityName: function() {
  },

  beforeInstall: function(options) {
    return this.addBowerPackageToProject('chartist', '~0.7.4');
  }
};