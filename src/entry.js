import executeRoles from './executeRoles';
import cleanUp from './util/cleanUp';
import towerDefense from './roomDefense/towerDefense';
import spawnCreeps from './spawnCreeps/spawnCreeps';

const loop = function () {
    console.log('executing loop----------------------------------------------');
    spawnCreeps();
    executeRoles();
    cleanUp();
    towerDefense();
    console.log('loop complete');
}

export default {
    loop
}