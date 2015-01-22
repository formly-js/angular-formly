angular.module('empty_file').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/empty.html',
    ""
  );

}]);
