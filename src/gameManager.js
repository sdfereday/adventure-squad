define(['Hero'], function(Hero){

    return {

        heroes: [],

        Startup: function () {
            // TODO: Should be on main
            this.heroes.push(new Hero(1, 1, "Jake"), new Hero(2, 2, "Tia"));
        },

        Update: function () {
            this.heroes.forEach(x => x.Update());
            // Resting, eating, inn, commerce, etc states would be good.
        },

        Visit: function (str) {
            
            let hero = this.heroes.find(x => !x.delving);
            
            if(hero)
                hero.fsm.Push("stateDestination", str);

        }

    };

});