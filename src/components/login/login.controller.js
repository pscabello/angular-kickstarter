(function() {

    'use strict';

    angular
        .module('app.login')
        .controller('LoginController', ControllerFunction);

        // ----- ControllerFunction -----
        ControllerFunction.$inject = ['$mdDialog', 'CoreUserService', '$state', '$rootScope','$translatePartialLoader'];

        /* @ngInject */
        function ControllerFunction($mdDialog, CoreUserService, $state, $rootScope, $translatePartialLoader) {

            var vm = this;
            vm.password = null;
            vm.username = null;
            vm.newUser = false;
            vm.handleCancel = handleCancel;
            vm.handleSubmit = handleSubmit;
            $translatePartialLoader.addPart('login');

            function signIn(user) {
                CoreUserService.login(user)
                    .then(function(response) {
                        CoreUserService.setCurrentUser(response.data);
                        $rootScope.$broadcast('authorized');
                        $state.go('private.home');
                    });
            }

            function register(user) {
                CoreUserService.register(user)
                    .then(function(response) {
                        login(user)
                    });
            }

            function handleSubmit(user) {
                vm.newUser ? register(user) : signIn(user);
            }

            function handleCancel() {
                return $mdDialog.hide();
            }
        }

})();
