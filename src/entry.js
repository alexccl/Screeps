import spawnCreeps from './spawnCreeps';
import executeRoles from './executeRoles';

const loop = function () {
    console.log('executing loop----------------------------------------------');
    spawnCreeps();
    executeRoles();
}

export default {
    loop
}