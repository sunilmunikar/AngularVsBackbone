define(['backbone'],

    function (backbone) {
        'use strict';

        var productModel = backbone.Model.extend({
            idAttribute: "Id"
        });

        return productModel;
    });
