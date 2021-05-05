const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function (req,res){
    res.sendFile(__dirname+"/signup.html");
})
app.get("/failure",function (req,res){
    res.redirect("/");
})
app.post("/",function (req,response){

   let firstName = req.body.fName;
   let lastName = req.body.lName;
   let email = req.body.email;
   let data={
     members:[
         {
             email_address:email,
             status:"subscribed",
             merge_fields:{
                 FNAME:firstName,
                 LNAME:lastName
             }

         }
     ]
   };
   const url="https://us1.api.mailchimp.com/3.0/lists/18c67fd8d0";
    let jsonData = JSON.stringify(data);
    const options={
      method:"POST",
      auth:"JMBP1999:9b5d6d00f9c269465de5ae3406011658-us1"
    };
    const request = https.request(url,options,function(res){
        if(res.statusCode==200){
            response.sendFile(__dirname+"/success.html");
        }
        else{
            response.sendFile(__dirname+"/failure.html");
        }
        res.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT||3000,function (){
});

/*
9b5d6d00f9c269465de5ae3406011658-us1*/

/*
18c67fd8d0*/
