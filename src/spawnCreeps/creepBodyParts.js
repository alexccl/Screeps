for(const gameRooms in Game.rooms) {

  const controllerLevel = Game.rooms[gameRooms].controller.level;
  const extensions = Game.rooms[gameRooms].find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_EXTENSION)
    }
  });

  if(controllerLevel === 2) {
    var bodyParts = [WORK, CARRY, MOVE, MOVE];
  }
  else if(controllerLevel === 3) {
    var bodyParts = [WORK, WORK, CARRY, MOVE, MOVE, MOVE];
  }
  else if(controllerLevel === 4) {
    var bodyParts = [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
  }
  else if(controllerLevel === 5) {
    var bodyParts = [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
  }
  else if(controllerLevel === 6) {
    var bodyParts = [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE];
  }
  else if(controllerLevel === 7) {
    var bodyParts = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
  }
  else if(controllerLevel === 8) {
    var bodyParts = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE];
  }
  else {
    var bodyParts = [WORK, CARRY, MOVE, MOVE];
  }
}

export default bodyParts;
  