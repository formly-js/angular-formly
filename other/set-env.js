module.exports = setEnv;
const prefix = '--set-env-';

function setEnv(argv = []) {
  argv
    .filter(a => a.indexOf(prefix) === 0)
    .map(a => a.substring(prefix.length).split('='))
    .forEach(a => process.env[a[0]] = a[1]);
}
