const validator = require("xsd-schema-validator");

function validateXML(xml, xsdPath, callback) {
  validator.validateXML(xml, xsdPath, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result.valid);
    }
  });
}
module.exports = { validateXML };
