const express = require('express');
const router = express.Router();
const { login } = require('../controllers/controller_auth');

router.post('/', login);

module.exports = router;
