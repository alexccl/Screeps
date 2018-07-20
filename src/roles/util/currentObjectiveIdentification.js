// identifies a creep's current objective

function isCreepExecutingMainObjective(creep, job) {
    if(creep.memory.working && creep.carry.energy === 0) {
        creep.say('gather');
        creep.memory.working = false;
    }
    if(!creep.memory.working && creep.carry.energy === creep.carryCapacity) {
        creep.say(job);
        creep.memory.working = true;
        return true;
    }
}

export {
    isCreepExecutingMainObjective
}