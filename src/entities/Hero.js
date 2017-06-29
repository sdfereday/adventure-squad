define(['Entity'], function (Entity) {

    var Hero = function (x, y) {
        Entity.call(this, x, y);
        this.name = "Jake";
        this.wallet = 0;
        this.carries = null;
    };

    Hero.prototype = Object.create(Entity.prototype);
    Hero.prototype.constructor = Hero;

    Hero.prototype.AddKeyItem = function(id) {
        
        // Can't carry more than one key item, need to handle this properly somehow.
        if(this.carries)
            return;

        this.carries = "someItem";

    };

    Hero.prototype.RemoveKeyItem = function() {
        
        // Can only carry one, so remove it
        let item = this.carries;
        this.carries = null;
        
        return item;

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