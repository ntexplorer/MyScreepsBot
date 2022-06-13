let roleHarvester = require("role.harvester");

module.exports.loop = function () {
    let spawn1 = Game.spawns['Spawn1'];
    const source1 = spawn1.room.find(FIND_SOURCES)[0];
    for (const name in Game.creeps) {
        let creep = Game.creeps[name];
        roleHarvester.harvestEnergy(creep, source1, spawn1);
    }
}

/*
function harvestEnergy(creep, source, spawn) {
    if (creep.store.getFreeCapacity() > 0) {
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
    else {
        if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
            creep.moveTo(spawn);
        }
    }
}

 */