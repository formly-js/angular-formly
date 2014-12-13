app.directive('customField', function() {
	return {
		template: function(el, attrs) {
			return [
				'<div class="form-group" ng-class="{\'has-error\': form[options.key].$invalid && options.formField.$touched}">',
					(attrs.hasOwnProperty('addSmile') ? ':-)' : ''),
					'<label for="{{id}}">',
						'{{options.label || "Text"}}',
						'{{options.required ? "*" : ""}}',
					'</label>',
					'<div class="help-block" ng-show="options.formField.$error.notYes && options.formField.$touched">Really? (enter "yes")</div>',
					'<div style="position:relative">',
						'<input type="text"',
							   'class="form-control"',
							   'id="{{id}}"',
							   'formly-dynamic-name="options.key"',
							   'formly-custom-validation="options.validators"',
							   'placeholder="{{options.placeholder}}"',
							   'ng-required="options.required"',
							   'ng-disabled="options.disabled"',
							   'ng-model="result[options.key || index]">',
						'<span ng-show="options.formField.$pending" style="position:absolute;top:9px;right:10px;color:lightgray;font-size:.8em">',
							'Pretending to load something...',
						'</span>',
					'</div>',
				'</div>'
			].join(' ');
		}
	};
});