const express = require("express");
const {
  getAllBlogs,
  getById,
  deleteById,
} = require("../controller/actions.js");
const router = express.Router();
router.route("/").get(getAllBlogs);
router.route("/:id").get(getById).delete(deleteById);
module.exports = router;
