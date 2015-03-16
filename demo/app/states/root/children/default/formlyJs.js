function YourCtrl() {
  var vm = this;

  vm.user = {};

  vm.userFields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'email',
        label: 'Email address',
        placeholder: 'Enter email'
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: 'Password'
      }
    },
    {
      key: 'file',
      type: 'file',
      templateOptions: {
        label: 'File input',
        description: 'Example block-level help text here',
        url: 'https://example.com/upload'
      }
    },
    {
      key: 'checked',
      type: 'checkbox',
      templateOptions: {
        label: 'Check me out'
      }
    }
  ];
}
