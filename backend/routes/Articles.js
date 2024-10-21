const express = require("express");
const { createArticle, getArticle } = require("../controllers/Articles");
const router = express.Router();

router.post("/articles", createArticle);
router.get("/viewArticles", getArticle);

module.exports = router;
