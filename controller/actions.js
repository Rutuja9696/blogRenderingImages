//all route handlers
const fs = require("fs");
const path = require("path");
const AppError = require("../helpers/appErrorClass");
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const fileName = path.join(__dirname, "..", "data", "data.json");
const blogs = JSON.parse(fs.readFileSync(fileName, "utf-8"));

//get all blogs
const getAllBlogs = (req, res, next) => {
  //querry prameter
  let data = blogs.filter((blog) => {
    return Object.keys(req.query).every((param) => {
      return blog[param] == req.query[param];
    });
  });
  sendResponse(200, "Successful", data, req, res);
};
//get by id
const getById = (req, res) => {
  const blogDisplay = blogs.find((blog) => {
    return blog.id == req.params.id;
  });
  if (blogDisplay) {
    sendResponse(200, "Successful", [blogDisplay], req, res);
  } else {
    sendError(new AppError(404, "Not Found", "Blog not available"), req, res);
  }
};
//create blog
const createBlog = (req, res) => {};
//delete by id
const deleteById = (req, res) => {
  const index = blogs.indexOf(blogs.id == req.params.id);
  blogs.splice(index, 1);
  if (index) {
    sendResponse(200, "Successful", [index], req, res);
  } else {
    sendError(new AppError(404, "Not Found", "Blog not available"), req, res);
  }
};
module.exports = { getAllBlogs, getById, createBlog, deleteById };
