const express = require("express");
const {
  getAllBlogs,
  getById,
  deleteById,
  createBlog,
} = require("../controller/actions.js");
const upload = require("../helpers/multerFunction.js");
const router = express.Router();
router.route("/").get(getAllBlogs).post(upload.single("image"), createBlog);
router.route("/:id").get(getById).delete(deleteById);
module.exports = router;
