// energy harvest from a provided source

function creepEnergyHarvesting (sourceIndex, creep) {
    var sources = creep.room.find(FIND_SOURCES);
    if(creep.harvest(sources[sourceIndex]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[sourceIndex], {visualizePathStyle: {stroke: '#ffaa00'}})
    }
}

// energy tranfer from a room's storage

function doEnergyStoragesExist (creep) {
    var storages = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE);
        }
    });
    return storages.length > 0;
}

function collectEnergyFromEnergyStorages (creep) {
    var storages = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_STORAGE);
        }
    });
    if (storages.length === 0) {
        console.error('Tried to collect from energy storage when no storages exist')
    } else {
        if(creep.withdraw(storages[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(storages[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}

export {
    creepEnergyHarvesting,
    collectEnergyFromEnergyStorages,
    doEnergyStoragesExist
};