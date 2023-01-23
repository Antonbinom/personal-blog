const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPost,
  getAddPost,
  addPost,
  deletePost,
  getEditPost,
  editPost
} = require('../controllers/post-controller')
// Получаем все посты на странице с постами
router.get('/posts', getPosts);
// Страница с конкретным постом
router.get('/posts/:id', getPost);
// Страница с созданием поста
router.get('/add-post', getAddPost);
// Добавление нового поста в базу
router.post('/add-post', addPost)
// Удаляем отдельный пост
router.delete('/posts/:id', deletePost)
// Переходим на страницу редактирования поста
router.get('/edit/:id', getEditPost)
// Редактирование поста методом put
router.put('/edit/:id', editPost)

module.exports = router
