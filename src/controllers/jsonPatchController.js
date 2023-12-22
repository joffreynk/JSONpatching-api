const jsonPatchService = require("../services/jsonPatchService");

exports.applyJsonPatch = async (req, res, next) => {
  try {
    const { jsonObject, jsonPatch } = req.body;
    const patchedObject = jsonPatchService.applyPatch(jsonObject, jsonPatch);
    res.json({ result: patchedObject });
  } catch (error) {
    next(error);
  }
};
