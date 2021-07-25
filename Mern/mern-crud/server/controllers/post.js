const Post = require("../models/post");

const slugify = require("slugify");

exports.create = (req, res) => {
   //    console.log(req.body);

   const { title, content, user } = req.body;

   const slug = slugify(title);

   //validate

   switch (true) {
      case !title:
         return res.status(400).json({ err: "Title can not be empty!" });
         break;
      case !content:
         return res.status(400).json({ err: "content can not be empty!" });
         break;
   }

   Post.create({ title: title, content: content, user: user, slug: slug }, (err, post) => {
      if (err) {
         console.log(err);
         res.status(400).json(err);
      } else {
         res.json(post);
      }
   });
};

exports.list = (req, res) => {
   Post.find({})
      .limit(10)
      .sort({ createdAt: -1 })
      .exec((err, posts) => {
         if (err) console.log(err);

         res.json(posts);
      });
};

exports.read = (req, res) => {
   const { slug } = req.params;

   Post.findOne({ slug: slug }).exec((err, post) => {
      if (err) console.log(err);

      res.json(post);
   });
};

exports.update = (req, res) => {
   const { slug } = req.params;
   const { title, content, user } = req.body;
   Post.findOneAndUpdate({ slug: slug }, { title, content, user }, { new: true }).exec((err, post) => {
      if (err) console.log(err);

      res.json(post);
   });
};

exports.remove = (req, res) => {
   const { slug } = req.params;
   Post.findOneAndRemove({ slug: slug }).exec((err, post) => {
      if (err) console.log(err);

      res.json({
         message: "deleted succesfuly!",
      });
   });
};
