const router = require('express').Router()
const UserController = require('../controllers/UserController')
const auth = require('../middleware/AuthMiddleware')

router.post('/', auth, UserController.create)
router.get('/', auth, UserController.show)
router.get('/:id', auth, UserController.find)
router.patch('/:id', auth, UserController.update)

module.exports = router
