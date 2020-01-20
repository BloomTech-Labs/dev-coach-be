const router = require('express').Router();

const chatController = require('./chat-controllers');
const checkAuth = require('../../utils/check-auth');

router.post('/', chatController.chat);
router.post('/auth', chatController.authenticate);
module.exports = router;