'use strict';

angular.module('services.exceptionHandler', ['services.notifications']);

angular.module('services.exceptionHandler')
    .factory('exceptionHandlerFactory', ['$injector', function ($injector) {
        return function ($delegate) {
            return function (exception, cause) {
                var notifications = $injector.get('notifications');

                $delegate(exception, cause);

                notifications.pushForCurrentRoute({
                    title: 'Error',
                    body: exception + " => " + cause,
                    type: 'error'});
            };
        };
    }]);

angular.module('services.exceptionHandler')
    .config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', 'exceptionHandlerFactory', function ($delegate, exceptionHandlerFactory) {
            return exceptionHandlerFactory($delegate);
        }]);
    }])