define([
        "underscore",
        "backbone"],
    function(_, backbone) {
        var aggregator = _.extend({}, backbone.Events);
        return aggregator;
    });