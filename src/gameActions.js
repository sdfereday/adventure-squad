define(['chance'], function(chance){

    return {

        FindGold: function () {
            return chance.integer({ min: 20, max: 200 });
        },

        Rest: function () {
            // ...
        },

        GenerateExp: function () {
            return chance.integer({ min: 20, max: 100 });
        }

    }

});