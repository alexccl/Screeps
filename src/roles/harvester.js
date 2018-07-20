import random from '../util/random';
import {markPosForRoadBuild} from '../util/roadConstructionPlanner'

export default {
  /** @param {Creep} - creep to execute role on **/
  run: (creep) => {
    // generate random target source
    if(creep.memory.targetSourceIndex === null || creep.memory.targetSourceIndex === undefined) {
      const sources = creep.room.find(FIND_SOURCES) || [];
      const targetSourceIndex = random(sources.length - 1);
      creep.memory.targetSourceIndex = targetSourceIndex;
    }

    if(creep.carry.energy < creep.carryCapacity) {
      const targetSourceIndex = creep.memory.targetSourceIndex;
      const sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[targetSourceIndex]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[targetSourceIndex]);
        markPosForRoadBuild(creep.pos);
      }
    }
    else {
      const transferRes = creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY);
      if(transferRes == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns['Spawn1']);
        markPosForRoadBuild(creep.pos);
      } else if (transferRes === OK) {
        creep.memory.targetSourceIndex = null;
      }
    }
  }
};