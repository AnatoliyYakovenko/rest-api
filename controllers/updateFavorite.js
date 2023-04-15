const createError = require("../helpers/createError");
const { Contact } = require("../models/contact");
const { updateFavoriteSchema } = require("../middleware/validation");

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const { error } = updateFavoriteSchema.validate(body);
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

module.exports = updateFavorite;
