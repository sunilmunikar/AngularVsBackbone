requirejs.config({
    "baseUrl": "js",
    "paths": {
        "jquery": "//code.jquery.com/jquery"
    },
    shim: {
        underscore: { exports: '_' },
        bootstrap: { deps: ['jquery'] },
        handlebars: { exports: 'Handlebars'},
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