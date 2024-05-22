const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/',userController.getAllUser);
router.get('/:id',userController.getUser);
router.post('/',userController.createUser);
router.put('/user',userController.updateUser);
router.delete('/user',userController.deleteUser);

module.exports = router;