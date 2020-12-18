//all route handlers
const fs = require("fs");
const path = require("path");
const AppError = require("../helpers/appErrorClass");
const Blog = require("../models/blogs");
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
const createBlog = (req, res) => {
  //creating path for image
  const imagePath = path.join(__dirname, "..", req.file.path);
  //creating new blog
  let newBlog = new Blog(
    req.body.author,
    req.body.title,
    req.body.content,
    req.body.links,
    imagePath
  );
  blogs.push(newBlog);
  //writing output
  fs.writeFile(fileName, JSON.stringify(blogs, null, 2), (err) => {
    if (err) {
      sendErrorMessage(
        new AppError(500, "Internal Error", "Error in completing Request"),
        req,
        res
      );
      return err;
    }
    sendResponse(201, "Successful", newBlog, req, res);
  });
};
//delete by id
const deleteById = (req, res) => {
  //state index of element to be deleted
  const index = blogs.indexOf(blogs.id == req.params.id);
  if (index) {
    //delete and write
    blogs.splice(index, 1);
    fs.writeFile(fileName, JSON.stringify(blogs, null, 2), (err) => {
      sendResponse(200, "Successful", [], req, res);
    });
  } else {
    sendError(new AppError(404, "Not Found", "Blog not available"), req, res);
  }
};
//exporting controller functions
module.exports = { getAllBlogs, getById, createBlog, deleteById };
