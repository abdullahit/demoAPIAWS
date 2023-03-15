const express = require('express');
const mysql =require('mysql2');
const bodyParser = require('body-parser');

const app=express();
const port = process.env.PORT || 2000;

//create connection pool
const connection = mysql.createConnection({
    //connectionLimit:10,
    host:'localhost',
    user:'root',
    password: 'Csd@4850',
    database:'mydb'
});

//parse application/json
app.use(bodyParser.json());

// define API endpoints
app.get('/users', (req, res)=>{
    connection.query('SELECT * FROM users', (err, rows)=>{
        if(err) throw err;

        res.json(rows);
    });
});

app.post('/users', (req, res)=>{
    const {name, email} = req.body;

    connection.query("INSERT INTO users (name, email) VALUES (?,?)", [name, email], (err, result)=>{
        if(err) throw err;
        res.json({id: result.insertId});
    });
});

//start server
app.listen(port, ()=>{
    console.log(`server started on port ${port}`);
});
