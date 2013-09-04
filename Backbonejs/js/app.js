requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: "//code.jquery.com/jquery",
        backbone: "lib/backbone",
        bootstrap: "lib/bootstrap",
        text: "lib/text",
        underscore: "lib/underscore",
        handlebars: "lib/handlebars",
        relational: "lib/relational",
        notifier: "helpers/notifier",
        aggregator: "helpers/aggregator"
    },
    shim: {
        underscore: { exports: '_' },
        bootstrap: { deps: ['jquery'] },
        handlebars: { exports: 'Handlebars' },
        backbone: {
            deps: [
				'underscore',
				'jquery'
            ],
            exports: 'Backbone'
        },
        "relational": {
            deps: ["backbone"],
            exports: 'Backbone'
        }
    }
});

require([
    "views/master",
    "bootstrap",
    "relational"
], function (masterView, bootstrap, relational) {
    // this is where all the site code should begin
    new masterView().render();
});