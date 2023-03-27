const Product = require('../models/productModel')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('-company price')
    res.status(200).json({ products, numberOfHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, } = req.query
    const queryObject = {}

    if(featured) {
        queryObject.featured = featured ==='true' ? true : false
    }

    if(company) {
        queryObject.company = company
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }


    console.log(queryObject);
    let searchResult = Product.find(queryObject);
    if(sort) {
        const sortList = sort.split(',').join(' ');
        searchResult = searchResult.sort(sortList);
    } else {
        searchResult = searchResult.sort('createdAt')
    }
    const products = await searchResult
    res.status(200).json({ products, numberOfHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}