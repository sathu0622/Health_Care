const Article = require('../models/Articles');

exports.createArticle = async (req, res) => {
  try {
    const { title, description, imageURL } = req.body;

    const newArticle = new Article({
      title,
      description,
      imageURL,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
