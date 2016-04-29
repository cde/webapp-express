var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var nav = [{link: '/Books', text: 'Books'},{ link: '/Authors', text: 'Authors'} ];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);


app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine','ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
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