const express = require('express');
const { randomUser, allUser, addUsers, deleteUser } = require('../controllers/userControllers');

const router = express.Router();


router.route('/random').get(randomUser)
router.route('/all').get(allUser)
router.route('/save').post(addUsers)
router.route('/update').patch(addUsers)
router.route('/delete/:id').delete(deleteUser)

module.exports = router;