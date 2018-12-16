////////////////////////////////////////////
//
// index.js
// Author: Brian
//
///////////////////////////////////////////

console.log("Start...");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var now = new Date();
var pc = 0;
var pc2 = 0;
var pc3 = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname+'/app'));

var dbconnect = mysql.createConnection({
    host: "localhost",
    user: "jspr3",
    password: "jspr33",
    database: "MYDB3"
});

dbconnect.connect(function(err){
    if(err){
        console.log(dbTime()+" MySQL: "+err.toString());
    }
    else
    {
        console.log(dbTime()+" MySQL connected...");
    }
});

//Clean user's input.
function dbData(data)
{
    var cTrim = ['"', ' ', '<', '>', ';', '=', '\\', ',', '\'', '#'];
    var temp = data;
    try{
        temp += " ";
        temp = temp.toString();
    }catch(err)
    {
        console.log("DataError....");
    }
            
    var temp3;
    for(var i = 0; i < cTrim.length; i++)
    {
        temp = temp.replace(cTrim[i],' ');
    }
    temp3 = temp.trim();
    console.log(dbTime()+" "+temp3);
    return temp3;
};

//Time.
function dbTime()
{
    now = new Date();
    return now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
}

app.set('port', (process.env.PORT || 8000));
app.get('/', function(req, res) {
        console.log(dbTime()+" Get index#"+ pc++);
        res.sendFile(__dirname +'/'+'app/view/index.html');
    });
    
app.get('/reports', function(req, res) {
        console.log(dbTime()+" Get reports#"+ pc2++);
        res.sendFile(__dirname +'/'+'app/view/reports.html');
    });

app.get('/pcharts', function(req, res) {
        console.log(dbTime()+" Get charts#"+ pc3++);
        res.sendFile(__dirname +'/'+'app/view/pcharts.html');
    });

//Clients db list.
app.get('/clients', function(req, res) {
    console.log(dbTime()+" Get #bhdb");
    var sql = "SELECT * FROM CLIENTS3";
    dbconnect.query(sql, function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL clients..."+result.toString());
            res.send(result);
        }
    });
});

//New clients.
//Step1
app.post('/clientPost', function(req, res) {
    var data = req.body;
    var dname = dbData(data.name);
    //var dtype = dbData(data.type);
    //var dlatitude = dbData(data.latitude);
    //var dlongitude = dbData(data.longitude);
    //var delevation = dbData(data.elevation);
    var done = false;
    console.log(dbTime()+" clientPost: "+dname);
    var tsql = "SELECT * FROM CLIENTS3 WHERE name = ?";
    dbconnect.query(tsql, [dname], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL01: "+err.toString());
            res.send(dbTime()+" dbError01: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhnameSl..."+result.length);
            if(result.length < 1)
            {
                done = true;
                newClient(req, res, done);
            }
            else
            {
               res.send(dbTime()+" dbE: 001"); 
            }
        }
    });
    
});
//
//New clients.
//Step2
function newClient(req, res, done){
    console.log(dbTime()+" MySQL clientPost...");
    if(done !== true)
    {
        console.log(dbTime()+" MySQL clientPost...Error1");
        res.send(dbTime()+"doneError:1 ");
        return 0;
    }
    var data = req.body;
    var dname = dbData(data.name);
    var demail = dbData(data.email);
    var dtel = dbData(data.tel);
    var ddate1 = dbData(data.date1);
    var ddate2 = dbData(data.date2);
    var ddate3 = dbData(data.date3);
    var sql = "INSERT INTO CLIENTS3 (name, email, tel, date1, date2, date3)"+
        "VALUES(?,?,?,?,?,?)";
    dbconnect.query(sql,[dname, demail, dtel, ddate1, ddate2, ddate3], function(err, result){
        if(err){
            console.log(dbTime()+" MySQL02: "+err.toString());
            res.send(dbTime()+" dbError02: 2");
        }
        else
        {
            console.log(dbTime()+" MySQL clientsPost2..."+result.toString());
            res.send(result);
        }
    });        
};

//Update clients.
app.put('/upclients', function(req, res) {
    var data = req.body;
    var dname = dbData(data.name);
    var demail = dbData(data.email);
    var dtel = dbData(data.tel);
    var ddate1 = dbData(data.date1);
    var ddate2 = dbData(data.date2);
    var ddate3 = dbData(data.date3);
    console.log(dbTime()+" Update:cldb "+dname);
    var sql = "UPDATE CLIENTS3 SET email = ?, tel = ?, date1 = ?, date2 = ?,"+
              "date3 = ? WHERE name = ?";
    dbconnect.query(sql, [demail, dtel, ddate1, ddate2, ddate3, dname], function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL bhPost..."+result.toString());
            res.send(result);
        }
    });
});

//Delete clients.
app.post('/dclients', function(req, res) {
    var data = req.body;
    var bhname = dbData(data.name);
    console.log(dbTime()+" Delete:client "+bhname);
    var sql = "DELETE FROM CLIENTS3 WHERE name = ?";
    dbconnect.query(sql, [bhname], function(err, result, fields){
        if(err){
            console.log(dbTime()+" MySQL: "+err.toString());
            res.send(dbTime()+" dbError: offline");
        }
        else
        {
            console.log(dbTime()+" MySQL dclients..."+result.toString());
            res.send(result);
        }
    });
});

//
var pport = app.get('port');
app.listen(pport, function() {
    console.log('App is now running at http://localhost:'+pport+'/');
    console.log('Hit CTRL-C to stop the server');
    console.log(now);
});
//
