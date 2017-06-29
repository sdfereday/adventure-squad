require([
    'Hero',
    'data',
    'helpers',
    'chance',
    'gameManager'
], function (Hero, data, helpers, chance, gameManager) {

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

    // Run
    gameManager.Startup();

    gameloop(function (dt) {
        gameManager.Update();
    });

    document.getElementById("dungeon").addEventListener('click', function () {
        gameManager.Visit("Dungeon Of The Nameless");
    });

});