/*
  Determines if creeps should spawn on each game tick.  If a creep should spawn it determines which role to spawn
*/
import spawnPriorities from './spawnPriorities';
import get from 'lodash/get';
import filter from 'lodash/filter'


/**
 * returns all the creeps in the game with the specified role
 * @param {string} role - The role of creep to search for 
 */
function getCreepsOfRole(role) {
  const gameCreeps = get(Game, 'creeps', [])

  // filter all the game's creeps for only the creeps of the given role
  return filter(gameCreeps, (creep) => (role === creep.memory.role));
}

/**
 * Analyze the configured creep role priority and possibly spawn a creep of that role
 * @param {*} priority 
 */
function evaluatePriority(priority) {
  const creep = priority.creep;

  // should spawn check
  if (!creep.shouldSpawn()) return;

  // max creeps of role exceeded check
  const existingCreepsOfRole = getCreepsOfRole(creep.role);
  if (existingCreepsOfRole.length >= priority.maxCount) return;

  // we should spawn this creep, but make sure we can even spawn it
  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];
    const creepName = `${creep.role}-${existingCreepsOfRole.length + 1}`;
    // specifying "dryRun" as an option returns if the creep can be spawned, but doesn't actually spawn it
    const canSpawn = spawn.spawnCreep(creep.body, creepName, {dryRun: true})

    // if this spawn is capable of spawning this
    if (canSpawn === OK) {
      const spawnOptions = {
        memory: {
          role: creep.role
        }
      }

      console.log(`Spawning creep with name ${creepName}, body: ${JSON.stringify(creep.body)}, options ${JSON.stringify(spawnOptions)}`)
      const returnVal = spawn.spawnCreep(creep.body, creepName, spawnOptions);
    }
  }
}

const spawnCreeps = () => {
  spawnPriorities.forEach(evaluatePriority);
}

export default spawnCreeps;