var exec = require('child_process').exec;

var command_line;
var environ;

switch(process.argv[2]) {
  case 'build':
    command_line = 'webpack --config ./node_modules/kcd-common-tools/shared/webpack.config.js --progress --colors';
    environ = (!process.argv[3].indexOf('prod')) ? 'production' : 'development';
    break;
  case 'test':
    command_line = 'karma start';
    environ = (!process.argv[3].indexOf('test:ci')) ? 'test:ci' : 'test';
    break;
}

if(process.platform === 'win32') {
  command_line = 'set NODE_ENV=' + environ + '&& ' + command_line;
} else {
  command_line = 'NODE_ENV=' + environ + ' ' + command_line;
}

var command = exec(command_line);

command.stdout.on('data', function(data) {
  process.stdout.write(data);
});
command.stderr.on('data', function(data) {
  process.stderr.write(data);
});
command.on('error', function(err) {
  process.stderr.write(err);
});
