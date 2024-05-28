const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
    try {
        const {name, image, type, price, countInStock, rating, description} = req.body;

        if(!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(200).json({
                status: 'ERR',
                message: "The input is required"
            })
        }
        const response = await ProductService.createProduct(req.body)
        console.log(req.body)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}


const updateProduct = async (req, res) => {
    try {
        const productId = await req.params.id
        const data = req.body
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: "The productId is required"
            })
        }
        const response = await ProductService.updateProduct(productId, data)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = await req.params.id;
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: "The productId is required"
            })
        }
        const response = await ProductService.deleteProduct(productId)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const response = await ProductService.getAllProduct()
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}

const getDetailsProduct = async (req, res) => {
    try {
        const productId = await req.params.id;
        if(!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: "The productId is required"
            })
        }
        const response = await ProductService.getDetailsProduct(productId)
        return res.status(200).json(response)
    }
    catch(e) {
        console.log(e);
        return res.status(404).json({
            err: e,
            message: 'lỗi rồi'
        })
    }
}


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getDetailsProduct
}