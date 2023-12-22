const jsonpatch = require("json-patch");

exports.applyPatch = (jsonObject, jsonPatch) => {
  return jsonpatch.apply(jsonObject, jsonPatch);
};
