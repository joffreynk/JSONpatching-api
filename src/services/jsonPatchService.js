const jsonpatch = require("json-patch");

exports.applyPatch = (jsonObject, jsonPatch, res) => {
  try {
    const result = jsonpatch.apply(jsonObject, jsonPatch)
    return result
  } catch (error) {
    return res.status(404).json(error);
  };
};
