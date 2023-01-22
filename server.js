const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const Post = require('./models/post');
const Contact = require('./models/contact');

const app = express();
app.set('view engine', 'ejs');

const PORT = 3000;
// параметры для подключения к базе
const db = 'mongodb+srv://Antonbinom:Rg1570S5470@test.xu3803a.mongodb.net/node-blog?retryWrites=true&w=majority'

// фикс варнинга
mongoose.set('strictQuery', false)

// подключение базы через mongoose
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(res => console.log('Connect to DB'))
  .catch(error => console.log(error))

// путь к файлу с версткой
const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port http://localhost:${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false }));

app.use(express.static('style'));

// будет реагировать на строку _method и вызывать кастомный метод PUT
app.use(methodOverride('_method'))

// Главная страница
app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

// Получение данных страницы с контактами
app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  // получаем данные из коллекции с контактами
  Contact
    .find()
    .then(contacts => res.render(createPath('contacts'), { contacts, title }))
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' })
    });
});

// Получаем все посты на странице с постами
app.get('/posts', (req, res) => {
  const title = 'Posts';
  Post
    .find()
    // сортируем по убыванию(-1)
    .sort({ createdAt: -1 })
    .then(posts => {
      res.render(createPath('posts'), { posts, title })
    })
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' });
    });
});

// Страница с конкретным постом
app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  // Находим пост по id
  Post
    .findById(req.params.id)
    .then(post => {
      res.render(createPath('post'), { post, title })
    })
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' })
    })
});

// Страница с созданием поста
app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
});

// Добавление нового поста в базу
app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body
  // создаем пременную post с моделью, внутри которой передадим данные из запроса
  const post = new Post({ title, author, text })
  // применим к модели метод save
  post
    .save()
    // редирект на страницу с постами создания нового поста
    .then(result => res.redirect('/posts'))
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' })
    })
})

// Удаляем отдельный пост
app.delete('/posts/:id', (req, res) => {
  const title = 'Post';
  Post
    .findByIdAndDelete(req.params.id)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' })
    })
})

// Переходим на страницу редактирования поста
app.get('/edit/:id', (req, res) => {
  const title = 'Edit Post';
  Post
    .findById(req.params.id)
    .then(post => {
      res.render(createPath('edit-post'), { post, title })
    })
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' })
    })
})

// Редактирование поста методом put
app.put('/edit/:id', (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, { title, author, text })
    .then(result => res.redirect(`/posts/${id}`))
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' })
    })
})

// Страница 404
app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
