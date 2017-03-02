    (function () {

    'use strict';

    angular.module('app.home')
        .directive('tmplHome', directiveFunction)
        .controller('HomeController', ControllerFunction)
        .controller('DeleteController', DeleteControllerFunction);


    // ----- directiveFunction -----
    directiveFunction.$inject = [];

    /* @ngInject */
    function directiveFunction() {

        var directive = {
            restrict: 'E',
            templateUrl: 'components/home/home.html',
            scope: {
            },
            controller: 'HomeController',
            controllerAs: 'vm'
        };

        return directive;
    }


    // ----- ControllerFunction -----
    ControllerFunction.$inject = ['logger','HomeService','$mdDialog', '$rootScope', 'PostService'];

    /* @ngInject */
    function ControllerFunction(logger, HomeService, $mdDialog, $rootScope, PostService) {

        var vm = this;

        vm.posts = [];
        vm.post = {};
        vm.pager = {};
        vm.pager.itemsPerPage = '12';



        $rootScope.$on('post_update', function(event, data) {
            activate();
        });



        vm.getPosts = function (page) {
            let currentPage = page || 1;

            PostService.getPosts(currentPage, vm.pager.itemsPerPage).then(function(response) {
                if (response && response.data) {
                    vm.posts = response.data.posts;
                    vm.pager.totalOfPager = response.data.meta.pagination.total_pages;
                    vm.pager.currentPage = response.data.meta.pagination.current_page;
                }
            });
        }

        vm.showDialog = function(post) {

            $mdDialog.show({
                templateUrl: 'components/home/delete-dialog.html',
                controller: 'DeleteController',
                controllerAs: 'vm',
                 locals : {
                    post : post
                }
            });
        }

        function _init() {
            vm.getPosts(1);
        }

        _init();
    }

    // ----- DeleteFunction -----
    DeleteControllerFunction.$inject = ['$scope', 'post', 'HomeService', '$mdDialog'];

    function DeleteControllerFunction($scope, post, HomeService, $mdDialog) {
        var vm = this;
        $scope.post = post;

        vm.remove = function() {

            HomeService.delete($scope.post.id).then(function() {

            }).finally(function() {
                $scope.$emit('post_update', 1);
                $mdDialog.hide();
            });
        }

        vm.hideDialog = function() {
            $mdDialog.hide();
        }
    }

})();
