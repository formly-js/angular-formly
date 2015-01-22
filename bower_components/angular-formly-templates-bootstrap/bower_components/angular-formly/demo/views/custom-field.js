app.directive('customField', function($timeout) {
	return {
		template: function(el, attrs) {
			return [
				'<div class="form-group" ng-class="{\'has-error\': options.formField.$invalid}">',
					(attrs.hasOwnProperty('addSmile') ? ':-)' : ''),
					'<label for="{{id}}">',
						'{{options.label || "Text"}}',
						'{{options.required ? "*" : ""}}',
					'</label>',
					'<div class="help-block" ng-show="options.formField.$error.notYes">Really? (enter "yes")</div>',
					'<div style="position:relative">',
						'<input type="text"',
							   'class="form-control"',
							   'id="{{id}}"',
							   'formly-dynamic-name="options.key"',
							   'formly-custom-validation="options.validators"',
							   'placeholder="{{options.placeholder}}"',
							   'ng-required="options.required"',
							   'ng-disabled="options.disabled"',
							   'ng-change="onChange(value)"',
							   'ng-model="value">',
						'<span ng-show="loading" style="position:absolute;top:9px;right:10px;color:lightgray;font-size:.8em">',
							'Pretending to load something...',
						'</span>',
					'</div>',
				'</div>'
			].join(' ');
		},
		link: function($scope, $element, $attr) {
			$scope.loading = false;
			var loadingTimeout = null;
			$scope.onChange = function pretendToLoadSomething(value) {
				$timeout.cancel(loadingTimeout);
				if (!value) {
					return;
				}
				$scope.loading = true;
				loadingTimeout = $timeout(function() {
					$scope.loading = false;
				}, Math.floor((Math.random() * 600) + 300));
			};
		}
	};
});