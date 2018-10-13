// coinRoutes.js

const mysql = require('mysql');
var express = require('express');
var coinRoutes = express.Router();


var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pos_wholesale',
  multipleStatements: true
},'single');



mysqlConnection.connect((err) => {
  if (!err)
      console.log('DB connection server succeded.');
  else
      console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


//Insert Data

coinRoutes.route('/add').post(function (req, res) {

  var nametdata=req.body.name;
  var pricedata=req.body.price;

        var data = {
           name: nametdata,
           price: pricedata,
      };
  
  mysqlConnection.query('INSERT INTO student SET ?', data, function (error, results) {
          if (error) {
              console.log("Problem with Registration" + err);
          } else {
              console.log("INsert into reg ===========",results);
              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify(results));
          }
      });
});


// Defined get data(index or listing) route

coinRoutes.route('/').get(function (req, res) {

  mysqlConnection.query("select * from student", function (error, results) {
    if (error) {
        console.log("Problem with Registration" + err);
    } else {
        console.log("Select into reg ===========",results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results));
    }
});  
 
});


// Defined edit route

coinRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;

console.log("select * from student where id='"+id+"'");

  mysqlConnection.query("select * from student where id='"+id+"'", function (error, results) {
    if (error) {
        console.log("Problem with Registration" + err);
    } else {
        console.log("Select Edit student ===========",results);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(results));
    }
});  
});



//  Defined update route

coinRoutes.route('/update/:id').post(function (req, res) {

  console.log(req.params.id);
  var id=req.params.id;


  console.log("select * from student where id='"+ id+"'");

  mysqlConnection.query("select * from student where id='"+ id+"'", function (error, data) {
    if (error) {
        console.log("Problem with Registration" + err);
    } else {

      if(!data){
        return next(new Error('Could not load Document'));
      }
      else{

        var name=req.body.name;
        var price=req.body.price;
      
        console.log(name);
        console.log(price);

        console.log("update student set name='"+ name +"',price='"+ price +"' where id='"+ id +"'");


        mysqlConnection.query("update student set name='"+ name +"',price='"+ price +"' where id='"+ id +"'", function (error, results) {
          if (error) {
              console.log("Problem with Registration" + err);
          } else {
              console.log("Select Edit student ===========",results);
              res.setHeader('Content-Type', 'application/json');
              res.status(200).send(JSON.stringify(results));
          }
        })
      }  
    }
});  
});  



//  Coin.findById(req.params.id, function(err, coin) {
  //   if (!coin)
  //     return next(new Error('Could not load Document'));
  //   else {
  //     coin.name = req.body.name;
  //     coin.price = req.body.price;

  //     coin.save().then(coin => {
  //         res.json('Update complete');
  //     })
  //     .catch(err => {
  //           res.status(400).send("unable to update the database");
  //     });
  //   }
  // });


// // Defined delete | remove | destroy route
// router.route('/delete/:id').get(function (req, res) {
//    Coin.findByIdAndRemove({_id: req.params.id}, function(err, coin){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });

module.exports = coinRoutes;
