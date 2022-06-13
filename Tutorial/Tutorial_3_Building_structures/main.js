let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");
let roleBuilder = require("role.builder");

module.exports.loop = function () {
    let spawn1 = Game.spawns['Spawn1'];
    const source1 = spawn1.room.find(FIND_SOURCES)[0];
    const controller1 = spawn1.room.controller;

    for (const name in Game.rooms) {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

    for (const name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === "harvester") {
            roleHarvester.run(creep, source1);
        } else if (creep.memory.role === "upgrader") {
            roleUpgrader.run(creep, source1, controller1);
        } else if (creep.memory.role === "builder") {
            roleBuilder.run(creep, source1);
        }
    }

    // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
}