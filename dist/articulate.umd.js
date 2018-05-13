(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.Articulate = factory());
}(this, (function () { 'use strict';

    var config$1 = config = {
        rate: 1.10,
        pitch: 1,
        volume: 1
    }

    function index () {
        console.log('Config', config$1);
    }

    return index;

})));
