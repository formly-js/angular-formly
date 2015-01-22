angular.module('custom_htmlmin').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/one.html',
    "<h1>One</h1><p>I am one.</p><script>// Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';</script>"
  );


  $templateCache.put('test/fixtures/two/two.html',
    "<h2>Two</h2><textarea readonly>We are two.</textarea>"
  );

}]);
