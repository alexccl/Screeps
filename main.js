'use strict';

require('lodash');

//Configuration for spawn priorities.  Which creeps should spawn first?

/** Very basic creep to start game */
const gruntCreep = {
  type: 'Grunt',
  body: [WORK, CARRY, MOVE],
  shouldSpawn: function () {
    // at this point, just always return true.  It should aways spawn it
    return true;
  }
};

/**List of creep types to spawn in priority order */
var spawnPriorities = [
  {
    creep: gruntCreep,
    // there should always be 4 grunt creeps spawned
    maxCount: 4
  }
];

/*
  Determines if creeps should spawn on each game tick.  If a creep should spawn it determines which type to spawn
*/


/**
 * returns all the creeps in the game with the specified type
 * @param {string} type - The type of creep to search for 
 */
function getCreepsOfType(type) {
  const gameCreeps = _.get(Game, 'gameCreeps', []);

  // filter all the game's creeps for only the creeps of the given type
  return _.filter(gameCreeps, (creep) => (creepType = creep.memory.type));
}

/**
 * Analyze the configured creep type priority and possibly spawn a creep of that type
 * @param {*} priority 
 */
function evaluatePriority(priority) {
  const creep = priority.creep;

  // check with the priority if it should spawn. If it shouldn't, then just skip this priority
  const shouldSpawn = creep.shouldSpawn();
  if (shouldSpawn === false) {
    // we should not spawn this.  Exit this function early
    return;
  }

  const creepType = creep.type;

  // get all the creeps in the game for this priority's creep type
  const existingCreepsOfType = getCreepsOfType(creepType);

  // get how many creeps of this type already exist
  const numberOfExistingCreeps = existingCreepsOfType.length;

  // if the number of existing creep types is greater than or equal to the max count, skip this priority
  if (numberOfExistingCreeps >= priority.maxCount) {
    // we should not spawn this.  Exit this function early
    return;
  }

  // we should spawn this creep, but make sure we can even spawn it
  for (const spawn in Game.spawns) {
    console.log(JSON.stringify(spawn));
    // specifying "dryRun" as an option returns if the creep can be spawned, but doesn't actually spawn it
    const canSpawn = spawn.spawnCreep(creep.body, null, {dryRun: true});

    // if this spawn is capable of spawning this
    if (canSpawn) {
      const spawnOptions = {
        memory: {
          type: creep.type
        }
      };
      spawn.spawnCreep(creep.body, null, spawnOptions);
    }
  }
}

const spawnCreeps = () => {
  console.log("Spawning Creeps");
  spawnPriorities.forEach(evaluatePriority);
};

const loop = function () {
    spawnCreeps();
};

var main = {
    loop
};

module.exports = main;
