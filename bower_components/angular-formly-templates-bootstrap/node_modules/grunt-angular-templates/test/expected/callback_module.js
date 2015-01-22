angular.module('test.fixtures.one.html').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/one',
    "<h1>One</h1>\n" +
    "\n" +
    "<p class=\"\">I am one.</p>\n" +
    "\n" +
    "<script type=\"text/javascript\">\n" +
    "  // Test\n" +
    "  /* comments */\n" +
    "  var foo = 'bar';\n" +
    "</script>\n"
  );

}]);

angular.module('test.fixtures.two.two.html').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/two/two',
    "<h2>Two</h2>\n" +
    "\n" +
    "<!-- Comment for two -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are two.</textarea>\n"
  );

}]);
