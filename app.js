var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = express.Router();


app.use(express.static('public'));
app.set('views','./src/views');

app.set('view engine','ejs');

bookRouter.route('/')
    .get(function(req,res){
        res.send('Hello Books');
    });
bookRouter.route('/Single')
    .get(function(req,res){
        res.send('Hello Single Book');
    });

app.use('/Books', bookRouter);
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