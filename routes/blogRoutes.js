const express = require("express");
const {
  getAllBlogs,
  getById,
  deleteById,
  createBlog,
} = require("../controller/actions.js");
const router = express.Router();
router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:id").get(getById).delete(deleteById);
module.exports = router;
