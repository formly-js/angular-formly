var exec = require('child_process').exec;

var GH_TOKEN = process.env.GH_TOKEN;
var repo = require('../package.json').repository.url;

if (!(process.env.CI && GH_TOKEN && repo)) {
  process.exit(1);
}

exec('git remote set-url origin ' + repo.replace('https://', 'https://' + GH_TOKEN + '@') + ' && ');
exec('git config user.email formly-js@angular-formly.com && ');
exec('git config user.name "formly-bot"');
