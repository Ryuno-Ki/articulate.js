System.register([], function (exports, module) {
    'use strict';
    return {
        execute: function () {

            exports('default', index);
            var config$1 = config = {
                rate: 1.10,
                pitch: 1,
                volume: 1
            }

            function index () {
                console.log('Config', config$1);
            }

        }
    };
});
