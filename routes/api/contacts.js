const express = require("express");
const ctrl = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { authenticate } = require("../../middleware");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, ctrlWrapper(ctrl.add));

router.delete("/:contactId", authenticate, ctrlWrapper(ctrl.removeById));

router.put("/:contactId", authenticate, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  authenticate,
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
