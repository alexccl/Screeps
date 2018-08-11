import find from 'lodash/find';
import filter from 'lodash/filter';
import get from 'lodash/get';

const safeGetPersistedSites = () => (Memory.plannedRoadBuildSites || []);

const getPersistedPosition = (pos) => ({
  x: pos.x,
  y: pos.y,
  roomName: pos.roomName,
  registerCount: 0,
  roadBuilt: false,
  buildStarted: false
});

const getConstructionSiteAtPos = (pos) => {
  const matchingKey = Object.keys(Game.constructionSites).find(key => {
      const site = Game.constructionSites[key];
      return site.pos.x === pos.x && site.pos.y === pos.y;
  });

  return Game.constructionSites[matchingKey];
}

const getKeyFromPosition = (pos) => (`${pos.x}-${pos.y}-${pos.roomName}`);

const getPersistedPosObj = (pos) => {
  const compPos = getKeyFromPosition(pos);
  return find(safeGetPersistedSites(), site => (getKeyFromPosition(site) === compPos));
};

const updatePersistedPosObj = (pos) => {
  const existedPersistence = safeGetPersistedSites();
  const compPos = getKeyFromPosition(pos);
  const persistenceWithoutUpdatePos = filter(existedPersistence, existingPos => getKeyFromPosition(existingPos) !== compPos);

  Memory.plannedRoadBuildSites = persistenceWithoutUpdatePos.concat(pos);
};

const removePersistedObj = (pos) => {
  const existedPersistence = safeGetPersistedSites();
  const compPos = getKeyFromPosition(pos);
  const persistenceWithoutUpdatePos = filter(existedPersistence, existingPos => getKeyFromPosition(existingPos) !== compPos);

  Memory.plannedRoadBuildSites = persistenceWithoutUpdatePos;
};

const doesPosAlreadyHaveRoad = (pos) => {
  if (pos.roadBuilt) return true;

  const existingTargets = Game.rooms[pos.roomName].lookAt(pos.x, pos.y) || [];

  // technically this won't build a road if another strucutre is there.  Update this if necessary
  const structureTargets = filter(existingTargets, target => {
    const isStructure = target.type === 'structure';
    return isStructure;
  });

  return structureTargets.length !== 0;
};

// checks and updates road status for each build site
const sanitizePlannedBuildSites = () => {
  const sites = safeGetPersistedSites();

  sites.forEach(site => {
    // if site is not flagged for "road built" but a road is there, update it
    if (!site.roadBuilt && doesPosAlreadyHaveRoad(site)) {
      const updatedSite = Object.assign({}, site, {roadBuilt: true});
      updatePersistedPosObj(updatedSite);
    }
  })
};

const getCurrentBuildSite = () => {
  // sanitize the
  const sites = safeGetPersistedSites();
  const notBuildFilter = sites.filter(site => !site.roadBuilt);
  const currentBuildingSite = notBuildFilter.find(site => site.buildStarted);
  if (currentBuildingSite) return currentBuildingSite;

  // no current build, find next one and persist
  notBuildFilter.sort((siteA, siteB) => (siteB.registerCount - siteA.registerCount));
  const newBuildSite = notBuildFilter[0];
  const updatedPosToCurrentBuild = Object.assign({}, newBuildSite, {buildStarted: true});
  updatePersistedPosObj(updatedPosToCurrentBuild);
  return updatedPosToCurrentBuild;
};

/**
* Register the current position as a location for a road to be built
*/
function markPosForRoadBuild (rawPos) {
  let position = getPersistedPosition(rawPos);

  // if already exists, use that one
  position = getPersistedPosObj(position) || position;

  // bump the register count
  position = Object.assign({}, position, {registerCount: position.registerCount + 1});
  updatePersistedPosObj(position);
}

/**
* Get the next open position for a road build
*/
function getPosForRoadBuild () {
  sanitizePlannedBuildSites()
  const buildSite = getCurrentBuildSite();

  if (!buildSite) {
    console.error('All build sites have been used.  This scenario has yet to be implemented');
    return null;
  }
  console.log('Proposed build site', JSON.stringify(buildSite));
  Game.rooms[buildSite.roomName].createConstructionSite(buildSite.x, buildSite.y, STRUCTURE_ROAD);

  return getConstructionSiteAtPos(buildSite);
}

export {
  markPosForRoadBuild,
  getPosForRoadBuild
};
