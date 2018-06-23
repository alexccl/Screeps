//Configuration for spawn priorities.  Which creeps should spawn first?

/** Very basic creep to start game */
const gruntCreep = {
  type: 'Grunt',
  body: [WORK, CARRY, MOVE],
  shouldSpawn: function () {
    // at this point, just always return true.  It should aways spawn it
    return true;
  }
}

/**List of creep types to spawn in priority order */
export default [
  {
    creep: gruntCreep,
    // there should always be 4 grunt creeps spawned
    maxCount: 4
  }
]