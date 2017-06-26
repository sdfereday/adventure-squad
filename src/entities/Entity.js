define(function() {
    
    'use strict';
    
    var Entity = function (x, y) {
        this.id = "";
        this.x = x;
        this.y = y;
        this.fsm = new StateMachine(new StateIdle("idle", this), [
            new StateMove("move", this)
        ]);
        this.headingTo = null;
        this.isTravelling = false;
    };

    Entity.prototype.SetDestination = function (d) {

        var self = this;

        if (this.isTravelling) {
            log("Already travelling somewhere.");
            return;
        }

        if (this.headingTo && d.id === this.headingTo.id) {
            log("Already at that location.");
            return;
        } else {
            log("Travelling to " + d.name);
            this.isTravelling = true;
        }

        var dest = locations.find(function (item) {
            return item.x === d.x && item.y === d.y;
        });

        if (dest) {
            this.headingTo = dest;
            this.fsm.Push("move", dest, function () {
                log("Arrived at " + d.name);
                self.isTravelling = false;
            });
        }

    };

    Entity.prototype.Move = function (x, y) {

        this.x += x;
        this.y += y;

        log("= ", true);

        if (chance.weighted([0, 1], [0.99, 0.01])) {
            log(">");
            log("Ate a sandwich >");
        }

        if (chance.weighted([0, 1], [0.999, 0.001])) {
            log(">");
            log("Killed a Gnoll but got nothing >");
        }

    };

    Entity.prototype.Update = function () {

        this.fsm.Update();

    };

    return Entity;
    
});