'use strict';
// Angular Init
var app = angular.module('app', ['ng',
	'ui.router',
	'hljs',
	'formly'
]);

app.constant('usingCustomTypeTemplates', window.localStorage.getItem('useCustomTypeTemplates') === 'true');

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, formlyConfigProvider, usingCustomTypeTemplates) {
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
		formlyConfigProvider.setTemplateUrl('text', 'views/custom-field-text.html');
		// or
		formlyConfigProvider.setTemplateUrl({
			radio: 'views/custom-field-radio.html',
			checkbox: 'views/custom-field-checkbox.html'
		});
	}

	formlyConfigProvider.setTemplate('inline-custom', '<label>Inline-custom template</label><br /><input ng-model="result[options.key || index]" class="form-control">')
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