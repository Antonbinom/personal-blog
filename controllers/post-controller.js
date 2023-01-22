const createPath = require('../helpers/create-path')
const Post = require('../models/post');

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title: 'Error' });
}
const getPosts = (req, res) => {
  const title = 'Posts';
  Post
    .find()
    // сортируем по убыванию(-1)
    .sort({ createdAt: -1 })
    .then(posts => {
      res.render(createPath('posts'), { posts, title })
    })
    .catch(error => handleError(res, error))
}

const getPost = (req, res) => {
  const title = 'Post';
  // Находим пост по id
  Post
    .findById(req.params.id)
    .then(post => {
      res.render(createPath('post'), { post, title })
    })
    .catch(error => handleError(res, error))
}

const getAddPost = (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
}

const addPost = (req, res) => {
  const { title, author, text } = req.body
  // создаем пременную post с моделью, внутри которой передадим данные из запроса
  const post = new Post({ title, author, text })
  // применим к модели метод save
  post
    .save()
    // редирект на страницу с постами создания нового поста
    .then(result => res.redirect('/posts'))
    .catch(error => handleError(res, error))
}

const deletePost = (req, res) => {
  const title = 'Post';
  Post
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => handleError(res, error))
}

const getEditPost = (req, res) => {
  const title = 'Edit Post';
  Post
    .findById(req.params.id)
    .then(post => {
      res.render(createPath('edit-post'), { post, title })
    })
    .catch(error => handleError(res, error))
}

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, { title, author, text })
    .then(result => res.redirect(`/posts/${id}`))
    .catch(error => handleError(res, error))
}

module.exports = {
  getPosts,
  getPost,
  getAddPost,
  addPost,
  deletePost,
  getEditPost,
  editPost
}
