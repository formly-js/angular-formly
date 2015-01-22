"use strict";

// long form
angular.module("MyMod").controller("MyCtrl", function($scope, $timeout) {
});

// w/ dependencies
angular.module("MyMod", ["OtherMod"]).controller("MyCtrl", function($scope, $timeout) {
});

// simple
myMod.controller("foo", function($scope, $timeout) {
});
myMod.service("foo", function($scope, $timeout) {
});
myMod.factory("foo", function($scope, $timeout) {
});
myMod.directive("foo", function($scope, $timeout) {
});
myMod.filter("foo", function($scope, $timeout) {
});
myMod.animation("foo", function($scope, $timeout) {
});
myMod.invoke("foo", function($scope, $timeout) {
});

// implicit config function
angular.module("MyMod", function($interpolateProvider) {});
angular.module("MyMod", ["OtherMod"], function($interpolateProvider) {});
angular.module("MyMod", ["OtherMod"], function($interpolateProvider) {}).controller("foo", function($scope) {});

// object property
var myObj = {};
myObj.myMod = angular.module("MyMod");
myObj.myMod.controller("foo", function($scope, $timeout) { a });

// no dependencies => no need to wrap the function in an array
myMod.controller("foo", function() {
});
myMod.service("foo", function() {
});
myMod.factory("foo", function() {
});
myMod.directive("foo", function() {
});
myMod.filter("foo", function() {
});
myMod.animation("foo", function() {
});
myMod.invoke("foo", function() {
});

// run, config don't take names
myMod.run(function($scope, $timeout) {
});
angular.module("MyMod").run(function($scope) {
});
myMod.config(function($scope, $timeout) {
});
angular.module("MyMod").config(function() {
});

// directive return object
myMod.directive("foo", function($scope) {
    return {
        controller: function($scope, $timeout) {
            bar;
        }
    }
});
myMod.directive("foo", function($scope) {
    return {
        controller: function() {
            bar;
        }
    }
});

// provider, provider $get
myMod.provider("foo", function($scope) {
    this.$get = function($scope, $timeout) {
        bar;
    };
    self.$get = function($scope) {};
    that.$get = function($scope) {};
    ignore.$get = function($scope) {};
});
myMod.provider("foo", function() {
    this.$get = function() {
        bar;
    };
});
myMod.provider("foo", function() {
    return {
        $get: function($scope, $timeout) {
            bar;
        }};
});
myMod.provider("foo", function() {
    return {
        $get: function() {
            bar;
        }};
});
myMod.provider("foo", {
    $get: function($scope, $timeout) {
        bar;
    }
});
myMod.provider("foo", {
    $get: function() {
        bar;
    }
});

// chaining
myMod.directive("foo", function($a, $b) {
    a;
}).factory("foo", function() {
        b;
    }).config(function($c) {
        c;
    }).filter("foo", function($d, $e) {
        d;
    }).animation("foo", function($f, $g) {
        e;
    });

angular.module("MyMod").directive("foo", function($a, $b) {
    a;
}).provider("foo", function() {
        return {
            $get: function($scope, $timeout) {
                bar;
            }};
    }).value("foo", "bar")
    .constant("foo", "bar")
    .bootstrap(element, [], {})
    .factory("foo", function() {
        b;
    }).config(function($c) {
        c;
    }).filter("foo", function($d, $e) {
        d;
    }).animation("foo", function($f, $g) {
        e;
    }).invoke("foo", function($h, $i) {
        f;
    });

// $provide
angular.module("MyMod").directive("foo", function($a, $b) {
    $provide.decorator("foo", function($scope, $timeout) {
        a;
    });
    $provide.factory("bar", function($timeout, $scope) {
        b;
    });
    $provide.animation("baz", function($scope, $timeout) {
        c;
    });
});


