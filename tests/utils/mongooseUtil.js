/**
 *  Convert mongoose document to plain JS object.
 *
 * @param {Document} doc Mongoose document.
 *
 * @return {Object} Plain JS object.
 */
exports.docToObj = (doc) => {
  const json = JSON.stringify(doc.toObject());
  return JSON.parse(json);
};
