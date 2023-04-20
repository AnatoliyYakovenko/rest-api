const { createError } = require("../helpers");
const { Contact } = require("../models/contact");
const { addSchema } = require("../middleware/validation");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const { error } = addSchema.validate(body);
  if (error) {
    throw createError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
