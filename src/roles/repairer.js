import {creepEnergyHarvesting, collectEnergyFromEnergyStorages, doEnergyStoragesExist} from './util/energyGathering'

export default {

    run: function(creep) {

        if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvest');
        }

        if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
            creep.memory.repairing = true;
            creep.say('repair');
        }

        if (creep.memory.repairing) {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a,b) => a.hits - b.hits);

            if(targets.length > 0) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else if (doEnergyStoragesExist(creep)) {
            collectEnergyFromEnergyStorages(creep);
        }
        else {
            creepEnergyHarvesting(1, creep);
    	}
    }
};