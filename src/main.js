require(['Chance'], function (Chance) {

    'use strict';

    var ch = new Chance();

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

    // Helpers
    function dist(v1, v2) {
        var a = v1.x - v2.x;
        var b = v1.y - v2.y;
        return Math.sqrt(a * a + b * b);
    }

    function log(str, nobreak) {

        var objDiv = document.getElementById("console");
        objDiv.scrollTop = objDiv.scrollHeight;

        if (nobreak) {
            document.getElementById("innerText").innerHTML += str
            return;
        }

        document.getElementById("innerText").innerHTML += str + "<br />";

    }

    // Global manager
    var GameManager = {

        hero: null,

        startup: function () {
            this.hero = new Hero(1, 1);
            log(this.hero.name + " entered the fray.");
        },
        update: function () {
            this.hero.Update();
        },

        visit: function (str) {
            var loc = getLocation(str);
            if (!loc) {
                throw "No such place.";
            }
            this.hero.SetDestination(loc);
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