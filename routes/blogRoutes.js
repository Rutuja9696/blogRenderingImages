const express = require("express");
const { getAllBlogs, getById } = require("../controller/actions.js");
const router = express.Router();
router.route("/").get(getAllBlogs);
router.route("/:id").get(getById);
module.exports = router;
