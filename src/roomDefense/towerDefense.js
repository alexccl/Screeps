const towerDefense = () => {

    for(const roomName in Game.rooms) {

        const hostileHealers = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS, {filter: (s) => (s.getActiveBodyparts(HEAL) > 0)});
        const hostileCreeps = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);  
        const towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        var healerHit = false;    

        if (hostileHealers.length > 0 && healerHit == false) {
            towers.forEach(tower => tower.attack(hostileHealers[0]));
            healerHit = true;
        }

        else if (hostileCreeps.length > 0) {
            towers.forEach(tower => tower.attack(hostileCreeps[0]));
            healerHit = false;
        }

        else if (hostileCreeps.length == 0) {
            for (let name in Game.creeps) {
                var creep = Game.creeps[name];
                if (creep.hits < creep.hitsMax) {
                    towers.forEach(tower => tower.heal(creep));
                }
            }
        }
    }
}

export default towerDefense;