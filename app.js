const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 4040;

// Database connection 
mongoose.connect('mongodb://127.0.0.1:27017/Pizza-CAMT-se262', { useNewUrlParser: true, useUnifiedTopology: true})
.then(result => console.log('connect to db'))
.catch(err => console.log(err))

const orderSchema = new mongoose.Schema({//create new schema
    name: String,
    price: String,
    status: String,
});

const order = mongoose.model('order', orderSchema);//create collection
module.exports = order;

// Object
const admin = [];

// body-parser
app.use(bodyparser.urlencoded({ extended: true }));
//static to called CSS
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));

// Set views 
app.set('views', './views/Customers');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index', { text: "Please select table before order." });
});
app.get('/allmenu', function(req, res){
    res.render('allmenu');
});
app.get('/maindish', function(req, res){
    res.render('maindish');
});
app.get('/drinks', function(req, res){
    res.render('drinks');
});
app.get('/appetizer', function(req, res){
    res.render('appetizer');
});

/** Kitchen part */
app.get('/login',function(req, res){
    res.render('Login');
});

app.post('/loging', function(req, res){
    const userName = req.body.UserName;
    const password = req.body.Password;
    const data = {
        name: userName,
        pass: password,
    }
    admin.push(data);
    console.log(admin);;
    res.render('tableList');
});

app.post('/sprite', (req, res) => {
    const i = req.body.n;
    console.log("db sprite: "+i);
    
    res.redirect('/drinks');
})

app.listen(port, function(){
    console.log("Server listeming on port ", port);
});