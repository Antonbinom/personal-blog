const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');

const postRouters = require('./routes/post-routes')
const contactRouters = require('./routes/contact-routes')

const createPath = require('./helpers/create-path')

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

// подключаем роуты к приложению
app.use(postRouters)
app.use(contactRouters)

// Страница 404
app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});
