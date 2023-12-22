const jsonPatchService = require('../services/jsonPatchService');
const { patchValidation } = require('../validation/patchValiation');

exports.applyJsonPatch = async (req, res, next) => {
  try {
    const { jsonObject, jsonPatch } = req.body;
    patchValidation(jsonObject, jsonPatch, res);
    const patchedObject = jsonPatchService.applyPatch(jsonObject, jsonPatch, res);
    res.json({ result: patchedObject });
  } catch (error) {
    next(error);
  }
};
