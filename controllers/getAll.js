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
  const limit = parseInt(req.query.limit) || 2;
  const options = {
    page,
    limit,
    sort: { author: 1 },
  };

  const result = await Contact.paginate({}, options);
  res.json(result);
};

module.exports = getAll;
