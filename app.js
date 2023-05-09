
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/signup.html');
})


app.post('/', function(req, res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const https = require('https');
    
   const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merger_fields: {
                FNAME: firstName,
                LNMAE: lastName
            }
        }
    ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/47fb01c292"


   const options = {
    method : "POST",
    auth: "dimas1:ab36379efc2aa8b7c3c0c968e0f8fc64-us21"
   }

   const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
        console.log(JSON.parse(data));
    })
})

request.write(jsonData);
request.end();

});

app.listen(3000, function () {
    console.log('Server is running on port 3000');
});


//API KEY
// ab36379efc2aa8b7c3c0c968e0f8fc64-us21

//LIST ID : 47fb01c292