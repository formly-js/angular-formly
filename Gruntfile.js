var os = require('os');
var cachDir = path.join(os.tmpdir(), '/formly-gh-pages');

module.exports = function(grunt) {

  grunt.initConfig({
    'gh-pages': {
      options: {
        base: 'demo',
        clone: cachDir,
        message: 'Update ' + Date.now() + ' ' + getRandomEmoji()
      },
      src: ['index.html', 'bundle.js', 'res/**/*']
    },
  });

  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('deploy', ['webpackAllTheThings', 'gh-pages']);
};


function getRandomEmoji() {
  var emoji = [
    '(╯°□°)╯︵ ┻━┻',
    'ʕ •ᴥ•ʔ',
    'ლ(ಠ益ಠლ)',
    'ಠ_ಠ',
    '~=[,,_,,]:3',
    '(ó ì_í)=óò=(ì_í ò)',
    '¯\\_(ツ)_/¯',
    'ᕙ(⇀‸↼‶)ᕗ',
    '┬┴┬┴┤(･_├┬┴┬┴'
  ];
  return emoji[Math.floor(Math.random() * (emoji.length - 1))];
}
