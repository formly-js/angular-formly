app.directive('customField', function($timeout) {
	return {
		template: function(el, attrs) {
			return [
				'<div class="form-group" style="position:relative">',
					(attrs.hasOwnProperty('addSmile') ? ':-)' : ''),
					'<label for="{{id}}">',
						'{{options.label || "Text"}}',
						'{{options.required ? "*" : ""}}',
					'</label>',
					'<input type="text"',
						   'class="form-control"',
						   'id="{{id}}"',
						   'placeholder="{{options.placeholder}}"',
						   'ng-required="options.required"',
						   'ng-disabled="options.disabled"',
						   'ng-change="onChange(value)"',
						   'ng-model="value">',
					'<span ng-show="loading" style="position:absolute;top:34px;right:10px;color:lightgray;font-size:.8em">',
						'Pretending to load something...',
					'</span>',
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