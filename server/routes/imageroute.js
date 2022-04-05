const route = require("express").Router();
const store = require("../middleware/multer");
const controller = require("../controller/upload");

route.post("/upload", store.array("image", 12), controller.uploads);

module.exports = route;
