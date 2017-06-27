define(function () {

    'use strict';

    return {
        log: function (str, nobreak) {

            var objDiv = document.getElementById("console");
            objDiv.scrollTop = objDiv.scrollHeight;

            if (nobreak) {
                document.getElementById("innerText").innerHTML += str
                return;
            }

            document.getElementById("innerText").innerHTML += str + "<br />";

        },
        dist: function (v1, v2) {
            var a = v1.x - v2.x;
            var b = v1.y - v2.y;
            return Math.sqrt(a * a + b * b);
        },
        calculateExp: function(currentLevel, exp, forLevel) {

            // TODO: Warning, does not cater for massive exp, this will need to be done!
            let n = forLevel - exp;
            let excess = 0;
            let newLevel = currentLevel;

            if(n < 0) {
                excess = n;
                newLevel += 1;
            }

            return {
                forNext: Math.floor(forLevel * 0.02),
                exp: forLevel - excess,
                level: newLevel
            };

        }
    }

});