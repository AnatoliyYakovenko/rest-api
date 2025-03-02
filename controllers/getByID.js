const { Contact } = require("../models/contact");
const {createError} = require("../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw createError(404);
  }

  res.json(result);
};

module.exports = getById;
