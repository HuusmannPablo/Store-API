const Product = require('../models/productModel')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ 
        // name: 'vase table',
        // featured: true,
    })
    res.status(200).json({ products, numberOfHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name } = req.query
    const queryObject = {}

    if(featured) {
        queryObject.featured = featured ==='true' ? true : false
    }

    if(company) {
        queryObject.company = company
    }

    if(name) {
        queryObject.name = name
    }


    console.log(queryObject);
    const products = await Product.find(queryObject);
    res.status(200).json({ products, numberOfHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}