const { Contact } = require("../models/contact");
const paginate = require("mongoose-paginate-v2");

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const favorite = req.query.favorite;
  const filter = {};
  const options = {
    page,
    limit,
    sort: { name: 1 },
  };

  if (favorite !== undefined) {
    filter.favorite = favorite;
  }

  const contacts = await Contact.paginate(filter, options);

  res.json(contacts);
};
module.exports = getAll;
