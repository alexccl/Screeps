import spawnCreeps from './spawnCreeps';
import executeRoles from './executeRoles';

const loop = function () {
    console.log('executing loop----------------------------------------------');
    spawnCreeps();
    executeRoles();
    console.log('loop complete');
}

export default {
    loop
}