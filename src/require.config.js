var require = {
    paths: {
        'ChanceLib': '../bower_components/chance/dist/chance.min',
        'Map': 'map/Map',
        'MapCell': 'map/MapCell',
        'StateMachine': 'fsm/StateMachine',
        'Base': 'fsm/states/Base',
        'Idle': 'fsm/states/Idle',
        'StateDestination': 'fsm/states/StateDestination',
        'Travel': 'fsm/states/Travel',
        'Delve': 'fsm/states/Delve',
        'Entity': 'entities/Entity',
        'Hero': 'entities/Hero',
        'data': 'data',
        'chance': 'chance',
        'gameActions': 'gameActions',
        'helpers': 'helpers',
        'gameManager': 'gameManager',
        'gameGlobals': 'gameGlobals'
        //'EasyStar': '',
        //'Phaser': '../libs/phaser-arcade-physics.min',
        //'LowRez': '../libs/low-rez',
        //'EventEmitter': '../bower_components/eventEmitter/EventEmitter.min'
    },
    shim: {
        // 'EasyStar': {
        //     exports: 'EasyStar'
        // }
    }
};