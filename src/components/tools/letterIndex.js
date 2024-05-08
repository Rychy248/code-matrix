

/**
 * This function implement ASCII Letters CODE
 * @param { integer } index letter index to return
 * @returns String
 */
function letterIndex(index = 0) {
  const letters = [];
  for (let i = 65; i <= 90; i++) {
    letters.push(String.fromCharCode(i));
  }
  return letters[index];
};

function returnPluralS(numberOfElements) {
  return numberOfElements > 1 
  ? 's'
  : ''
  ;
}

export default letterIndex;
export {
  returnPluralS
};