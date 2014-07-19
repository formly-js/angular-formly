'use strict';
// Angular Init
var app = angular.module('app', ['ng',
	'ui.router',
	'hljs',
	'formly'
]);

app.constant('usingCustomTypeTemplates', window.localStorage.getItem('useCustomTypeTemplates') === 'true');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, formlyTemplateProvider, formlyOptionsProvider, usingCustomTypeTemplates) {
	$locationProvider.html5Mode(false);
	$locationProvider.hashPrefix('!');

	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		title: 'Formly for Angular',
		templateUrl: 'views/home.html',
		controller: 'home'
	});
	if (usingCustomTypeTemplates) {
		formlyTemplateProvider.setTemplateUrl('text', 'views/custom-field-text.html');
		// or
		formlyTemplateProvider.setTemplateUrl({
			radio: 'views/custom-field-radio.html',
			checkbox: 'views/custom-field-checkbox.html'
		});
	} else {
		// using bootstrap cause vanilla is ugly, normally you would use the included prebuilt bootstrap file
		formlyTemplateProvider.setTemplateUrl({
			textarea: 'directives/bootstrap/formly-field-textarea.html',
			radio: 'directives/bootstrap/formly-field-radio.html',
			select: 'directives/bootstrap/formly-field-select.html',
			number: 'directives/bootstrap/formly-field-number.html',
			checkbox: 'directives/bootstrap/formly-field-checkbox.html',
			password: 'directives/bootstrap/formly-field-password.html',
			hidden: 'directives/bootstrap/formly-field-hidden.html',
			email: 'directives/bootstrap/formly-field-email.html',
			text: 'directives/bootstrap/formly-field-text.html'
		});
	}

	formlyOptionsProvider.setOption('uniqueFormId', 'defaultUniqueId');
	// or
	formlyOptionsProvider.setOption({
		submitCopy: 'Configured Submit',
		hideSubmit: true,
		submitButtonTemplate: [
			'<button type="submit" class="btn btn-primary" ng-hide="options.hideSubmit">',
				'{{options.submitCopy || "Submit"}} boo yeah!',
			'</button>'
		].join('')
	});
});

app.run(function($rootScope, $state, $stateParams, $window) {
	// loading animation
	$rootScope.setLoading = function() {
		$rootScope.isViewLoading = true;
	};

	$rootScope.unsetLoading = function() {
		$rootScope.isViewLoading = false;
	};

	$rootScope.isViewLoading = true;

	$rootScope.$on('$viewContentLoading', function(ev, to, toParams, from, fromParams) {
		console.log('viewContentLoading');
		$rootScope.setLoading();
	});

	$rootScope.$on('$viewContentLoaded', function(ev, to, toParams, from, fromParams) {
		console.log('viewContentLoaded');
		$rootScope.unsetLoading();
	});

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		if (error)
			console.log('stateChangeError:', error.data);
	});
});