// all the patterns below matches only when we're inside a detected angular module
angular.module("MyMod").directive("pleasematchthis", function() {

    // $httpProvider
    $httpProvider.interceptors.push(function($scope) { a });
    $httpProvider.responseInterceptors.push(function($scope) { a }, function(a, b) { b }, function() { c });

    // $routeProvider
    $routeProvider.when("path", {
        controller: function($scope) { a }
    }).when("path2", {
            controller: function($scope) { b },
            resolve: {
                zero: function() { a },
                more: function($scope, $timeout) { b },
                something: "else",
            },
            dontAlterMe: function(arg) {},
        });

    // ui-router
    $stateProvider.state("myState", {
        resolve: {
            simpleObj: function() { a },
            promiseObj: function($scope, $timeout) { b },
            translations: "translations",
        },
        views: {
            viewa: {
                controller: function($scope, myParam) {},
                controllerProvider: function($stateParams) {},
                templateProvider: function($scope) {},
                dontAlterMe: function(arg) {},
                resolve: {
                    myParam: function($stateParams) {
                        return $stateParams.paramFromDI;
                    }
                },
            },
            viewb: {
                dontAlterMe: function(arg) {},
                templateProvider: function($scope) {},
                controller: function($scope) {},
            },
            dontAlterMe: null,
        },
        controller: function($scope, simpleObj, promiseObj, translations) { c },
        controllerProvider: function($scope) { g },
        templateProvider: function($scope) { h },
        onEnter: function($scope) { d },
        onExit: function($scope) { e },
        dontAlterMe: function(arg) { f },
    }).state("myState2", {
            controller: function($scope) {},
        }).state({
            name: "myState3",
            controller: function($scope, simpleObj, promiseObj, translations) { c },
        });
    $urlRouterProvider.when("/", function($match) { a; });
    $urlRouterProvider.otherwise("", function(a) { a; });
    $urlRouterProvider.rule(function(a) { a; }).anything().when("/", function($location) { a; });

    // angular ui / ui-bootstrap $modal
    $modal.open({
        templateUrl: "str",
        controller: function($scope) {},
        resolve: {
            items: function(MyService) {},
            data: function(a, b) {},
            its: 42,
        },
        donttouch: function(me) {},
    });
});

// none of the patterns below matches because they are not in an angular module context
// this should be a straight copy of the code above, with identical copies in
// with_annotations(_single).js
foobar.irrespective("dontmatchthis", function() {

    // $httpProvider
    $httpProvider.interceptors.push(function($scope) { a });
    $httpProvider.responseInterceptors.push(function($scope) { a }, function(a, b) { b }, function() { c });

    // $routeProvider
    $routeProvider.when("path", {
        controller: function($scope) { a }
    }).when("path2", {
            controller: function($scope) { b },
            resolve: {
                zero: function() { a },
                more: function($scope, $timeout) { b },
                something: "else",
            },
            dontAlterMe: function(arg) {},
        });

    // ui-router
    $stateProvider.state("myState", {
        resolve: {
            simpleObj: function() { a },
            promiseObj: function($scope, $timeout) { b },
            translations: "translations",
        },
        views: {
            viewa: {
                controller: function($scope, myParam) {},
                controllerProvider: function($stateParams) {},
                templateProvider: function($scope) {},
                dontAlterMe: function(arg) {},
                resolve: {
                    myParam: function($stateParams) {
                        return $stateParams.paramFromDI;
                    }
                },
            },
            viewb: {
                dontAlterMe: function(arg) {},
                templateProvider: function($scope) {},
                controller: function($scope) {},
            },
            dontAlterMe: null,
        },
        controller: function($scope, simpleObj, promiseObj, translations) { c },
        controllerProvider: function($scope) { g },
        templateProvider: function($scope) { h },
        onEnter: function($scope) { d },
        onExit: function($scope) { e },
        dontAlterMe: function(arg) { f },
    }).state("myState2", {
            controller: function($scope) {},
        }).state({
            name: "myState3",
            controller: function($scope, simpleObj, promiseObj, translations) { c },
        });
    $urlRouterProvider.when("/", function($match) { a; });
    $urlRouterProvider.otherwise("", function(a) { a; });
    $urlRouterProvider.rule(function(a) { a; }).anything().when("/", function($location) { a; });

    // angular ui / ui-bootstrap $modal
    $modal.open({
        templateUrl: "str",
        controller: function($scope) {},
        resolve: {
            items: function(MyService) {},
            data: function(a, b) {},
            its: 42,
        },
        donttouch: function(me) {},
    });
});

