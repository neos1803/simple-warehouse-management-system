const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
// const auth = require('../middleware/AuthMiddleware')
const upload = require("../middleware/UploadMiddleware")

router.post('/', upload.single("image"), ProductController.create)
router.get('/', ProductController.show)
router.get('/:id', ProductController.find)
router.patch('/:id', ProductController.update)
router.delete('/:id', ProductController.delete)

module.exports = router
