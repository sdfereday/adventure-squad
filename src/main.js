require([
    'Hero',
    'Chance',
    'data',
    'helpers'
], function (Hero, Chance, data, helpers) {

    /*
    
    Notes:
    Use the squadron dynamic in FFXIV to ensure that a simple approach is kept. So if can replicate that,
    it's a winner:

    - One room that has a recruitment table for new heroes (and a max number),
    - Has a board to assign training,
    - Has a board / thing to assign missions / adventures as a group or individual,
    - Has an area to hold gold & items,
    - Each hero to have own set of stats (nothing major, just hp, def, att and a job class)

    That's all that is needed for now. As the guild grows in strength, more things will become available
    such as fame, etc.

    At present there are real world locations that the heroes go to, this adds a layer of immersion. However it 
    also adds a level of complexity. So if it gets a bit much, just simply send the heroe(s) out for a time and
    calculate chance on return.
    
    */

    'use strict';

    var chance = new Chance();

    var gameloop = (function () {

        var reqAnimFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

        return function (callback) {
            var lastUpdate = +new Date();
            (function loop() {
                callback(((+new Date()) - lastUpdate) / 1000);
                reqAnimFrame(loop);
                lastUpdate = +new Date();
            }());
        };

    }());

    // Game global settings
    let gameGlobals = {
        // Amount of currency that heroes have to pay on their return to the guild from an adventure
        takePercentage: 10
    };

    // Game automated actions (singleton)
    let travelActions = {

        FindGold: function () {
            return chance.integer({ min: 20, max: 200 });
        },

        Rest: function () {
            // ...
        }

    };

    let systemActions = {

        GenerateExp: function () {
            return chance.integer({ min: 20, max: 100 });
        }

    };

    // Global manager
    let GameManager = {

        heroes: [],

        Startup: function () {
            
            this.heroes.push(new Hero(1, 1, "Jake"), new Hero(2, 2, "Tia"));

        },

        Update: function () {

            this.heroes.forEach(x => x.Update());
            // Resting, eating, inn, commerce, etc states would be good.

        },

        Visit: function (str) {

            let loc = data.map.GetLocation(str);

            if (!loc)
                throw "No such place.";

            this.hero.SetDestination.call(this.hero, loc, function (loc) {

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

                    if(!this.delving && !this.carries) {

                        // We just got here, so start delving for things (TODO: Push states rather than bools to measure what's going on)
                        this.isDelving = true;
                        
                        let self = this;

                        setTimeout(function(){
                            
                            self.isDelving = false;
                            GameManager.Visit("Guild Of Steve");

                            // Ignoring a last boss factor
                            self.AddKeyItem("Nameless Mask");

                            if (self.carries) {

                                helpers.log(self.name + " acquired the key item {{itemName}} and is returning to the guild!");

                            } else {

                                helpers.log(self.name + " is returning to the guild empty-handed...");

                            }

                        }, 10000);
                        
                    }

                }

            });
        }

    };

    // Run
    GameManager.Startup();

    gameloop(function (dt) {
        GameManager.Update();
    });

    document.getElementById("dungeon").addEventListener('click', function () {
        GameManager.Visit("Dungeon Of The Nameless");
    });

});