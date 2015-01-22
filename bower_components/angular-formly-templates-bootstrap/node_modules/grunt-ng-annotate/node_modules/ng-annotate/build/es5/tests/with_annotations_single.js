"use strict";

// long form
angular.module("MyMod").controller("MyCtrl", ['$scope', '$timeout', function($scope, $timeout) {
}]);

// w/ dependencies
angular.module("MyMod", ["OtherMod"]).controller("MyCtrl", ['$scope', '$timeout', function($scope, $timeout) {
}]);

// simple
myMod.controller("foo", ['$scope', '$timeout', function($scope, $timeout) {
}]);
myMod.service("foo", ['$scope', '$timeout', function($scope, $timeout) {
}]);
myMod.factory("foo", ['$scope', '$timeout', function($scope, $timeout) {
}]);
myMod.directive("foo", ['$scope', '$timeout', function($scope, $timeout) {
}]);
myMod.filter("foo", ['$scope', '$timeout', function($scope, $timeout) {
}]);
myMod.animation("foo", ['$scope', '$timeout', function($scope, $timeout) {
}]);
myMod.invoke("foo", ['$scope', '$timeout', function($scope, $timeout) {
}]);

// implicit config function
angular.module("MyMod", ['$interpolateProvider', function($interpolateProvider) {}]);
angular.module("MyMod", ["OtherMod"], ['$interpolateProvider', function($interpolateProvider) {}]);
angular.module("MyMod", ["OtherMod"], ['$interpolateProvider', function($interpolateProvider) {}]).controller("foo", ['$scope', function($scope) {}]);

// object property
var myObj = {};
myObj.myMod = angular.module("MyMod");
myObj.myMod.controller("foo", ['$scope', '$timeout', function($scope, $timeout) { a }]);

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
myMod.run(['$scope', '$timeout', function($scope, $timeout) {
}]);
angular.module("MyMod").run(['$scope', function($scope) {
}]);
myMod.config(['$scope', '$timeout', function($scope, $timeout) {
}]);
angular.module("MyMod").config(function() {
});

// directive return object
myMod.directive("foo", ['$scope', function($scope) {
    return {
        controller: ['$scope', '$timeout', function($scope, $timeout) {
            bar;
        }]
    }
}]);
myMod.directive("foo", ['$scope', function($scope) {
    return {
        controller: function() {
            bar;
        }
    }
}]);

// provider, provider $get
myMod.provider("foo", ['$scope', function($scope) {
    this.$get = ['$scope', '$timeout', function($scope, $timeout) {
        bar;
    }];
    self.$get = ['$scope', function($scope) {}];
    that.$get = ['$scope', function($scope) {}];
    ignore.$get = function($scope) {};
}]);
myMod.provider("foo", function() {
    this.$get = function() {
        bar;
    };
});
myMod.provider("foo", function() {
    return {
        $get: ['$scope', '$timeout', function($scope, $timeout) {
            bar;
        }]};
});
myMod.provider("foo", function() {
    return {
        $get: function() {
            bar;
        }};
});
myMod.provider("foo", {
    $get: ['$scope', '$timeout', function($scope, $timeout) {
        bar;
    }]
});
myMod.provider("foo", {
    $get: function() {
        bar;
    }
});

// chaining
myMod.directive("foo", ['$a', '$b', function($a, $b) {
    a;
}]).factory("foo", function() {
        b;
    }).config(['$c', function($c) {
        c;
    }]).filter("foo", ['$d', '$e', function($d, $e) {
        d;
    }]).animation("foo", ['$f', '$g', function($f, $g) {
        e;
    }]);

angular.module("MyMod").directive("foo", ['$a', '$b', function($a, $b) {
    a;
}]).provider("foo", function() {
        return {
            $get: ['$scope', '$timeout', function($scope, $timeout) {
                bar;
            }]};
    }).value("foo", "bar")
    .constant("foo", "bar")
    .bootstrap(element, [], {})
    .factory("foo", function() {
        b;
    }).config(['$c', function($c) {
        c;
    }]).filter("foo", ['$d', '$e', function($d, $e) {
        d;
    }]).animation("foo", ['$f', '$g', function($f, $g) {
        e;
    }]).invoke("foo", ['$h', '$i', function($h, $i) {
        f;
    }]);

