define(['Entity'], function (Entity) {

    var Hero = function (x, y) {
        Entity.call(this, x, y);
        this.name = "Jake";
        this.wallet = 0;
    };

    Hero.prototype = Object.create(Entity.prototype);
    Hero.prototype.constructor = Hero;

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