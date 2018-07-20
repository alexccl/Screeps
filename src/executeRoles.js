import {roles} from './util/constants';
import {
  harvester,
  controllerUpgrader,
  roadBuilder,
  repairer
} from './roles';

/**
 * Executes the roles for all creeps in game
 */
const executeRoles = () => {
  for(const creepName in Game.creeps) {
    const creep = Game.creeps[creepName];
    switch (creep.memory.role) {
      case roles.harvester:
        harvester.run(creep);
        break;
      case roles.controllerUpgrader:
        controllerUpgrader.run(creep);
        break;
      case roles.roadBuilder:
        roadBuilder.run(creep);
        break;
      case roles.repairer:
        repairer.run(creep);
        break;
      default:
        console.log(`No registered role executor for role of type: ${creep.memory.role}`);
        break;
    }
  }
}

export default executeRoles;