angular.module('custom_source').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('test/fixtures/one.html',
    "<!-- Template: test/fixtures/one.html -->\n" +
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


  $templateCache.put('test/fixtures/two/two.html',
    "<!-- Template: test/fixtures/two/two.html -->\n" +
    "<h2>Two</h2>\n" +
    "\n" +
    "<!-- Comment for two -->\n" +
    "\n" +
    "<textarea readonly=\"readonly\">We are two.</textarea>\n"
  );

}]);
