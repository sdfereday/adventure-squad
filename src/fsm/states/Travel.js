define(['Base', 'helpers', 'chance', 'data'], function (StateBase, helpers, chance, data) {

    'use strict';

    var StateTravel = function (id, owner) {

        StateBase.call(this, id, owner);

        this.params = {
            x: 0,
            y: 0
        };

        this.onComplete = null;

    };

    StateTravel.prototype = Object.create(StateBase.prototype);
    StateTravel.prototype.constructor = StateTravel;

    StateTravel.prototype.Update = function () {

        /// Update location values
        if (Math.abs(helpers.dist(this.params, {
            x: this.owner.x,
            y: this.owner.y
        })) > 1) {

            let x = 0;
            let y = 0;

            if (this.params.x < this.owner.x) {
                x = -1;
            } else {
                x = 1;
            }

            if (this.params.y < this.owner.y) {
                y = -1;
            } else {
                y = 1;
            }

            this.owner.Move(x, y);

        } else {
            helpers.log(">");
            this.isFinished = true;
        }

        /// Perform logic as travelling happening (TODO: Again these should also be states really. Sub states per say.)
        if (chance.weighted([0, 1], [0.99, 0.01])) {

            helpers.log(">");
            helpers.log("Rested >");

            return;

        } else {

            helpers.log(">", true);

        }

    };

    StateTravel.prototype.Enter = function (params, cb) {

        this.isFinished = false;

        this.params.x = params.x;
        this.params.y = params.y;

        if (typeof cb === 'function')
            this.onComplete = cb;

    };

    StateTravel.prototype.Exit = function (params) {

        helpers.log("Left state " + this.id);

        if (typeof this.onComplete === 'function')
            this.onComplete(this);

        this.onComplete = null;

    };

    return StateTravel;

});