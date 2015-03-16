const ngModule = require('registerModule')(require('ngCommon'));
const stateUtils = require('stateUtils');

const formlyUsers = require('./components/data/users');
formlyUsers.forEach(user => {
  user.slug = user.slug || user.name.replace(/ /g, '-').replace(/\./g, '').toLowerCase();
});
require('./index.css');
require('./components')(ngModule);

module.exports = {
  name: ngModule.name,
  url: 'users',
  template: require('./index.html'),
  data: {
    activationEvents: 'showUsers'
  },
  children: require('./children'),
  resolve: {
    users: stateUtils.resolveIdentity(formlyUsers)
  },
  controllerAs: 'vm',
  controller: /*@ngInject*/ function(users) {
    var vm = this;
    vm.users = users;
    vm.inDetails = inDetails;

    function inDetails() {
      return stateUtils.includes('users/');
    }
  }
};

