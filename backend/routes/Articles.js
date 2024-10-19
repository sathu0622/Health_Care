const express = require('express');
const { createArticle } = require('../controllers/Articles');
const router = express.Router();

router.post('/articles', createArticle);

module.exports = router;
