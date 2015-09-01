# Contributing

## Watch the videos

I've recorded several screencasts to demonstrate how to contribute.
Here's [a playlist](https://www.youtube.com/playlist?list=PLV5CVI1eNcJi7lVVIuNyRhEuck1Z007BH) of them all. You'll find
individual links by the respective sections

## Questions/Help

[Watch video](https://www.youtube.com/watch?v=NXqFiSeBE-M&list=PLV5CVI1eNcJi7lVVIuNyRhEuck1Z007BH&index=2)

An example will get you help faster than anything else you do. Create an example by going to
[help.angular-formly.com](http://help.angular-formly.com)

Please post questions to [StackOverflow](http://stackoverflow.com/) using the
[angular-formly](http://stackoverflow.com/tags/angular-formly/info) tag. There's also the
[mailing list](https://groups.io/org/groupsio/formly-js) where you can ask/answer questions. Also join us on
[gitter](https://gitter.im/formly-js/angular-formly).

If you file an issue with a question, it will be closed. I'm not trying to be mean. I'm just trying to stay sane. :-)

## Reporting Bugs / Requesting Features

[Watch video](https://www.youtube.com/watch?v=Kw9fVgc3Tzk&index=6&list=PLV5CVI1eNcJi7lVVIuNyRhEuck1Z007BH)

If you've found an issue, please submit it in [the issues](https://github.com/formly-js/angular-formly/issues)
with a link to a jsbin that demonstrates the issue with [issue.angular-formly.com](http://issue.angular-formly.com)

## Pull Requests

[Watch video](https://www.youtube.com/watch?v=QOchwBm9W-g&list=PLV5CVI1eNcJi7lVVIuNyRhEuck1Z007BH&index=1)

If you would like to add functionality, please submit [an issue](https://github.com/formly-js/angular-formly/issues)
first to make sure it's a direction we want to take.

Please do the following:
* Follow the existing styles (we have an `.editorconfig` file)
* Document your changes in the README (try to follow the convention you see in the rest of the file)
* Create an example for the website that demonstrates your changes so people can see how your changes work

### Development

1. run `npm install`
2. run `npm start` (if you're on a windows machine, see [this issue](https://github.com/formly-js/angular-formly/issues/305))
3. write tests & code in ES6 goodness :-)
4. run `git add src/`
5. run `npm run commit` and follow the prompt (this ensures that your commit message follows [our conventions](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)).
6. notice that there's a pre-commit hook that runs to ensure tests pass and coverage doesn't drop to prevent the build from breaking :-)
7. push your changes
8. create a PR with a link to the original issue
9. wait patiently :-)

#### Notes

- Please don't commit any changes to the `dist/` directory. This is only committed for releases.
- Due to some inconsistencies with angular versions, always use `require('angular-fix')` rather than simply `require('angular')`
- If you wish to view your changes visually, you can play around with it in the `local-examples` directory. Don't commit anything in this directory, but it's a good sanity check. It's just straight JavaScript with an `index.html`. I recommend `http-server`.

### What do you need help with?

#### Helping others!

There are a lot of questions from people as they get started using angular-formly. If you could **please do the following things**, that would really help:

- Subscribe to the `angular-formly` questions [RSS Feed](http://stackoverflow.com/feeds/tag?tagnames=angular-formly&sort=newest) on StackOverflow. You can use this free service: [Blogtrottr](https://blogtrottr.com) to have it email you with new questions.
- Hang out on [the chat](http://chat.angular-formly.com)
- Sign up on [the mailing list](http://mailing-list.angular-formly.com)
- Watch the [angular-formly repositories](https://github.com/formly-js) for issues or requests that you could help with (like [angular-formly-website](https://github.com/formly-js/angular-formly-website) for requests for examples).

#### Contributing to community

- Write blog posts! Like [this one](https://scotch.io/tutorials/easy-angularjs-forms-with-angular-formly) or [this one](http://www.erwan-datin.com/tips/how-do-I-store-angular-formly-fields-model-into-database)
- Record screencasts
- Write examples. The website is driven by examples. [Watch video](https://www.youtube.com/watch?v=4dsXXTPET4A&list=PLV5CVI1eNcJi7lVVIuNyRhEuck1Z007BH&index=3)

#### Contributing to the core

- Tests are always helpful! [Watch video](https://youtu.be/CQ766-miGQ4?list=PLV5CVI1eNcJi7lVVIuNyRhEuck1Z007BH)
- Any of the issues in GitHub, let us know if you have some time to fix one. Especially those labeled [PR Please!](https://github.com/formly-js/angular-formly/labels/PRs%20please%21)
