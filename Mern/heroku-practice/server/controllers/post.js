const Post = require("../models/post");

exports.create = (req, res) => {
   const { title, content, user } = req.body;

   switch (true) {
      case !title:
         return res.status(400).send("title can not be empty");
         break;
      case !content:
         return res.status(400).send("title can not be empty");
         break;
   }

   Post.create({ title: title, content: content, user: user }, (err, post) => {
      if (err) {
         console.log(err);
         res.status(400).json(err);
      } else {
         res.json(post);
      }
   });
};

exports.getPost = (req, res) => {
   Post.find({})
      .sort({ createdAt: -1 })
      .exec((err, posts) => {
         if (err) {
            console.log(error);
         }
         res.json(posts);
      });
};

exports.getPostById = (req, res) => {
   const { id } = req.params;

   Post.findOne({ _id: id }).exec((err, post) => {
      if (err) {
         console.log(err);
      }
      res.json(post);
   });
};

exports.update = (req, res) => {
   const { id } = req.params;
   const { title, content, user } = req.body;
   Post.findByIdAndUpdate({ _id: id }, { title, content, user }).exec((err, post) => {
      if (err) console.log(error);
      res.json(post);
   });
};
exports.remove = (req, res) => {
   const { id } = req.params;
   Post.findByIdAndDelete({ _id: id }).exec((err, post) => {
      if (err) console.log(err);
      res.json({
         message: "Item removed",
      });
   });
};
