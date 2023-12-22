const { logger } = require("../utils/logger");

exports.patchValidation = (jsonObject, jsonPatch, res)=>{
  if (!jsonObject || !jsonPatch) {
    return res
      .status(400)
      .json({ error: "Both JSON object and JSON patch are required." });
  }

  if (typeof jsonObject !== "object") {
    return res
      .status(400)
      .json({ error: "Invalid JSON object format. Must be an object." });
  }

  if (!Array.isArray(jsonPatch) && typeof jsonPatch !== "object" ) {
    logger.log("debug", typeof jsonPatch);
    return res
      .status(400)
      .json({ error: "Invalid JSON Patch format. Must be an Array or Object." });
  }

  

}