const mongoose = require('mongoose');
//конструктор схемы
const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
});

// применим схему к модели, и передадим в нее имя модели и имя схемы которую будет использовать
const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact;
