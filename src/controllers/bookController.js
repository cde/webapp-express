var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

//Revealing Model Pattern

var bookController = function(bookService, nav){
  var middleware = function(req,res,next){
    if(!req.user){
      res.redirect('/');
    }
    next();
  };
  var getIndex = function(req,res){
    var url = 'mongodb://localhost:27017/libraryApp';

    mongodb.connect(url, function(err,db){
      var collection = db.collection('books');
      collection.find().toArray(
        function(err, results){
          res.render('bookListView',{
            title: 'Render from ejs',
            nav: nav,
            books: results
          });
        }
      );
    });
  };

  var getById = function(req,res){
    var id = new objectId(req.params.id);

    var url = 'mongodb://localhost:27017/libraryApp';

    mongodb.connect(url, function(err,db){
      var collection = db.collection('books');
      collection.findOne({_id: id},
        function(err, results){
          if(results.bookId){
            bookService.getBookById(results.bookId,
              function(err, book){
                results.book = book;
                res.render('bookView',{
                  title: 'Render from ejs',
                  nav: nav,
                  book: results
                });
              }
            );
          }else{
            console.log(results);
            res.render('bookView',{
              title: 'Render from ejs',
              nav: nav,
              book: results
            });
          }

        }
      );
    });
  };

  return {
    getIndex: getIndex,
    getById: getById,
    middleware: middleware
  };
};

module.exports = bookController;