const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const avatarName = `${_id}.${originalname}`;
  const resultUpload = path.join(avatarsDir, avatarName);

  Jimp.read(`${tempUpload}`, async (error, avatarName) => {
    if (error) throw error;
    await avatarName.resize(250, 250).write(`${tempUpload}`);
    await fs.rename(tempUpload, resultUpload);
  });

  const avatarURL = path.join("avatars", avatarName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
