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
    var GameManager = {

        heroes: [],
        hero: null,

        Startup: function () {
            this.hero = new Hero(1, 1);
            helpers.log(this.hero.name + " entered the fray.");
        },

        Update: function () {

            this.hero.Update();

            // Currently delving at destination
            if (this.hero.isDelving) {

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

                    helpers.log(">");
                    helpers.log("Found something shiny >");

                    this.hero.AddToWallet(travelActions.FindGold());

                    return;

                }

            }

            // Currently travelling to a destination
            if (this.hero.isTravelling) {

                if (chance.weighted([0, 1], [0.99, 0.01])) {

                    helpers.log(">");
                    helpers.log("Rested >");

                    return;

                }

            }

            // Resting, eating, inn, commerce, etc...

        },

        Visit: function (str) {

            var loc = data.map.GetLocation(str);

            if (!loc)
                throw "No such place.";

            this.hero.SetDestination.call(this, loc, function (loc) {

                if (loc.type === 'undefined')
                    return;

                if (loc.type === data.locationTypes.HOME) {

                    // If success, get gold, info, etc.
                    // ...

                    let goldAdded = this.hero.TakeFromWallet(gameGlobals.takePercentage);
                    data.AddToWallet(goldAdded);

                    this.hero.AddExp(systemActions.GenerateExp());

                    if (goldAdded === 0) {
                        helpers.log(this.hero.name + " returned to the guild empty handed...");
                        return;
                    }

                    helpers.log(this.hero.name + " returned to the guild and added " + goldAdded + " gold to the treasurey.");
                    helpers.log(this.hero.name + " kept the rest for himself and has " + this.hero.wallet + " gold to his name.");

                    if(this.hero.carries)
                        userData.keyItems.push( this.hero.RemoveKeyItem() );


                } else if (loc.type === data.locationTypes.DUNGEON) {

                    // Ignoring a last boss factor
                    this.hero.AddKeyItem("someItemIdInDungeon");

                    if (this.hero.carries) {
                        helpers.log(this.hero.name + " acquired the key item {{itemName}} and is returning to the guild!");
                        GameManager.Visit("Guild Of Steve");
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