var admin = require("firebase-admin");
var http = require('http');

var serviceAccount = require("./prod-donation.json");

var firstAccount = require("./donationapp-3a9ae-firebase-adminsdk-f4ms5-c14a38e71f.json");

var secondaryAppConfig = {
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://jump360-1a5ac.firebaseio.com"
};

var firstAppConfig = {
  credential: admin.credential.cert(firstAccount),
  // databaseURL: "https://prod-donation.firebaseio.com"
};


var secondary = admin.initializeApp(secondaryAppConfig, "secondary");
var first  =  admin.initializeApp(firstAppConfig,"first");

// Retrieve the database.
var db = secondary.firestore();
var db1 = first.firestore();

// db.getCollections().then((col)=>
// {
//     col.forEach((key)=>{
//        console.log(key.id);
//     }) 
// })


db.collection('country').get().then((data)=>{

  data.forEach((doc)=>{

  });

})


  //  console.log(db.getCollections());



  // db1.collection('sub_sponsorship').get().then((querysnapshot)=>{
    
  //   querysnapshot.forEach((doc) =>{
  
  //     // console.log( doc.data());

  //   //  console.log(db.collection('sub_sponsorship').doc(doc.id).set(doc.data()));

  //   })

  //   return querysnapshot.docs;
  // }).then(()=>{

  //   console.log('end');
  // }
// );


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");
console.log('Server running at http://127.0.0.1:1337/');