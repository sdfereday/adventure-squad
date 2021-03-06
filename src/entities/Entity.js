define(['StateMachine', 'Idle', 'StateDestination', 'Travel', 'helpers', 'data'],
function (StateMachine, StateIdle, StateDestination, StateTravel, helpers, data) {

    'use strict';

    var Entity = function (x, y) {

        this.id = "";
        this.x = x;
        this.y = y;

        this.headingTo = null;

        // Should probably exist on hero only
        this.isTravelling = false;
        this.isDelving = false;
        
        this.onArrivedCallback = null;

        this.fsm = new StateMachine(new StateIdle("idle", this), [
            new StateTravel("travel", this),
            new StateDestination("stateDestination", this)
        ]);

        // Comes from json in practice
        this.stats = {
            hp: {
                max: 299,
                current: 299
            }
        };

        // TODO: Should be a constant (to begin with, add to data?)
        this.currentLevel = 1;
        this.currentExp = 0;
        this.expForLevel = 500;

    };

    Entity.prototype.AddExp = function (n) {

        let values = helpers.calculateExp(this.currentLevel, n, this.expForLevel);

        if (values.level > this.currentLevel)
            helpers.log(this.name + " leveled up! > " + this.currentLevel);

        this.currentLevel = values.level;
        this.currentExp = values.exp;
        this.expForLevel = values.forNext;

    };

    Entity.prototype.StartDelving = function() {

        this.isDelving = true;

    };

    Entity.prototype.SetDestination = function (d, cb) {

        var self = this;

        if (typeof cb === 'function')
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
            this.fsm.Push("travel", dest, function () {
                helpers.log("Arrived at " + d.name);
                self.isTravelling = false;
                self.onArrivedCallback(d);
            });
        }

    };

    Entity.prototype.Move = function (x, y) {

        this.x += x;
        this.y += y;

    };

    Entity.prototype.Update = function () {

        this.fsm.Update();

    };

    return Entity;

});