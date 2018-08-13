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
 * @param {*} priority - the configured creep priority
 * @returns {boolean} - true if priority is satisfied
 */
function evaluatePriority(priority) {
  const creep = priority.creep;

  // should spawn check
  if (!creep.shouldSpawn()) return true;

  // max creeps of role exceeded check
  const existingCreepsOfRole = getCreepsOfRole(creep.role);
  if (existingCreepsOfRole.length >= priority.maxCount) return true;

  // we should spawn this creep, but make sure we can even spawn it
  for (const spawnName in Game.spawns) {
    const spawn = Game.spawns[spawnName];
    const creepName = `${creep.role}-${spawn.pos.roomName}-${Game.time}`;
    // specifying "dryRun" as an option returns if the creep can be spawned, but doesn't actually spawn it
    const canSpawn = spawn.spawnCreep(creep.body, creepName, {dryRun: true})
    // if this spawn is capable of spawning this
    if (canSpawn === OK) {
      const spawnOptions = {
        memory: {
          role: creep.role,
          roomName: spawn.pos.roomName 
        }
      }

      console.log(`Spawning creep with name ${creepName}, body: ${JSON.stringify(creep.body)}, options ${JSON.stringify(spawnOptions)}`)
      spawn.spawnCreep(creep.body, creepName, spawnOptions);

      // evaluate if this new creep satisfies priority in next loop
      return false;
    } else {
      // we wanted to spawn this creep, but we unable to.  This priority is not satisfied
      return false;
    }
  }
}

const spawnCreeps = () => {
  spawnPriorities.reduce((higherPrioritesCompleted, priority) => {
    if (!higherPrioritesCompleted) return higherPrioritesCompleted;

    const priorityCompleted = evaluatePriority(priority);
    return priorityCompleted;
  }, true);
}

export default spawnCreeps;