/**
 * Created by eliana on 19/04/2016.
 */
var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var express = require('express');
var app = express(); // Instancia del servidor express
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var myCollection;
var db = MongoClient.connect('mongodb://127.0.0.1:27017/circulo', function(err, db)  {
    if(err)
        throw err;
    console.log("connected to the mongoDB !");
    myCollection = db.collection('Doubts');
});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.text());

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processFormFieldsIndividual(req, res);
    }

});

function displayForm(res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        console.log(res.write(data));
        res.write(data);
        res.end();
    });
}

function processFormFieldsIndividual(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var fields = [];
    var form = new formidable.IncomingForm();
    //Call back when each field in the form is parsed.
    form.on('field', function (field, value) {

            console.log(field);
            console.log(value);
            fields[field] = value;
        if (fields.body.submit) delete fields.body.submit;

    });
    //Call back when each file in the form is parsed.
    form.on('file', function (name, file) {
        console.log(name);
        console.log(file);
        fields[name] = file;



        //if (fields.body.submit) delete fields.body.submit;
        //Storing the files meta in fields array.
        //Depending on the application you can process it accordingly.
    });

    //Call back for file upload progress.
    form.on('progress', function (bytesReceived, bytesExpected) {
        var progress = {
            type: 'progress',
            bytesReceived: bytesReceived,
            bytesExpected: bytesExpected
        };
        console.log(progress);
        //Logging the progress on console.
        //Depending on your application you can either send the progress to client
        //for some visual feedback or perform some other operation.
    });

    //Call back at the end of the form.
    form.on('end', function () {

        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields
        }));

    });
    form.parse(req, function(err, fields, files){


        myCollection.insert(fields, function(err, result){
            if(err)
                throw err;
            console.log("entry saved");
        });
    });
    

}






server.listen(1185);
console.log("server listening on 1185");