// $provide
angular.module("MyMod").directive("foo", ['$a', '$b', function($a, $b) {
    $provide.decorator("foo", ['$scope', '$timeout', function($scope, $timeout) {
        a;
    }]);
    $provide.factory("bar", ['$timeout', '$scope', function($timeout, $scope) {
        b;
    }]);
    $provide.animation("baz", ['$scope', '$timeout', function($scope, $timeout) {
        c;
    }]);
}]);


// all the patterns below matches only when we're inside a detected angular module
angular.module("MyMod").directive("pleasematchthis", function() {

    // $httpProvider
    $httpProvider.interceptors.push(['$scope', function($scope) { a }]);
    $httpProvider.responseInterceptors.push(['$scope', function($scope) { a }], ['a', 'b', function(a, b) { b }], function() { c });

    // $routeProvider
    $routeProvider.when("path", {
        controller: ['$scope', function($scope) { a }]
    }).when("path2", {
            controller: ['$scope', function($scope) { b }],
            resolve: {
                zero: function() { a },
                more: ['$scope', '$timeout', function($scope, $timeout) { b }],
                something: "else",
            },
            dontAlterMe: function(arg) {},
        });

    // ui-router
    $stateProvider.state("myState", {
        resolve: {
            simpleObj: function() { a },
            promiseObj: ['$scope', '$timeout', function($scope, $timeout) { b }],
            translations: "translations",
        },
        views: {
            viewa: {
                controller: ['$scope', 'myParam', function($scope, myParam) {}],
                controllerProvider: ['$stateParams', function($stateParams) {}],
                templateProvider: ['$scope', function($scope) {}],
                dontAlterMe: function(arg) {},
                resolve: {
                    myParam: ['$stateParams', function($stateParams) {
                        return $stateParams.paramFromDI;
                    }]
                },
            },
            viewb: {
                dontAlterMe: function(arg) {},
                templateProvider: ['$scope', function($scope) {}],
                controller: ['$scope', function($scope) {}],
            },
            dontAlterMe: null,
        },
        controller: ['$scope', 'simpleObj', 'promiseObj', 'translations', function($scope, simpleObj, promiseObj, translations) { c }],
        controllerProvider: ['$scope', function($scope) { g }],
        templateProvider: ['$scope', function($scope) { h }],
        onEnter: ['$scope', function($scope) { d }],
        onExit: ['$scope', function($scope) { e }],
        dontAlterMe: function(arg) { f },
    }).state("myState2", {
            controller: ['$scope', function($scope) {}],
        }).state({
            name: "myState3",
            controller: ['$scope', 'simpleObj', 'promiseObj', 'translations', function($scope, simpleObj, promiseObj, translations) { c }],
        });
    $urlRouterProvider.when("/", ['$match', function($match) { a; }]);
    $urlRouterProvider.otherwise("", function(a) { a; });
    $urlRouterProvider.rule(function(a) { a; }).anything().when("/", ['$location', function($location) { a; }]);

    // angular ui / ui-bootstrap $modal
    $modal.open({
        templateUrl: "str",
        controller: ['$scope', function($scope) {}],
        resolve: {
            items: ['MyService', function(MyService) {}],
            data: ['a', 'b', function(a, b) {}],
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
var x = /* @ngInject */ ['$scope', function($scope) {
}];

var obj = {};
obj.bar = /*@ngInject*/ ['$scope', function($scope) {}];

obj = {
    controller: /*@ngInject*/ ['$scope', function($scope) {}],
};

obj = /*@ngInject*/ {
    foo: ['a', function(a) {}],
    bar: ['b', 'c', function(b, c) {}],
    val: 42,
    inner: {
        circle: ['d', function(d) {}],
        alalalala: "long",
    },
    nest: { many: {levels: ['x', function(x) {}]}},
    but: { onlythrough: ["object literals", {donttouch: function(me) {}}]},
};

obj = {
    /*@ngInject*/
    foo: ['a', function(a) {}],
    bar: function(b, c) {},
};

/*@ngInject*/
obj = {
    foo: ['a', function(a) {}],
    bar: ['b', 'c', function(b, c) {}],
    val: 42,
    inner: {
        circle: ['d', function(d) {}],
        alalalala: "long",
    },
    nest: { many: {levels: ['x', function(x) {}]}},
    but: { onlythrough: ["object literals", {donttouch: function(me) {}}]},
};

/*@ngInject*/
var obj = {
    foo: ['a', function(a) {}],
    bar: ['b', 'c', function(b, c) {}],
    val: 42,
    inner: {
        circle: ['d', function(d) {}],
        alalalala: "long",
    },
    nest: { many: {levels: ['x', function(x) {}]}},
    but: { onlythrough: ["object literals", {donttouch: function(me) {}}]},
};

// @ngInject
function foo($scope) {
}
foo.$inject = ['$scope'];

// @ngInject
// otherstuff
function Foo($scope) {
}
Foo.$inject = ['$scope'];

// @ngInject
// has trailing semicolon
var foo1 = function($scope) {
};
foo1.$inject = ['$scope'];

// @ngInject
// lacks trailing semicolon
var foo2 = function($scope) {
}
foo2.$inject = ['$scope'];

// @ngInject
// has trailing semicolon
bar.foo1 = function($scope) {
};
bar.foo1.$inject = ['$scope'];

// @ngInject
// lacks trailing semicolon
bar.foo2 = function($scope) {
}
bar.foo2.$inject = ['$scope'];

// let's zip-zag indentation to make sure that the $inject array lines up properly
    // @ngInject
    function foo1($scope) {}
    foo1.$inject = ['$scope'];
        // @ngInject
        function foo2($scope) {
        }
        foo2.$inject = ['$scope'];
/* @ngInject */ function foo3($scope) {}
foo3.$inject = ['$scope'];
            /* @ngInject */ function foo4($scope) {
            }
            foo4.$inject = ['$scope'];

    // @ngInject
    var foo1 = function($scope) {
    };
    foo1.$inject = ['$scope'];
        // @ngInject
        var foo2 = function($scope) {};
        foo2.$inject = ['$scope'];
// @ngInject
var foo3 = function($scope) {
}
foo3.$inject = ['$scope'];
            // @ngInject
            var foo4 = function($scope) {}
            foo4.$inject = ['$scope'];

    /* @ngInject */ var foo5 = function($scope) {
    };
    foo5.$inject = ['$scope'];
        /* @ngInject */var foo6 = function($scope) {};
        foo6.$inject = ['$scope'];
/* @ngInject */var foo7 = function($scope) {
}
foo7.$inject = ['$scope'];
            /* @ngInject */var foo8 = function($scope) {}
            foo8.$inject = ['$scope'];


// adding an explicit annotation where it isn't needed should work fine
myMod.controller("foo", /*@ngInject*/ ['$scope', '$timeout', function($scope, $timeout) {
}]);



// explicit annotations using ngInject() instead of /*@ngInject*/
var x = ngInject(['$scope', function($scope) {}]);

obj = ngInject({
    foo: ['a', function(a) {}],
    bar: ['b', 'c', function(b, c) {}],
    val: 42,
    inner: {
        circle: ['d', function(d) {}],
        alalalala: "long",
    },
    nest: { many: {levels: ['x', function(x) {}]}},
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
angular.module("MyMod").directive("foo", ['$a', '$b', function($a, $b) {
    $modal.open({
        resolve: {
            collection: (function(_this) {
                return ['$c', function($c) {
                }];
            })(this),
        },
    });
}]);

var x = /*@ngInject*/ (function() {
    return ['$a', function($a) {
    }];
})();


// reference support
function MyCtrl1(a, b) {
}
MyCtrl1.$inject = ['a', 'b'];
if (true) {
    // proper scope analysis including shadowing
    let MyCtrl1 = ['c', function(c) {
    }]
    angular.module("MyMod").directive("foo", MyCtrl1);
}
angular.module("MyMod").controller("bar", MyCtrl1);
function MyCtrl2(z) {
}
MyCtrl2.$inject = ['z'];
funcall(/*@ngInject*/ MyCtrl2); // explicit annotation on reference flows back to definition
