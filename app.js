var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 5000;
var nav = [{link: '/Books', text: 'Books'},{ link: '/Authors', text: 'Authors'} ];

//Routes
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.set('views','./src/views');

app.set('view engine','ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index',
        {
            title: 'Render from ejs',
            nav:[{link: '/Books', text: 'Books'},{ link: '/Authors', text: 'Authors'} ]
        });
});
app.listen(5000, function(err) {
    console.log('running server on port ' + port);
});