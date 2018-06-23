import {get} from 'lodash';
import spawnCreeps from './spawnCreeps';

const loop = function () {
    spawnCreeps();
}

export default {
    loop
}