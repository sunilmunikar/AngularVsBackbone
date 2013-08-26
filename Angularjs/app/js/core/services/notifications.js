'use strict';

angular.module('services.notifications', [])

angular.module('services.notifications')
    .factory('Notifications', ['$rootScope', function ($rootScope) {
        var notifications = {
            'ROUTE_CURRENT' : [],
            'ROUTE_NEXT' : []
        };
//        var notificationObj = {title: '', body: '', type: ''};

        var notificationsService = {};

        $rootScope.$on('$routeChangeSuccess', function () {
            notifications.ROUTE_CURRENT.length = 0;

            notifications.ROUTE_CURRENT = angular.copy(notifications.ROUTE_NEXT);
            notifications.ROUTE_NEXT.length = 0;
        });

        var addNotification = function (notificationsArray, notificationObj) {
            if (!angular.isObject(notificationObj)) {
                throw new Error("Only object can be added to the notification service");
            }
            notificationsArray.push(notificationObj);
            return notificationObj;
        }

        notificationsService.getCurrent = function () {
            return notifications.ROUTE_CURRENT;
        }

        notificationsService.pushForCurrentRoute = function(notification){
            return addNotification(notifications.ROUTE_CURRENT, notification);
        }

        notificationsService.pushForNextRoute = function (notification) {
            return addNotification(notifications.ROUTE_NEXT, notification);
        }

        notificationsService.remove = function(notification){
            angular.forEach(notifications, function (notificationsByType) {
                var idx = notificationsByType.indexOf(notification);
                if (idx>-1){
                    notificationsByType.splice(idx,1);
                }
            });
        };

        notificationsService.removeAll = function(){
            angular.forEach(notifications, function (notificationsByType) {
                notificationsByType.length = 0;
            });
        };

        return notificationsService;
    }])