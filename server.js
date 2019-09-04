var express = require("express");
var path = require("path");
var bodyParser = require('body-parser'); 
var db = require("./config.js");

var app = express();
var port = process.env.port || 7778;
var srcpath  =path.join(__dirname,'/public') ;
app.use(express.static('public'));
app.use(bodyParser.json({limit:'5mb'}));  
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));
 
//api to get data from database
app.get("/api/getdata",function(req,res){ 
 let sql = 'SELECT rowid,name,address,email,phone,job,salary FROM roster_info';
 
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.send({data : err.message});
        }
        else{
            res.send(JSON.stringify(rows));
        }
    });
});


//api to Delete data from database
app.post("/api/Removedata",function(req,res){ 
    db.run('DELETE FROM roster_info WHERE rowid=?', req.body.id, function(err) {
        if (err) {
            res.send({data : err.message});
        }
        else{
            res.send({data : "Employee deleted"});
        }
    });
});


//api to Update data from database
app.post("/api/Updatedata",function(req,res){ 
    var inputData = [req.body.name,req.body.address,req.body.email,req.body.phone,req.body.job,req.body.salary,req.body.id];

    db.run("UPDATE roster_info SET name=?, address=?, email=?, phone=?,job=?,salary=? WHERE rowid=?",inputData,function(err,rows){
        if (err) {
            res.send({data : err.message});
        }
        else{
            res.send({data : "Employee data updated"});
        }
    });
});


//api for Insert data from database
app.post("/api/savedata",function(req,res){         
    db.run("INSERT into roster_info(name,address,email,phone,job,salary) VALUES ( ?,?,?,?,?,? )",[req.body.name,
            req.body.address,req.body.email,req.body.phone,req.body.job,req.body.salary],function(err) {
        if (err) {
            res.send({data : err.message});
        }
        else{
            res.send({data : "Employee inserted"});
        }
    });
});

//search function
app.post("/api/Searchdata",function(req,res){ 
 let word = req.body.keyword;
 let sql;
 var params = [];
 
 if(word == undefined || word.length == 0){
    sql = 'SELECT rowid,name,address,email,phone,job,salary FROM roster_info';    
 }   
 else{
    sql = "SELECT rowid,name,address,email,phone,job,salary FROM roster_info WHERE name like ? or address like ? or email like ? or phone like ? or job like ? or salary like ?";

    word='%'+word+'%';
    params = [word,word,word,word,word,word];
 }

 db.all(sql, params, (err, rows) => {
        if (err) {
            res.send({data : err.message});
        }
        else{
            res.send(JSON.stringify(rows));
        }
    });
});
    
// call by default index.html page
app.get("*",function(req,res){ 
    res.sendFile(srcpath +'/index.html');
})

//server stat on given port
app.listen(port,function(){ 
    console.log("server start on port"+ port);
})