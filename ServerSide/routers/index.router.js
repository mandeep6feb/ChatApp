let express = require('express')
const router = express.Router();
const ctrlUser = require('../controllers/userRegisterController');

router.post('/register', ctrlUser);

module.exports = router;