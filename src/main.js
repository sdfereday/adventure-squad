require([
    'Hero',
    'Chance',
    'data',
    'helpers'
], function (Hero, Chance, data, helpers) {

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

    // Global manager
    var GameManager = {

        hero: null,
        globalWallet: 0,

        startup: function () {
            this.hero = new Hero(1, 1);
            helpers.log(this.hero.name + " entered the fray.");
        },
        update: function () {
            this.hero.Update();
        },

        visit: function (str) {
            var loc = data.getLocation(str);
            let self = this;
            if (!loc) {
                throw "No such place.";
            }
            this.hero.SetDestination(loc, function (loc) {
                if (loc.type != 'undefined' && loc.type === data.locationTypes.HOME) {

                    let goldAdded = self.hero.TakeFromWallet(10);
                    self.globalWallet += goldAdded;

                    self.hero.AddExp(chance.integer({min: 20, max: 100}));

                    if(goldAdded === 0) {
                        helpers.log(self.hero.name + " returned to the guild empty handed...");
                        return;
                    }

                    helpers.log(self.hero.name + " returned to the guild and added " + goldAdded + " gold to the treasurey.");
                    helpers.log(self.hero.name + " kept the rest for himself and has " + self.hero.wallet + " gold to his name.");

                } else {
                    let n = chance.integer({min: 20, max: 200});
                    self.hero.AddToWallet(n); // Get this from data in future
                    helpers.log(self.hero.name + " found " + n + " gold.");
                }
            });
        }

    };

    // Run
    GameManager.startup();
    gameloop(function (dt) {
        GameManager.update();
    });

    document.getElementById("dungeon").addEventListener('click', function () {
        GameManager.visit("Dungeon Of The Nameless");
    });

    document.getElementById("guild").addEventListener('click', function () {
        GameManager.visit("Guild Of Steve");
    });

});