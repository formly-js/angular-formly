/* global packageFix:true Package:false */
// package metadata file for AtmosphereJS

try {
  packageFix = Package

  packageFix.describe({
    name: 'formly:angular-formly',
    summary: 'angular-formly (official): forms for AngularJS',
    version: '0.0.0-semantically-released.0',
    git: 'https://github.com/formly-js/angular-formly.git',
  })

  packageFix.onUse((api) => {
    api.versionsFrom(['METEOR@1.0'])
    api.use('wieldo:api-check@7.5.5')
    api.addFiles('dist/formly.js', 'client')
  })

} catch (e) {
  // little workaround...
  // ghooks compiles this file and throws ReferenceError because
  // Package is a global variable available only in Meteor environment
}
