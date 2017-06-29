define(['Base'], function (StateBase) {

    'use strict';

    var StateDelve = function (id, owner) {

        StateBase.call(this, id, owner);
        this.initialState = true;

    };

    StateDelve.prototype = Object.create(StateBase.prototype);
    StateDelve.prototype.constructor = StateDelve;

    StateDelve.prototype.Enter = function (params) {
        this.isFinished = false;
    };

    StateDelve.prototype.Update = function () {

        helpers.log("= ", true);

        if (chance.weighted([0, 1], [0.99, 0.01])) {

            helpers.log(">");
            helpers.log("Rested >");

            return;

        }

        if (chance.weighted([0, 1], [0.999, 0.01])) {

            helpers.log(">");
            helpers.log("Killed a Nameless Gnoll >");

            this.hero.AddToWallet(travelActions.FindGold());
            this.hero.AddExp(systemActions.GenerateExp());

            return;

        }

        if (chance.weighted([0, 1], [0.99, 0.01])) {

            let g = travelActions.FindGold();

            helpers.log(">");
            helpers.log("Found " + g + " gold >");

            this.hero.AddToWallet(g);

            return;

        }

    };

    return StateDelve;

});