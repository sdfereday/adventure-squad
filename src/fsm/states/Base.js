define(function(){

    'use strict';

    var StateBase = function (id, owner) {
        this.id = id || "unset";
        this.owner = owner;
        this.isFinished = false;
    };

    StateBase.prototype.Update = function () {
        // ...
    };

    StateBase.prototype.Enter = function (params) {
        this.isFinished = false;
    };

    StateBase.prototype.Exit = function () {
        this.isFinished = true;
    };

    return StateBase;

});