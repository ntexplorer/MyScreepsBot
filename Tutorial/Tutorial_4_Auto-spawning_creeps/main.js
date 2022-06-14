let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");
let roleBuilder = require("role.builder");

module.exports.loop = function () {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    let spawn1 = Game.spawns['Spawn1'];
    const source1 = spawn1.room.find(FIND_SOURCES)[0];
    const controller1 = spawn1.room.controller;

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < 3) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        spawn1.spawnCreep([WORK, CARRY, MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if (spawn1.spawning) {
        let spawningCreep = Game.creeps[spawn1.spawning.name];
        spawn1.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8}
        );
    }

    /*
    //print current SOURCE_ENERGY held
    for (const name in Game.rooms) {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }

     */

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