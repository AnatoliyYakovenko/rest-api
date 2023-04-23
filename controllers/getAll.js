const { Contact } = require("../models/contact");
const paginate = require("mongoose-paginate-v2");

// const getAll = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Contact.find(
//     { owner },
//     "-createdAt -updatedAt"
//   ).populate("owner", "name email");
//   res.json(result);
// };

const getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
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
  let contacts = await Contact.find(filter);
  contacts = await Contact.paginate({}, options);
  res.json(contacts);
};
module.exports = getAll;
