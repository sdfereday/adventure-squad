define(function () {

    return {

        locations: [{
            name: "Guild Of Steve",
            id: "guildOfSteve",
            x: 20,
            y: 20,
            visited: false,
            meta: {},
            locations: [{
                name: "Bathroom",
                id: "bathroom",
                x: 30,
                y: 30,
                visited: false,
                portal: false,
                meta: {}
            }, {
                name: "Entrance",
                id: "entrance",
                x: 1,
                y: 1,
                visited: false,
                portal: true,
                meta: {}
            }]
        }, {
            name: "Dungeon Of The Nameless",
            id: "dungeonOfNameless",
            x: 220,
            y: 220,
            visited: false,
            meta: {},
            locations: [{
                name: "Entrance",
                id: "entrance",
                x: 1,
                y: 1,
                visited: false,
                portal: true,
                meta: {}
            }]
        }],

        getLocation: function (str) {
            return locations.find(function (item) {
                return item.name === str;
            });
        }

    };

});