define(function(){

    var Hero = function (x, y) {
        Entity.call(this, x, y);
        this.name = "Jake";
    };

    Hero.prototype = Object.create(Entity.prototype);
    Hero.prototype.constructor = Hero;

    return Hero;

});