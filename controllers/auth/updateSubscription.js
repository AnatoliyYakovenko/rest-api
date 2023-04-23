const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id: owner } = req.user;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    owner,
    { subscription },
    { new: true }
  );
  res.json(result);
};
module.exports = updateSubscription;
