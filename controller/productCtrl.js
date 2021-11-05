const Products = require('../models/productModel');

/* filter sort and pagination */

class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = {...this.queryString}; // this.queryString = req.query;
        // console.log( 'before delete =', queryObj);
        const excludeFields = ['page', 'sort', 'limit'];
        excludeFields.forEach((el) => delete(queryObj[el]));

        // console.log('after delete page', queryObj);

        let queryStr = JSON.stringify(queryObj);
        // console.log({ queryObj, queryStr });

        // console.log({  queryStr });
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$' + match);

        this.query.find(JSON.parse(queryStr));

        return this;
    }

    /* sorting products w.r.to price */
    sorting() {
        if(this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            console.log(sortBy);
            this.query = this.query.sort(sortBy);
        }else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    paginating() {

        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}


const productCtrl = {
    getProducts: async (req,res) => {
        try {
            // console.log(req.query);
            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating();
            const products = await features.query;
            // const products = await Products.find();
                // res.json(products);

                res.json({
                    status: 'success',
                    result: products.length,
                    products: products
                });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProduct: async (req,res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;

            if(!images) return res.status(400).json({ msg: "No image found" });

            const product = await Products.findOne({product_id});
                if(product) 
                    return res.status(400).json({ msg: "This product already exists" });
                
                const newProduct = new Products({
                    product_id, title: title.toLowerCase(), price, description, content, images, category
                });

                await newProduct.save();

                res.json({msg: "Created new Product"});

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    updateProduct: async (req,res) => {
        try {
        
            const { title, price, description, content, images, category } = req.body;
                if(!images) return res.status(400).json({ msg: "No image to Upload" });

                await Products.findOneAndUpdate({_id: req.params.id}, {
                    title: title.toLowerCase(),
                    price,
                    description,
                    content,
                    images,
                    category
                });

                res.json({ msg: "Updated a Product" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    deleteProduct: async (req,res) => {
        try {
            await Products.findByIdAndDelete(req.params.id);
            res.json({ msg: "Deleted a Product" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};


module.exports = productCtrl;