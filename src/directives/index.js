module.exports = ngModule => {
  require('./formly-custom-validation')(ngModule);
  require('./formly-field')(ngModule);
  require('./formly-form')(ngModule);
  require('./formly-focus')(ngModule);
};
