/*
  Determines if creeps should spawn on each game tick.  If a creep should spawn it determines which type to spawn
*/
import spawnPriorities from './spawnPriorities';
import get from 'lodash/get';
import filter from 'lodash/filter'


/**
 * returns all the creeps in the game with the specified type
 * @param {string} type - The type of creep to search for 
 */
function getCreepsOfType(type) {
  const gameCreeps = get(Game, 'gameCreeps', [])

  // filter all the game's creeps for only the creeps of the given type
  return filter(gameCreeps, (creep) => (creepType = creep.memory.type));
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
    // specifying "dryRun" as an option returns if the creep can be spawned, but doesn't actually spawn it
    const canSpawn = Game.spawns[spawn].spawnCreep(creep.body, null, {dryRun: true})

    // if this spawn is capable of spawning this
    if (canSpawn) {
      const spawnOptions = {
        memory: {
          type: creep.type
        }
      }

      console.log(`Spawning creep with body: ${JSON.stringify(creep.body)} and options ${JSON.stringify(spawnOptions)}`)
      Game.spawns[spawn].spawnCreep(creep.body, null, spawnOptions)
    }
  }
}

const spawnCreeps = () => {
  spawnPriorities.forEach(evaluatePriority);
}

export default spawnCreeps;