// explicit annotations
var x = /* @ngInject */ function($scope) {
};

var obj = {};
obj.bar = /*@ngInject*/ function($scope) {};

obj = {
    controller: /*@ngInject*/ function($scope) {},
};

obj = /*@ngInject*/ {
    foo: function(a) {},
    bar: function(b, c) {},
    val: 42,
    inner: {
        circle: function(d) {},
        alalalala: "long",
    },
    nest: { many: {levels: function(x) {}}},
    but: { onlythrough: ["object literals", {donttouch: function(me) {}}]},
};

obj = {
    /*@ngInject*/
    foo: function(a) {},
    bar: function(b, c) {},
};

/*@ngInject*/
obj = {
    foo: function(a) {},
    bar: function(b, c) {},
    val: 42,
    inner: {
        circle: function(d) {},
        alalalala: "long",
    },
    nest: { many: {levels: function(x) {}}},
    but: { onlythrough: ["object literals", {donttouch: function(me) {}}]},
};

/*@ngInject*/
var obj = {
    foo: function(a) {},
    bar: function(b, c) {},
    val: 42,
    inner: {
        circle: function(d) {},
        alalalala: "long",
    },
    nest: { many: {levels: function(x) {}}},
    but: { onlythrough: ["object literals", {donttouch: function(me) {}}]},
};

// @ngInject
function foo($scope) {
}

// @ngInject
// otherstuff
function Foo($scope) {
}

// @ngInject
// has trailing semicolon
var foo1 = function($scope) {
};

// @ngInject
// lacks trailing semicolon
var foo2 = function($scope) {
}

// @ngInject
// has trailing semicolon
bar.foo1 = function($scope) {
};

// @ngInject
// lacks trailing semicolon
bar.foo2 = function($scope) {
}

// let's zip-zag indentation to make sure that the $inject array lines up properly
    // @ngInject
    function foo1($scope) {}
        // @ngInject
        function foo2($scope) {
        }
/* @ngInject */ function foo3($scope) {}
            /* @ngInject */ function foo4($scope) {
            }

    // @ngInject
    var foo1 = function($scope) {
    };
        // @ngInject
        var foo2 = function($scope) {};
// @ngInject
var foo3 = function($scope) {
}
            // @ngInject
            var foo4 = function($scope) {}

    /* @ngInject */ var foo5 = function($scope) {
    };
        /* @ngInject */var foo6 = function($scope) {};
/* @ngInject */var foo7 = function($scope) {
}
            /* @ngInject */var foo8 = function($scope) {}


// adding an explicit annotation where it isn't needed should work fine
myMod.controller("foo", /*@ngInject*/ function($scope, $timeout) {
});



// explicit annotations using ngInject() instead of /*@ngInject*/
var x = ngInject(function($scope) {});

obj = ngInject({
    foo: function(a) {},
    bar: function(b, c) {},
    val: 42,
    inner: {
        circle: function(d) {},
        alalalala: "long",
    },
    nest: { many: {levels: function(x) {}}},
    but: { onlythrough: ["object literals", {donttouch: function(me) {}}]},
});



// snippets that shouldn't fool ng-annotate into generating false positives,
//   whether we're inside an angular module or not
myMod.controller("donttouchme", function() {
    // lo-dash regression that happened in the brief time frame when
    // notes (instad of "notes") would match. see issue #22
    var notesForCurrentPage = _.filter(notes, function (note) {
        return note.page.uid === page.uid;
    });
});


// IIFE-jumping (primarily for compile-to-JS langs)
angular.module("MyMod").directive("foo", function($a, $b) {
    $modal.open({
        resolve: {
            collection: (function(_this) {
                return function($c) {
                };
            })(this),
        },
    });
});

var x = /*@ngInject*/ (function() {
    return function($a) {
    };
})();


// reference support
function MyCtrl1(a, b) {
}
if (true) {
    // proper scope analysis including shadowing
    let MyCtrl1 = function(c) {
    }
    angular.module("MyMod").directive("foo", MyCtrl1);
}
angular.module("MyMod").controller("bar", MyCtrl1);
function MyCtrl2(z) {
}
funcall(/*@ngInject*/ MyCtrl2); // explicit annotation on reference flows back to definition
