requirejs.config({
    "baseUrl": "js",
    "paths": {
        "jquery": "//code.jquery.com/jquery"
    },
    shim: {
        underscore: {
            exports: '_'
        },
        bootstrap: { deps: ['jquery'] },
        backbone: {
            deps: [
				'underscore',
				'jquery'
            ],
            exports: 'Backbone'
        },
    }
});

require([
    "views/master",
    "bootstrap"
], function (masterView, bootstrap) {
    // this is where all the site code should begin
    new masterView().render();
});