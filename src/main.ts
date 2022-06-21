import {errorMapper} from './modules/errorMapper';
import {roleHarvester} from '@/modules/role.harvester';
import {roleUpgrader} from "@/modules/role.upgrader";
import {roleBuilder} from "@/modules/role.builder";


module.exports.loop = errorMapper(() => {
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory: ', name);
        }
    }

    let motherBase = Game.spawns['MotherBase'];
    const source1 = motherBase.room.find(FIND_SOURCES)[0];
    const source2 = motherBase.room.find(FIND_SOURCES)[1];
    const controller1 = motherBase.room.controller;

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
    //console.log('Harvesters: ' + harvesters.length);
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');


    if (harvesters.length < 3) {
        let newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        motherBase.spawnCreep([WORK, CARRY, MOVE], newName,
            {memory: {role: 'harvester'}});
    } else if (upgraders.length < 2) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        motherBase.spawnCreep([WORK, CARRY, MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if (motherBase.spawning) {
        let spawningCreep = Game.creeps[motherBase.spawning.name];
        motherBase.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['MotherBase'].pos.x + 1,
            Game.spawns['MotherBase'].pos.y,
            {align: 'left', opacity: 0.8}
        );
    }


    for (const name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role === "harvester") {
            roleHarvester.run(creep, source1);
        } else if (creep.memory.role === "upgrader") {
            roleUpgrader.run(creep, source2, controller1);
        } else if (creep.memory.role === "builder") {
            roleBuilder.run(creep, source2);
        }
    }
})