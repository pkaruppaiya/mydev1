// server.js

// const express = require('express'),
//       path = require('path'),
//       bodyParser = require('body-parser'),
//       cors = require('cors'),
//       mongoose = require('mongoose'),
//       config = require('./config/DB'),
//       coinRoutes = require('./expressRoutes/coinRoutes');

// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB).then(
//     () => {console.log('Database is connected') },
//     err => { console.log('Can not connect to the database'+ err)}
//   );

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());
// const port = process.env.PORT || 4000;

// app.use('/coins', coinRoutes);

// const server = app.listen(port, function(){
//   console.log('Listening on port ' + port);
// });

//Service 

const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const cors = require('cors'),

//Declaration routes

coinRoutes = require('./expressRoutes/coinRoutes');

app.use(bodyparser.json());
app.use(cors()); //added


// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'pos_wholesale',
//     multipleStatements: true
// },'single');




// mysqlConnection.connect((err) => {
//     if (!err)
//         console.log('DB connection succeded.');
//     else
//         console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
// });



//Service files

app.use('/coins', coinRoutes);

app.listen(4000, () => console.log('Express server is runnig  mysql at port no : 4000'));





//Get all employees
app.get('/master_brand', (req, res) => {
    mysqlConnection.query('SELECT * FROM master_brand', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});




//Get an employees
app.get('/master_brand/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM master_brand WHERE id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});



//Delete an employees
app.delete('/employees/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Employee WHERE EmpID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
