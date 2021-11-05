1. npm init -y
2. npm i --save bcrypt cloudinary cookie-parser concurrently cors dotenv express express-fileupload jsonwebtoken mongoose
3. create react-project
   npx create-react-app client
4. Install these packages to react app
   npm i --save react-toastify react-router-dom history styled-components axios react-paypal-express-checkout --force

5. cloudinary meanhive4@gmail.com Pruthvi@143

### filtering the products

    gt => greater than  -> for price
    gte => greater than and equal
    lt => lesser than
    lte => lesser than and equal
    regex => regular expressions for title,product_id,category

    http://localhost:5000/api/products?price[lt]=2999
    http://localhost:5000/api/products?price[lte]=2999
    http://localhost:5000/api/products?price[gt]=2999
    http://localhost:5000/api/products?price[gte]=2999
    http://localhost:5000/api/products?title[regex]=product
    http://localhost:5000/api/products?title[regex]=product 01

### Sorting of products with respect to price

    low to high price
    	http://localhost:5000/api/products?sort=price
    high to low price
    	http://localhost:5000/api/products?sort=-price

### Paginating

## Front End

font-awesome icons fas fa-bars fa-shopping-cart fa-times
