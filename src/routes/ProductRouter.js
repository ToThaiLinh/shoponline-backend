const express = require('express')
const router = express.Router()
const productController = require('../controllers/ProductController')
const { authMiddleWare } = require('../middleware/authMiddleWare')

router.post('/create', productController.createProduct)
router.put('/update/:id',authMiddleWare, productController.updateProduct)
router.delete('/delete/:id',authMiddleWare, productController.deleteProduct)
router.get('/all', productController.getAllProduct)
router.get('/details/:id', productController.getDetailsProduct)

module.exports = router