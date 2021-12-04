const express= require("express");
const BodyParser= require("body-parser");
const request= require("request");
const https= require("https");


const app=express();

app.use(BodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res){

 const name=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.ml;

//   console.log(name, lastname, email);


 const data={

    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{

                FNAME: name,
                LNAME:lastname
            }
        }


    ]
  };




//   console.log(name);

const jsondata= JSON.stringify(data);
// console.log(jsondata);
const url="https://us20.api.mailchimp.com/3.0/lists/4772ad591c";

const options={
    method:"POST",
    auth:"arya:ea85f5a81a22735ae7cdb773cdb274b8-us20"
};

 const request = https.request(url, options, (response) => {
        console.log(response.statusCode);

        if(response.statusCode===200)
        {
            res.sendFile(__dirname+"/success.html");
        }

        else {
            res.sendFile(__dirname+"/failure.html");
        }


        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsondata);
    request.end();



});

app.post("/failure",function(req, res){

    res.redirect("/");

});





app.listen(process.env.PORT || 3000, function(){

    console.log("http://localhost:3000");
});



//ea85f5a81a22735ae7cdb773cdb274b8-us20
//4772ad591c