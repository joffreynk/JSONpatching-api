exports.patchValidation = (jsonObject, jsonPatch, res) => {
  if (!jsonObject || !jsonPatch) {
    return res
      .status(401)
      .json({ error: 'Both JSON object and JSON patch are required.' });
  }

  if (typeof jsonObject !== 'object') {
    return res
      .status(401)
      .json({ error: 'Invalid JSON object format. Must be an object.' });
  }

  if (!Array.isArray(jsonPatch) && typeof jsonPatch !== 'object') {
    return res
      .status(401)
      .json({ error: 'Invalid JSON Patch format. Must be an Array or Object.' });
  }

  if (Array.isArray(jsonPatch) && jsonPatch.length < 1) {
    return res
      .status(401)
      .json({ error: 'Invalid JSON Patch.It cannot be an empty array' });
  }
  return null;
};