<img src="https://raw.githubusercontent.com/formly-js/angular-formly/master/other/logo/angular-formly-logo-64px.png" alt="angular-formly logo" title="angular-formly" align="right" width="64" height="64" />

## [angular-formly](http://docs.angular-formly.com)

Status:
[![bower version](https://img.shields.io/bower/v/angular-formly.svg?style=flat-square)](https://www.npmjs.org/package/angular-formly)
[![npm version](https://img.shields.io/npm/v/angular-formly.svg?style=flat-square)](https://www.npmjs.org/package/angular-formly)
[![npm downloads](https://img.shields.io/npm/dm/angular-formly.svg?style=flat-square)](http://npm-stat.com/charts.html?package=angular-formly&from=2015-01-01)
[![Build Status](https://img.shields.io/travis/formly-js/angular-formly.svg?style=flat-square)](https://travis-ci.org/formly-js/angular-formly)

Links:
[![Documentation](https://img.shields.io/badge/API-Docs-red.svg?style=flat-square)](http://docs.angular-formly.com)
[![Examples](https://img.shields.io/badge/formly-examples-green.svg?style=flat-square)](http://angular-formly.com)
[![mailing list](https://img.shields.io/badge/mailing-list-orange.svg?style=flat-square)](https://groups.io/org/groupsio/formly-js)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/formly-js/angular-formly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

angular-formly is an AngularJS module which has a directive to help customize and render JavaScript/JSON configured forms.
The `formly-form` directive and the `formlyConfig` service are very powerful and bring unmatched maintainability to your
application's forms.

```html
<form name="vm.someForm" ng-submit="vm.handleSubmit()">
  <formly-form model="vm.model" fields="vm.fields" options="vm.options">
    <button type="submit" ng-disabled="vm.someForm.$invalid">Submit</button>
    <button type="button" ng-click="vm.options.resetModel()">Reset</button>
  </formly-form>
</form>
```

From there, it's just JavaScript. Allowing for DRY, maintainable, reusable forms.

## Learning

### Egghead.io Lessons

- [Introduction](https://egghead.io/lessons/angularjs-introduction-to-angular-formly)
- [Bug me](/../../issues/219) for more...

### NG-NL Talk

[![JavaScript Powered Forms](other/ng-nl-talk.png)](http://youtu.be/o90TMDL3OYc)

### Examples

[The website](http://formly-js.github.io/angular-formly/) is full of tons of examples.

## Documentation

Find all the documentation at [docs.angular-formly.com](http://docs.angular-formly.com).

## Roadmap

See the [issues labeled enhancement](https://github.com/formly-js/angular-formly/labels/enhancement)

## Contributing

Please see the [CONTRIBUTING Guidelines](CONTRIBUTING.md).

## Bookmark Links

You can bookmark these :-)

- [http://new-example.angular-formly.com](http://new-example.angular-formly.com)
- [http://egghead.angular-formly.com](http://egghead.angular-formly.com)
- [http://changelog.angular-formly.com](http://changelog.angular-formly.com)
- [http://chat.angular-formly.com](http://chat.angular-formly.com)
- [http://mailing-list.angular-formly.com](http://mailing-list.angular-formly.com)
- [http://learn.angular-formly.com](http://learn.angular-formly.com)

## Thanks

A special thanks to [Nimbly](http://gonimbly.com) for creating angular-formly.
Thanks to [Kent C. Dodds](https://github.com/kentcdodds) for his continued support on the project.
