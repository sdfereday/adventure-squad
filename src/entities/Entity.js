define(['StateMachine', 'Idle', 'Move', 'helpers', 'data'], function(StateMachine, StateIdle, StateMove, helpers, data) {
    
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
        this.onArrivedCallback = null;
        
        // TODO: Should be a constant (to begin with, add to data?)
        this.currentLevel = 1;
        this.currentExp = 0;
        this.expForLevel = 500;

    };

    Entity.prototype.AddExp = function (n) {

        let values = helpers.calculateExp(this.currentLevel, n, this.expForLevel);

        if(values.level > this.currentLevel)
            helpers.log(this.name + " leveled up! > " + this.currentLevel);

        this.currentLevel = values.level;
        this.currentExp = values.exp;
        this.expForLevel = values.forNext;

    };

    Entity.prototype.SetDestination = function (d, cb) {

        var self = this;

        if(typeof cb === 'function')
            this.onArrivedCallback = cb;

        if (this.isTravelling) {
            helpers.log("Already travelling somewhere.");
            return;
        }

        if (this.headingTo && d.id === this.headingTo.id) {
            helpers.log("Already at that location.");
            return;
        } else {
            helpers.log("Travelling to " + d.name);
            this.isTravelling = true;
        }

        var dest = data.locations.find(function (item) {
            return item.x === d.x && item.y === d.y;
        });

        if (dest) {
            this.headingTo = dest;
            this.fsm.Push("move", dest, function () {
                helpers.log("Arrived at " + d.name);
                self.isTravelling = false;
                self.onArrivedCallback(d);
            });
        }

    };

    Entity.prototype.Move = function (x, y) {

        this.x += x;
        this.y += y;

        helpers.log("= ", true);

        if (chance.weighted([0, 1], [0.99, 0.01])) {
            helpers.log(">");
            helpers.log("Ate a sandwich >");
        }

        if (chance.weighted([0, 1], [0.999, 0.001])) {
            helpers.log(">");
            helpers.log("Killed a Gnoll but got nothing >");
        }

    };

    Entity.prototype.Update = function () {

        this.fsm.Update();

    };

    return Entity;
    
});