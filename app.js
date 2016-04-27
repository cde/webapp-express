var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views','./src/views');

var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));

app.set('view engine','.hbs');

app.get('/', function(req, res) {
    res.render('index', {title: 'Render from handlebars', list:['Carmen', 'Gabriel', 'Jeremy']});
});
app.listen(5000, function(err) {
    console.log('running server on port ' + port);
});