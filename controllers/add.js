const { Contact } = require("../models/contact");
const { addSchema } = require("../middleware/validation");
const { createError } = require("../helpers");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const contact = req.body;
  const { error } = addSchema.validate(contact);

  if (error) {
    throw createError(400, error.message);
  }
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = add;
