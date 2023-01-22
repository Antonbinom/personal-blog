const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const Post = require('./models/post');
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

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [
    { name: 'GitHub', link: 'https://github.com/Antonbinom' },
  ];
  res.render(createPath('contacts'), { contacts, title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  const post = {
    id: 1,
    title: 'Post title',
    text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
    date: '21.01.2023',
    author: 'Anton'
  }
  res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = [
    {
      id: 1,
      title: 'Post title1',
      text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
      date: '21.01.2023',
      author: 'Anton'
    },
    {
      id: 2,
      title: 'Post title2',
      text: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente quidem provident, dolores, vero laboriosam nemo mollitia impedit unde fugit sint eveniet, minima odio ipsum sed recusandae aut iste aspernatur dolorem.',
      date: '21.01.2023',
      author: 'Anton'
    },
  ]
  res.render(createPath('posts'), { title, posts });
});

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
});

app.post('/add-post', (req, res) => {
  const { title, author, text } = req.body
  // создаем пременную post с моделью, внутри которой передадим данные из запроса
  const post = new Post({ title, author, text })
  // применим к модели метод save
  post
    .save()
    .then(result => res.send(result))
    .catch(error => {
      console.log(error);
      res.render(createPath('error'), { title: 'Error' })
    })
})

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
