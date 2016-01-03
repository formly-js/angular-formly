/* global Package:false */
// package metadata file for AtmosphereJS

try {
  Package.describe({
    name: 'formly:angular-formly',
    summary: 'angular-formly (official): forms for AngularJS',
    version: '0.0.0-semantically-released.0',
    git: 'https://github.com/formly-js/angular-formly.git',
  })

  Package.onUse(function(api) {
    api.versionsFrom(['METEOR@1.0'])
    // api-check
    api.use('wieldo:api-check@7.5.5')
    api.imply('wieldo:api-check')
    // angular
    api.use('angular:angular@1.4.0')
    api.addFiles('dist/formly.js', 'client')
  })
} catch (e) {
  //
}
