const { createError } = require("../helpers");
const { Contact } = require("../models/contact");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw createError(404);
  }

  res.json({ message: "contact deleted" });
};

module.exports = removeById;
