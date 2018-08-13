import random from '../util/random';
import { markPosForRoadBuild } from '../roomConstruction/roadConstructionPlanner'

export default {
  /** @param {Creep} - creep to execute role on **/
  run: (creep) => {
    // generate random target source
    if (creep.memory.targetSourceIndex === null || creep.memory.targetSourceIndex === undefined) {
      const sources = creep.room.find(FIND_SOURCES) || [];
      const targetSourceIndex = random(sources.length - 1);
      creep.memory.targetSourceIndex = targetSourceIndex;
    }

    if (creep.carry.energy < creep.carryCapacity) {
      const droppedTarget = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
      if(droppedTarget) {
        const hostiles = creep.room.find(FIND_HOSTILE_CREEPS);
        if(hostiles.length === 0) {
          if(creep.pickup(droppedTarget) === ERR_NOT_IN_RANGE) {
            creep.moveTo(droppedTarget);
          }
        }
      }
      const targetSourceIndex = creep.memory.targetSourceIndex;
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[targetSourceIndex]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[targetSourceIndex]);
        markPosForRoadBuild(creep.pos);
      }
    }
    else {
      const towers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
        }
      });
      if(towers.length > 0) {
        if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
      else if(towers.length == 0) {
        const spawnUnits = creep.room.find(FIND_STRUCTURES, {
          filter: (structure) => {
            return (structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
          }
        });
        if(spawnUnits.length > 0) {
          if(creep.transfer(spawnUnits[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawnUnits[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
        else if(spawnUnits.length == 0) {
          const storages = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
              return (structure.structureType == STRUCTURE_STORAGE) && structure.energy < structure.energyCapacity;
            }
          });
          if(storages.length > 0) {
            if(creep.transfer(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(storages[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
          }
        }
      }
    }
  }
};