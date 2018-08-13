//Configuration for spawn priorities.  Which creeps should spawn first?
import { roles } from '../util/constants';
import bodyParts from './creepBodyParts'

/** Very basic creep to start game */
const harvesterCreep = {
  role: roles.harvester,
  body: bodyParts,
  shouldSpawn: function () {
    // at this point, just always return true.  It should aways spawn it
    return true;
  }
}

/** Upgrades the controller */
const controllerUpgraderCreep = {
  role: roles.controllerUpgrader,
  body: bodyParts,
  shouldSpawn: function () {
    // at this point, just always return true.  It should aways spawn it
    return true;
  }
}

/** Repairs structures */
const repairerCreep = {
  role: roles.repairer,
  body: bodyParts,
  shouldSpawn: function () {
    // at this point, just always return true.  It should aways spawn it
    return true;
  }
}

/** Builds roads */
const roadBuilderCreep = {
  role: roles.roadBuilder,
  body: bodyParts,
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
    creep: roadBuilderCreep,
    maxCount: 2
  },
  {
    creep:repairerCreep,
    maxCount: 3
  },
  {
    creep: controllerUpgraderCreep,
    maxCount: 3
  }
]