define(['Entity', 'helpers'], function (Entity, helpers) {

    'use strict';

    var Hero = function (x, y, name) {
        Entity.call(this, x, y);
        this.name = name;
        this.wallet = 0;
        this.carries = null;
        helpers.log(this.name + " entered the fray.");
    };

    Hero.prototype = Object.create(Entity.prototype);
    Hero.prototype.constructor = Hero;

    Hero.prototype.AddKeyItem = function (id) {

        // Can't carry more than one key item, need to handle this properly somehow.
        if (this.carries)
            return;

        this.carries = id;

    };

    Hero.prototype.GetKeyItem = function () {
        return this.carries;
    };

    Hero.prototype.RemoveKeyItem = function () {
        this.carries = null;
    };

    Hero.prototype.AddToWallet = function (n) {
        this.wallet += n;
    };

    Hero.prototype.TakeFromWallet = function (n) {

        let value = Math.floor(((n / 100) * this.wallet));
        this.wallet -= value;

        if (this.wallet < 0)
            this.wallet = 0;

        return value;

    };

    return Hero;

});