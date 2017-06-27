define(['Base'], function(StateBase){

    'use strict';

     var StateIdle = function (id, owner) {

        StateBase.call(this, id, owner);
        this.initialState = true;

    };

    StateIdle.prototype = Object.create(StateBase.prototype);
    StateIdle.prototype.constructor = StateIdle;

    StateIdle.prototype.Enter = function (params) {
        this.isFinished = false;
    };

    return StateIdle;

});