define(function () {

    'use strict';

    /// Enums
    const locationTypes = {
        HOME: 0,
        DUNGEON: 1
    };

    /// Map data
    let mapData = {

        locationData: [{
            name: "Guild Of Steve",
            id: "guildOfSteve",
            x: 20,
            y: 20,
            visited: false,
            type: locationTypes.HOME,
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
            type: locationTypes.DUNGEON,
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

        GetLocation: function (str) {
            return mapData.locationData.find(function (item) {
                return item.name === str;
            });
        }

    };

    /// Global user data
    let userData = {
        wallet: 0,
        keyItems: [],
        AddToWallet: function(n) {
            userData.wallet += n;
        }
    };

    return {

        user: userData,
        locationTypes: locationTypes,
        locations: mapData.locationData,
        map: mapData

    };

});