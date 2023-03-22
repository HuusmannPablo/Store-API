require('dotenv').config();
// async errors

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productRouter = require('./routes/productsRoutes')
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

// MIDDLEWARE
app.use(express.json({}));

// ROUTES
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href:"/api/v1/products">Products Route</a>')
});

app.use('/api/v1/products', productRouter)

const port = process.env.PORT || 3000

// PRODUCT ROUTE
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start();
