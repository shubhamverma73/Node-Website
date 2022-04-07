const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const contact = require('../controllers/contact');
const feedback = require('../controllers/feedback');
const pages = require('../controllers/pages');
const user = require('../controllers/user');
const pageNotFound = require('../controllers/404');
const callMiddleware = require('../middleware/test_middleware');
const globalMiddleware = require('../middleware/globalMiddleware');
const auth = require('../middleware/auth');

router.get('/', home.index);
router.post('/contact-data', contact.contact_data);
router.put('/update-contact', contact.updateContacts);
router.patch('/update-contact-patch', contact.updateContactsPatch);
router.delete('/delete-contact', contact.deleteContacts);
router.get('/get-contacts', contact.getContacts);
router.get('/feedback', auth, feedback.feedback);
router.post('/feedback-data', feedback.feedback_data);
router.get('/page/:id', callMiddleware, globalMiddleware, pages.page); //Trying to call 2 middleware
router.get('/login', user.login_page);
router.post('/login', user.login);
router.get('/logout', auth, user.logout);
router.get('/logoutAll', auth, user.logoutFromAll);
router.get('/cookie', pages.cookie);
router.get('/session', pages.session);
router.get('*', pageNotFound.notFound);
module.exports = router;
