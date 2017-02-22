(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(configFunction);

    configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider'];

    /* @ngInject */
    function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                template: '<tmpl-home></tmpl-home>'
            })

            .state('quickstart', {
                url: '/quickstart',
                template: '<tmpl-quickstart></tmpl-quickstart>'
            })

            .state('edit', {
                url: '/post/edit/:id',
                template: '<tpl-post></tpl-post>'
            })

            .state('add', {
                url: '/post/new',
                template: '<tpl-post></tpl-post>',
            })

    }
})();