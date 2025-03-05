const router = require('express').Router();
const documentController = require('../controllers/document.controller');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/save', documentController.saveDocument);
router.get('/', documentController.getDocuments);

module.exports = router; 