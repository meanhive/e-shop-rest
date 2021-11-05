require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));

// add middlewares
app.use(express.static(path.join(__dirname, "../", "build")));
app.use(express.static("public"));

/*view engine*/
app.set("view engine", "ejs");
app.set("views", "./views");


// connect to mongodb
const URI = process.env.MONGO_URI;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser:true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB');
});

// app.use("/", (req,res,next) => {
// 	res.render("index.ejs");
// });


app.use('/user', require('./routes/userRoute'));
app.use('/api', require('./routes/categoryRoute'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/productRoute'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('server is running @ port ', PORT);
});