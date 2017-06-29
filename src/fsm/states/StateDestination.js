define(['Base', 'helpers', 'chance', 'data', 'gameManager', 'gameGlobals'], function (StateBase, helpers, chance, data, gameManager, gameGlobals) {

    'use strict';

    var StateDestination = function (id, owner) {

        StateBase.call(this, id, owner);
        this.initialState = true;

    };

    StateDestination.prototype = Object.create(StateBase.prototype);
    StateDestination.prototype.constructor = StateDestination;

    StateDestination.prototype.Enter = function (location, cb) {

        this.isFinished = false;

        let loc = data.map.GetLocation(location);
        let self = this;

        if (!loc)
            throw "No such place.";

        this.owner.SetDestination.call(this.owner, loc, function (loc) {

            //// Again, these should be in a state that sits on the hero.
            /// Fired on destination reached
            if (loc.type === 'undefined')
                return;

            if (loc.type === data.locationTypes.HOME) {

                // If success, get gold, info, etc.
                // ...

                let goldAdded = this.TakeFromWallet(gameGlobals.takePercentage);
                data.user.AddToWallet(goldAdded);

                this.AddExp(systemActions.GenerateExp());

                if (goldAdded === 0) {
                    helpers.log(this.hero.name + " returned to the guild empty handed...");
                    return;
                }

                helpers.log(this.name + " returned to the guild and added " + goldAdded + " gold to the treasury.");
                helpers.log(this.name + " kept the rest for himself and has " + this.wallet + " gold to his name.");

                if (this.carries) {
                    data.user.keyItems.push(this.GetKeyItem());
                    this.RemoveKeyItem();
                    helpers.log("The guild treasury now has a " + this.carries + " in storage.");
                }

            } else if (loc.type === data.locationTypes.DUNGEON) {

                if (!this.delving && !this.carries) {

                    // We just got here, so start delving for things (TODO: Push states rather than bools to measure what's going on)
                    this.isDelving = true;

                    //// TODO: Re-write how this functionality works. I'm not sure it's quite right...
                    let self = this;

                    // We've hit the dungeon, change to the 'delve' state then run set timeout below.
                    setTimeout(function () {

                        self.isFinished = true;
                        self.isDelving = false;
                        gameManager.Visit("Guild Of Steve");

                        // Ignoring a last boss factor
                        self.AddKeyItem("Nameless Mask");

                        if (self.carries) {

                            helpers.log(self.name + " acquired the key item {{itemName}} and is returning to the guild!");

                        } else {

                            helpers.log(self.name + " is returning to the guild empty-handed...");

                        }

                    }, 3000);

                }

            }

        });

    };

    return StateDestination;

});