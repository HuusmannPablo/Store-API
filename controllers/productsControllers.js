const Product = require('../models/productModel')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({}).sort('-company price')
    res.status(200).json({ products, numberOfHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, selectedFields, numericFilters } = req.query

    // Empty object to be filled with the requests
    const queryObject = {}

    if(featured) {
        queryObject.featured = featured === 'true' ? true : false
    }

    if(company) {
        queryObject.company = company
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i' }
    }

    if(numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|=|<=|>=)\b/g
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`)
        const options = ['price','rating'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]: Number(value)}
            }
        });
    }

    let searchResult = Product.find(queryObject);

    // SORTING FUNCTION
    if(sort) {
        const sortList = sort.split(',').join(' ');
        searchResult = searchResult.sort(sortList);
    } else {
        searchResult = searchResult.sort('createdAt')
    }
    
    // SELECTION OF SPECIFIC FIELDS TO SHOW
    if(selectedFields) {
        const selectedFieldsList = selectedFields.split(',').join(' ');
        searchResult = searchResult.select(selectedFieldsList);
    }

    // PAGINATION
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // EXAMPLE: total number of samples is 23
    // If my limit is 10, I will have 10 items in the first page, 
    // 10 in the second one, and 3 in the third one
    // If page = 2, I skip the first 10(limit) itmes, and show the next 10
    searchResult = searchResult.skip(skip).limit(limit)



    const products = await searchResult
    res.status(200).json({ products, numberOfHits: products.length })
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}