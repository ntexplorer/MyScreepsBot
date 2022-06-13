let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");

module.exports.loop = function () {
    let spawn1 = Game.spawns['Spawn1'];
    const source1 = spawn1.room.find(FIND_SOURCES)[0];
    const controller1 = spawn1.room.controller;
    for (const name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === "harvester") {
            roleHarvester.harvestEnergy(creep, source1, spawn1);
        } else if (creep.memory.role === "upgrader") {
            roleUpgrader.upgradeController(creep, source1, controller1);
        }
    }
}