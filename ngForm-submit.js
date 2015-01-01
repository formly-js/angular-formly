(function() {
    'use strict';

    angular.module('app').directive('ngForm', ngForm);

    function ngForm() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                var ngForm = scope.$eval(attrs.name);
                if (ngForm) {
                    ngForm.formlyDemoSubmit = function() {
                        if (ngForm.$invalid) {
                            return;
                        }
                        var context = scope.$parent;
                        ngForm.formlyDemoSubmitting = context.$eval(attrs.ngSubmit);
                        return ngForm.formlyDemoSubmitting;
                    };
                    element.on('keyup', function(event) {
                        if (event.which === 13 && attrs.ngSubmit) {
                            submitFormFromEvent(event);
                        }
                    });
                    var submitButton = angular.element(element[0].querySelectorAll('[type=submit]'));
                    if (submitButton.length === 1) {
                        submitButton.on('keyup', function(event) {
                            if (event.which === 32 || event.which === 13) {
                                submitFormFromEvent(event);
                            }
                        });
                        submitButton.on('click', submitFormFromEvent);
                    } else if (submitButton.length) {
                        throw new Error('Forms should only have one submit button');
                    }
                }

                function submitFormFromEvent(event) {
                    /* jshint -W030 */
                    event && event.preventDefault && event.preventDefault();
                    event && event.stopPropagation && event.stopPropagation();
                    ngForm.formlyDemoSubmit();
                    scope.$apply();
                }
            }
        };
    }
})();
