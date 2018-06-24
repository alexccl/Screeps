/**
 * Returns a random integer between 0 and the upper bounds
 * @param {Number} maxInt - The upper bound (maxInt inclusive)
 */
const getRandomInt = (maxInt) => (
  Math.floor(Math.random() * Math.floor(maxInt + 1))
);

export default getRandomInt;

