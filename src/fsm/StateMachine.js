define(function(){

    'use strict';

    var StateMachine = function (initialState, otherStates) {

        //this.states = states || {};
        this.initialState = initialState;
        this.usedStates = otherStates;
        this.states = [];

        return this;

    };

    StateMachine.prototype.Top = function () {

        return this.states.length > 0 ? this.states[this.states.length - 1] : this.initialState;

    };

    StateMachine.prototype.Pop = function () {

        this.Top().Exit();
        this.states.pop();

        // Return to initial state since no more to pop.
        if (this.states.length === 0) {
            this.Top().Enter();
            log("A state changed to: " + this.initialState.id);
            return;
        }

    };

    StateMachine.prototype.Clear = function () {

        // Not sure if will need to perform exit routines on all before clear.
        this.states.length = 0;

    };

    StateMachine.prototype.Push = function (id, params, cb) {

        // It might be that you wish to instantiate each state at runtime, so test this out.
        let state = this.usedStates.find(x => x.id === id);

        if (state.length === 0)
            return;

        if (this.Top().id === id) {
            console.error("Cannot force duplicate state.");
            return;
        }

        log("A state changed to: " + state.id);

        this.states.push(state);
        this.Top().Enter(params, cb);

    };

    StateMachine.prototype.Interrupt = function (state, params) {

        this.Clear();
        this.Push(state, params);

    };

    StateMachine.prototype.Update = function (dt) {

        this.Top().Update(dt);

        if (this.Top().isFinished)
            this.Pop();

    };

    StateMachine.prototype.GetCurrent = function () {
        return this.Top().id;
    };

    return StateMachine;

});