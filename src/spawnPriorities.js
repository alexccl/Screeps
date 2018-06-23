//Configuration for spawn priorities.  Which creeps should spawn first?
import { roles } from './util/constants';

/** Very basic creep to start game */
const harvesterCreep = {
  role: roles.harvester,
  body: [WORK, CARRY, MOVE],
  shouldSpawn: function () {
    // at this point, just always return true.  It should aways spawn it
    return true;
  }
}

/** Upgrades the controls */
const controllerUpgraderCreep = {
  role: roles.controllerUpgrader,
  body: [WORK, CARRY, MOVE],
  shouldSpawn: function () {
    // at this point, just always return true.  It should aways spawn it
    return true;
  }
}


/**List of creep types to spawn in priority order */
export default [
  {
    creep: harvesterCreep,
    // there should always be 4 grunt creeps spawned
    maxCount: 3
  },
  {
    creep: controllerUpgraderCreep,
    maxCount: 2
  }
]