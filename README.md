# Store-API

This project was created to get some practice on pupulating a Mongo database dynamically, and to filter and sort different searches through the use of the back-end.
There is no Front-end in this project, but all is expected from the FE is to make http calls, and get the firltered and sorted results in a json format.


The shape of the products json object looks like this:


"products": [
        {
            "featured": true,
            "rating": 4.5,
            "name": "vase table",
            "price": 120,
            "company": "marcos",
        },


This API is able to search by name, company, featured, rating and price. And can also sort the final values in ascending or descending order. 


I used Node.js and MongoDB
