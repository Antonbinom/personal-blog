const mongoose = require('mongoose');
//конструктор схемы
const Schema = mongoose.Schema;

const postSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
}, { timestamps: true });

// применим схему к модели, и передадим в нее имя модели и имя схемы которую будет использовать
const Post = mongoose.model('Post', postSchema)

module.exports = Post;
