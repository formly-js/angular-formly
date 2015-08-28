var exec = require('child_process').exec;

var GH_TOKEN = process.env.GH_TOKEN;
var repo = require('../package.json').repository.url;

if (!(process.env.CI && GH_TOKEN && repo)) {
  process.exit(1);
}

console.log('Setting origin to ' + repo);

exec('git remote set-url origin ' + repo.replace('https://', 'https://' + GH_TOKEN + '@') + ' && ');
exec('git config --global user.email formly-js@angular-formly.com && ');
exec('git config --global user.name "formly-bot"');
