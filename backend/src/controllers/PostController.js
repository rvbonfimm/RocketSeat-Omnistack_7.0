const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt"); // - set order to desc
    return res.json({ posts });
  },
  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = image.split(".");
    const newFileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 }) // set quality to 70%
      .toFile(path.resolve(req.file.destination, "resized", newFileName));

    // Delete the first passed image
    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: newFileName
    });

    req.io.emit("New post created", post);

    return res.json(post);
  }
};
