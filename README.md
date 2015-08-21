<img src="https://raw.githubusercontent.com/formly-js/angular-formly/master/other/logo/angular-formly-logo-64px.png" alt="angular-formly logo" title="angular-formly" align="right" width="64" height="64" />

## [angular-formly](http://docs.angular-formly.com)

Status:
[![bower version](https://img.shields.io/bower/v/angular-formly.svg?style=flat-square)](https://www.npmjs.org/package/angular-formly)
[![npm version](https://img.shields.io/npm/v/angular-formly.svg?style=flat-square)](https://www.npmjs.org/package/angular-formly)
[![npm downloads](https://img.shields.io/npm/dm/angular-formly.svg?style=flat-square)](http://npm-stat.com/charts.html?package=angular-formly&from=2015-01-01)
[![Build Status](https://snap-ci.com/formly-js/angular-formly/branch/master/build_image)](https://snap-ci.com/formly-js/angular-formly/branch/master)
[![Code Coverage](https://img.shields.io/codecov/c/github/formly-js/angular-formly.svg?style=flat-square)](https://codecov.io/github/formly-js/angular-formly)

Links:
[![Documentation](https://img.shields.io/badge/API-Docs-red.svg?style=flat-square)](http://docs.angular-formly.com)
[![Examples](https://img.shields.io/badge/formly-examples-green.svg?style=flat-square)](http://angular-formly.com)
[![mailing list](https://img.shields.io/badge/mailing-list-orange.svg?style=flat-square)](https://groups.io/org/groupsio/formly-js)
[![egghead.io lessons](https://img.shields.io/badge/egghead-lessons-blue.svg?style=flat-square)](https://egghead.io/playlists/advanced-angular-forms-with-angular-formly)
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

## [Learning](http://learn.angular-formly.com)

### Egghead.io Lessons

I'm an [egghead.io](https://egghead.io/) author and I have made a handful of lessons available there for free [here](https://egghead.io/playlists/advanced-angular-forms-with-angular-formly)

### NG-NL Talk

[![JavaScript Powered Forms](other/ng-nl-talk.png)](http://youtu.be/o90TMDL3OYc)

### Examples

[The website](http://angular-formly.com/) is full of tons of examples.

### More

Find more resources at [learn.angular-formly.com](http://learn.angular-formly.com)

## Documentation

Find all the documentation at [docs.angular-formly.com](http://docs.angular-formly.com).

## Getting Help

Please don't file an issue unless you feel like you've found a bug or have a feature request. Instead, go to [help.angular-formly.com](http://help.angular-formly.com) and follow the instructions.

## Roadmap

See the [issues labeled enhancement](https://github.com/formly-js/angular-formly/labels/enhancement)

## Contributing

Please see the [CONTRIBUTING Guidelines](CONTRIBUTING.md).

**Note**: This projects adheres to a [Code of Conduct](CODE_OF_CONDUCT.md).

## Bookmark Links

You can bookmark these :-)

- [http://help.angular-formly.com](http://help.angular-formly.com)
- [http://question.angular-formly.com](http://question.angular-formly.com)
- [http://issue.angular-formly.com](http://issue.angular-formly.com)
- [http://new-example.angular-formly.com](http://new-example.angular-formly.com)
- [http://egghead.angular-formly.com](http://egghead.angular-formly.com)
- [http://changelog.angular-formly.com](http://changelog.angular-formly.com)
- [http://chat.angular-formly.com](http://chat.angular-formly.com)
- [http://mailing-list.angular-formly.com](http://mailing-list.angular-formly.com)
- [http://learn.angular-formly.com](http://learn.angular-formly.com)
- [http://questions.angular-formly.com](http://questions.angular-formly.com)

## Thanks

A special thanks to [Nimbly](http://gonimbly.com) for creating angular-formly.
This library is maintained (with love) by me, [Kent C. Dodds](https://twitter.com/kentcdodds).
Thanks to all [contributors](https://github.com/formly-js/angular-formly/graphs/contributors)!

