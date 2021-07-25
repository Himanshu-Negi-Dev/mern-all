const express = require("express");
const router = express.Router();

const { create, getPost, getPostById, update, remove } = require("../controllers/post");

const { requireSignin } = require("../controllers/auth");

router.get("/", getPost);
router.get("/:id", getPostById);
router.post("/create", requireSignin, create);
router.put("/update/:id", requireSignin, update);
router.delete("/delete/:id", requireSignin, remove);
module.exports = router;
