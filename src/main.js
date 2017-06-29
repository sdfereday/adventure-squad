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

    // Game automated actions
    let travelActions = {

        // Acquisiton
        FindGold: function () {
            return chance.integer({ min: 20, max: 200 });
        },

        FindItem: function () {
            // ...
        },

        FightMonster: function () {
            // ...
        },

        // Usage
        UseItem: function () {
            // ...
        }

    };

    let systemActions = {

        GenerateExp: function () {
            return chance.integer({ min: 20, max: 100 });
        }

    };

    // Global manager
    var GameManager = {

        heroes: [],
        hero: null,

        Startup: function () {
            this.hero = new Hero(1, 1);
            helpers.log(this.hero.name + " entered the fray.");
        },

        Update: function () {

            this.hero.Update();

            if (this.hero.isTravelling) {

                helpers.log("= ", true);

                if (chance.weighted([0, 1], [0.99, 0.01])) {

                    if (!this.hero.HasItem("sandwich"))
                        return;

                    helpers.log(">");
                    helpers.log("Ate a sandwich >");

                    this.hero.RemoveItem("sandwich", 1);

                }

                if (chance.weighted([0, 1], [0.999, 0.01])) {

                    helpers.log(">");
                    helpers.log("Killed a Gnoll >");

                    this.hero.AddToWallet( travelActions.FindGold() );
                    this.hero.AddExp(systemActions.GenerateExp());

                }

            }

        },

        Visit: function (str) {

            var loc = data.map.GetLocation(str);

            if (!loc)
                throw "No such place.";

            this.hero.SetDestination.call(this, loc, function (loc) {

                if (loc.type != 'undefined' && loc.type === data.locationTypes.HOME) {

                    let goldAdded = this.hero.TakeFromWallet(gameGlobals.takePercentage);
                    data.AddToWallet(goldAdded);

                    this.hero.AddExp(systemActions.GenerateExp());

                    if (goldAdded === 0) {
                        helpers.log(this.hero.name + " returned to the guild empty handed...");
                        return;
                    }

                    helpers.log(this.hero.name + " returned to the guild and added " + goldAdded + " gold to the treasurey.");
                    helpers.log(this.hero.name + " kept the rest for himself and has " + this.hero.wallet + " gold to his name.");

                } else {

                    let n = travelActions.FindGold();

                    this.hero.AddToWallet(n); // Get this from data in future
                    helpers.log(this.hero.name + " found " + n + " gold.");

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

    document.getElementById("guild").addEventListener('click', function () {
        GameManager.Visit("Guild Of Steve");
    });

});