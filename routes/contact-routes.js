const express = require('express');
const router = express.Router();
const getContacts = require('../controllers/contact-controller')

// Получение данных страницы с контактами
router.get('/contacts', getContacts);

module.exports = router;
