function YourCtrl() {
  var vm = this;

  vm.user = {};

  vm.userFields = [
    {
      key: 'email',
      type: 'email',
      label: 'Email address',
      placeholder: 'Enter email'
    },
    {
      key: 'password',
      type: 'password',
      label: 'Password',
      placholder: 'Password'
    },
    {
      key: 'file',
      type: 'file',
      label: 'File input',
      description: 'Example block-level help text here'
    },
    {
      key: 'checked',
      type: 'checkbox',
      label: 'Check me out'
    }
  ];
}
