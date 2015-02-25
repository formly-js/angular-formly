module.exports = ngModule => {
  require('./formlyTypes')(ngModule);
  require('./formlyUsability')(ngModule);
  require('./formlyConfig')(ngModule);
  require('./formlyVersion')(ngModule);
  require('./formlyErrorAndWarningsUrlPrefix')(ngModule);
  require('./formlyValidationMessages')(ngModule);
};
