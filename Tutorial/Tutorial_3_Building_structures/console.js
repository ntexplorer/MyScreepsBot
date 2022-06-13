//cmd1
Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Builder1', {memory: {role: 'builder'}});
// cmd2
Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    'HarvesterBig',
    {memory: {role: 'harvester'}});