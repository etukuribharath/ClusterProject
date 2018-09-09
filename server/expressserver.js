const express = require('express');
const mongoose = require('mongoose');
const app = express();


var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    port: 33060,
    user: "etukuribharath",
    password: "Lakshmi@123"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

mongoose.connect('mongodb://127.0.0.1:27017/mydb',()=>{
    console.log('connnected to My DB');
});

const Person = mongoose.model('Person', { name: String },'Person');

const bharath = new Person({ name: 'Etukuri Bharath' });
bharath.save().then(() => console.log('record inserted'));

app.use('/something',(req,res)=>{

    res.send('something')
    console.log('express is listening');
});

app.listen('8080',()=>{
    console.log("express is started");
})