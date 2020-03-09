var express = require("express");
var bodyParser= require('body-parser');
var cors = require('cors')
var app = express();
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(cors());

app.use(function(req,res, next){
res.header('Access-Control-Allow-Origin','*');
res.header('Access-Control-Allow-Credentials','true');
res.header('Access-Control-Allow-Methods','GET,PUT,DELETE,OPTIONS,POST');
res.header('Access-Control-Allow-Headers',
  'X-Requested-With, Content-Type, X-Codingpedia, Authorization');
next();
});


function execSQL(sqlQry){
   return new Promise((resolver,reject)=>{
       const connection=mysql.createConnection({
           host :"localhost",
           user:"root",
           port:"3306",
           password:"coti",
           database:"BDRC"
        });

 connection.query(sqlQry, function(error, results, fields){
   if (error){
        reject(error);
   }
    else{
        resolver(results);
    }
    connection.end();
    console.log('Abriu o Banco');
 });        
});
}

app.post("/cliente", (req,res)=>{
  var nome = req.body.nome;
  var email = req.body.email;
  var idade = req.body.idade;
   
   execSQL(`insert into cliente (nome, email, idade) values 
       ('${nome}','${email}','${idade}')`)
   .then((dados)=>res.json(dados));
});


app.get("/cliente", (req,res)=>{
     execSQL(`select * from cliente`).then((dados)=>res.json(dados));
  });

app.get("/cliente/:id", (req,res)=>{
    var id = parseInt(req.params.id);  
    execSQL(`select * from cliente where id=`+id).then((dados)=>{
        //[{}]  para  {}
      let obj = dados[0] || {};
      res.json(obj);
    }).catch((err)=>{
          res.status(500).json({erro:"Falha ao Buscar o ID"});
    })
 });

var server = app.listen(process.env.PORT || 4008)

// var server = app.listen(4000, 'localhost', function(){
//     console.log('Escutando a porta 4000');
// });