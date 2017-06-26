define(function(){

    'use strict';

    var Map = function (w, h) {
        this._data = [];
        // Reversed because it's odd like that.
        for (var row = 0; row < h; row++) {
            this._data.push([]);
            for (var col = 0; col < w; col++) {
                this._data[row].push(new MapCell(row, col));
            }
        }
    };

    return Map;

});