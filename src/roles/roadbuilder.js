import {getPosForRoadBuild} from '../util/roadConstructionPlanner'
import {creepEnergyHarvesting, collectEnergyFromEnergyStorages, doEnergyStoragesExist} from './util/energyGathering'
import {isCreepExecutingMainObjective} from './util/currentObjectiveIdentification'

// this is a road building road

export default {
    /** @param {Creep} - creep to execute role on **/
    run: (creep) => {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }

        if(creep.memory.building) {
            const roadBuildSite = getPosForRoadBuild(creep.name);
            console.log('buildSite', JSON.stringify(roadBuildSite));
            const buildStatus = creep.build(roadBuildSite);
            if (buildStatus === ERR_NOT_IN_RANGE) {
                creep.moveTo(roadBuildSite);
            }
        }
        else if (doEnergyStoragesExist(creep)) {
            collectEnergyFromEnergyStorages(creep);
        }
        else {
            creepEnergyHarvesting(1, creep);
    	}
    }
}

