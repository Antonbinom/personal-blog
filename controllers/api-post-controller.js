const Post = require('../models/post');

const handleError = (res, error) => {
  console.log(error);
}
const getPosts = (req, res) => {
  Post
    .find()
    .sort({ createdAt: -1 })
    .then(posts => res.status(200).json(posts))
    .catch(error => handleError(res, error))
}

const getPost = (req, res) => {
  // Находим пост по id
  Post
    .findById(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(error => handleError(res, error))
}

const addPost = (req, res) => {
  const { title, author, text } = req.body
  // создаем пременную post с моделью, внутри которой передадим данные из запроса
  const post = new Post({ title, author, text })
  // применим к модели метод save
  post
    .save()
    // редирект на страницу с постами создания нового поста
    .then(post => res.status(200).json(post))
    .catch(error => handleError(res, error))
}

const deletePost = (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch(error => handleError(res, error))
}

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, { title, author, text })
    .then(post => res.status(200).json(post))
    .catch(error => handleError(res, error))
}

module.exports = {
  getPosts,
  getPost,
  addPost,
  deletePost,
  editPost
}
