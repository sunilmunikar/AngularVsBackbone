define([
        "underscore",
        "jquery"],
    function (_, $) {
        var notifier = function () {
            var notifications = [];

            function alert(timeout, kind, message, origin, location) {
                if (!location) { location = $(".alert-holder"); }

                var css = "alert";
                if (kind) { css += " alert-" + kind; }

                if (origin) {
                    clearOlderAlerts(origin);
                }

                var holder = createAlert(css, message, location, origin);

                if (timeout) {
                    setTimeout(_.partial(onTimeout, holder), timeout);
                }
            }

            function clearOlderAlerts(origin) {
                _.each(_.where(notifications, { origin: origin }), function (x) {
                    notifications.splice(_.indexOf(notifications, x), 1);
                    $(x.el).remove();
                });
            }

            function createAlert(css, message, location, origin) {
                var holder = $("<div/>")
                    .addClass(css)
                    .append("<button type='button' class='close' data-dismiss='alert'>&times;</button>")
                    .append(message)
                    .appendTo(location)
                    .alert()
                    .focus();

                notifications.push({ el: holder, origin: origin });

                return holder;
            }

            function onTimeout(holder) {
                if (holder) {
                    $(holder).remove();
                }
            }

            return {
                warning: _.partial(alert, null, null),
                error: _.partial(alert, null, "danger"),
                success: _.partial(alert, 3000, "success"),
                info: _.partial(alert, 3000, "info"),
            };
        };

        return new notifier();
    });