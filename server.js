const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var admin = require("firebase-admin");
var serviceAccount = require('./donationapp-3a9ae-firebase-adminsdk-f4ms5-f6837d8737.json');
const stripe = require("stripe")(
    "sk_test_xtz7vzUNDhyFM1leNDKmLLAW"
  );
  app.use('*', (req, res, next) => {
    let allowedOrigins = ['http://localhost:4200', 'http://localhost:8080','https://stripepaymentdonation.herokuapp.com/'];
    let origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) > -1) {
      console.log(origin);
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'http://localhost:5000','https://stripepaymentdonation.herokuapp.com/');
    }
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Methods', "GET,POST,PUT,OPTIONS,DELETE");
    next();
  });
  var htmlToPdf = require('./html');
var html = require('./html.js');
var yearpdf = require('./yearpdf.js')
  app.use(express.static(__dirname + '/dist'));
  
  app.use(bodyParser.json());
  
// raw data parse

app.use(bodyParser.raw({ limit: '50mb', type: 'text' }))
app.use(bodyParser.raw({ type: 'application/json',limit: '50mb' }))
 
//  G:\Stripe_Payment\firebase\donationapp-3a9ae-firebase-adminsdk-f4ms5-f6837d8737.json
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://donationapp-3a9ae.firebaseio.com"
  });

  // Initialize Cloud Firestore through Firebase
var firestoreDb = admin.firestore();

// Also, parse URL encoded inputs
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/getUserData', (req, res) => {

  var email = req.body.email;

  if(!email)
  email=req.query.email;

  console.log(email);
  if (!email) {
      res.status(400).end();
    return;
  }

  firestoreDb.collection('users').where('email',"==",email).get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      console.log(doc.id, " => " );
      if(doc.data().consentEmail)
      {
          res.status(200).send('User will get email');
      }
      else{
        res.status(200).send('User not subscribe for an email');
      }
    })
   
  }).catch(function(error){
      console.log("Error getting document", error);
      res.status(402).send('User will not get email');
  });
});
// create ephemeral keys for any customer
app.post("/ephemeral_keys", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);
  var stripe_version = req.body.api_version;
  var customerId = req.body.customerId;

  if (!stripe_version)
    stripe_version = req.query.api_version;

  if (!customerId)
    customerId = req.query.customerId;


  console.log(stripe_version + "" + customerId);
  if (!stripe_version) {
    res.status(400).end();
    return;
  }

  // This function assumes that some previous middleware has determined the
  // correct customerId for the session and saved it on the request object.
  stripe.ephemeralKeys.create(
    { customer: customerId },
    { stripe_version: stripe_version }
  ).then((key) => {
    console.log(key);
    res.status(200).json(key);

  }).catch((err) => {
    // res.send(err)
    console.log(err)
    res.status(500).end();
  });
});


// create customer 
app.post("/create_customer", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);
  var email = req.body.email;

  if (!email)
    email = req.query.email;

  console.log(email);
  if (!email) {
    res.status(400).end();
    return;
  }

  stripe.customers.create({
    email: email
  }, function (err, customer) {
    // asynchronously called

    console.log(err);
    console.log(customer);
    if (err != null) {
      res.status(402).end();
    }
    else if (customer != null) {
      res.status(200).send(customer.id);
    }
  });

});


// create charge for any customer
app.post("/charge", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);

  var customerId = req.body.customer_id;
  var amount = req.body.amount;
  var shipping = req.body.shipping;
  var source = req.body.source;
  var metadata = req.body.metadata;
  var description = req.body.description;

  if (!amount)
    amount = req.query.amount;

  if(!description)
  description = req.query.description;

  if (!customerId)
    customerId = req.query.customer_id;

  if (!shipping)
    shipping = req.query.shipping;

  if (!customerId)
    source = req.query.source;

  if (!metadata) {
    metadata = req.query.metadata
  }

  if (!customerId) {
    res.status(400).end();
    return;
  }

  stripe.charges.create({
    amount: amount,
    currency: "gbp",
    description: description,
    source: source,
    shipping: shipping,
    customer: customerId,
    metadata: metadata,
  }, function (err, charge) {
    // asynchronously called

    if (err != null) {
      console.log(err.raw);
      res.status(200).send({'status':false,'message':"Payment Failed!",'code':400,'error':err.raw});
    }
    else if (charge != null) {
      console.log(charge);
      // sendUserEmail();
      res.status(200).send({'status':true,'message':"Payment success!",'code':200,'content':charge});
    }
  });
});
// save card for any customer 
app.post("/saveCards", (req, res) => {

  //console.log(req.baseUrl);

  var customerId = req.body.customer_id;
  var source = req.body.source;

  if (!customerId)
    customerId = req.query.customer_id;

  if (!source) {
    source = req.query.source;
  }

  // console.log(stripe_version + "" +customerId);
  if (!customerId) {
    res.status(400).end();
    return;
  }

  // This function assumes that some previous middleware has determined the
  // correct customerId for the session and saved it on the request object.
  stripe.customers.createSource(customerId, {
    source: source
  }, function (err, customer) {

    if (err != null) {
      console.log("create source", err);
      res.status(402).end();
    }
    else if (customer != null) {
      console.log("create source", customer);
      customerData(customer, customerId, function (confirmation) {

        if (confirmation != null) {
          console.log("delete card", confirmation);
          res.status(200).send("Card already exists");
        }
        else {
          console.log("delete card", " card added successfully");
          res.status(200).send("Card added Successfully");
        }
      });
    }
  });
});
function customerData(customer, customer_id, callback) {
  console.log('customer fingerprint', customer.fingerprint);

  var flag = false;

  stripe.customers.listCards(customer_id, function (err, cards) {
    // asynchronously called
    if (err != null) {
      console.log("list card", err);
      callback(null);
    }
    else if (cards != null) {
      console.log("list card", cards.data);
      if (cards.data.length > 0) {
        for (var i = 0; i < cards.data.length; i++) {
          if (customer.fingerprint === cards.data[i].fingerprint && customer.id != cards.data[i].id) {
            console.log(customer.id, cards.data[i].id);
            stripe.customers.deleteCard(
              customer_id,
              customer.id,
              function (err, confirmation) {
                // asynchronously called
                callback(confirmation);
              }
            );
            flag = true;
            break;
          }

        }
        if (!flag) {
          console.log(flag, " card not match with other cards")
          callback(null);
        }
      }
      else {

        console.log("list card", " no card found");
        callback(null);
      }

    }
  });
}

// google pay 
app.post("/chargeGooglePay", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);

  var amount = req.body.amount;
  var shipping = req.body.shipping;
  var source = req.body.source;
  var metadata = req.body.metadata;

  if (!amount)
    amount = req.query.amount;

  if (!shipping)
    shipping = req.query.shipping;

  if (!source)
    source = req.query.source;

  if (!metadata) {
    metadata = req.query.metadata
  }

  // console.log(stripe_version + "" +customerId);
  if (!source) {
    res.status(400).end();
    return;
  }

  // This function assumes that some previous middleware has determined the
  // correct customerId for the session and saved it on the request object.
  stripe.charges.create({
    amount: amount,
    currency: "gbp",
    description: "Example charge",
    source: source,
    shipping: shipping,
    metadata: metadata,
  }, function (err, charge) {
    // asynchronously called


    if (err != null) {
      console.log(err);
      res.status(402).end();
    }
    else if (charge != null) {
      console.log(charge.id);
      res.status(200).json(charge);
    }
  });
});

// get all charges of any customer
app.post("/getCustomerCharges", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);


  var customerId = req.body.customer_id;
  var starting_after = req.body.starting_after;


  if (!customerId)
    customerId = req.query.customer_id;

  if (!starting_after)
    starting_after = req.query.starting_after;

  // console.log(stripe_version + "" +customerId);
  if (!customerId) {
    res.status(400).end();
    return;
  }

  if (!starting_after) {
    stripe.charges.list(
      { customer: customerId },
      function (err, charges) {
        // asynchronously called
        // asynchronously called

        if (err != null) {
          console.log(err);
          res.status(402).end();
        }
        else if (charges != null) {
          console.log(charges);
          res.status(200).json(charges);
        }
      }
    );
  }
  else {
    stripe.charges.list(
      {
        customer: customerId,
        starting_after: starting_after
      },
      function (err, charges) {
        // asynchronously called
        // asynchronously called

        if (err != null) {
          console.log(err);
          res.status(402).end();
        }
        else if (charges != null) {
          console.log("starting_after", charges);
          res.status(200).json(charges);
        }
      }
    );
  }

});

function sendUserEmail(email, callback) {
  const account = {
    user: 'info@jump360.me',
    pass: 'jump@2017360'
  }
  console.log('account', account);

  const mailOptions = {
    from: account.user, // sender address
    to: email, // list of receivers
    subject: 'Donation Payment Receipt', // Subject line
    text: "Hare Krishna!\n\n" +

      "        Thanks for your contribution. Please find your donation receipt below.\n\n" +

      "Regards,\n" +
      "ASK Krishna"
    // html: '<p>Your html here</p>'// plain text body
  };
  console.log('mail', mailOptions);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      name: 'Godaddy',
      host: "smtpout.secureserver.net",
      secure: true,
      port: 465,
      auth: {
        user: 'info@jump360.in',
        pass: 'jump@2017360'
      }
    });

    console.log('tarnsporetr', transporter);


    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log("err", err)
        callback(null)
      }

      else {
        console.log("success", info);
        callback(info)
      }
    });
  });
}
// send user email receipt
app.post("/sendEmailReceipt", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);

  var email =req.body.email;
 
  if(!email)
  email= req.query.email;

 // console.log(stripe_version + "" +customerId);
  if (!email) {
      res.status(400).end();
    return;
  }

  // check if user subscribe for email or not if yes then send an email receipt 

  firestoreDb.collection('users').where('email',"==",email).get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      console.log(doc.id, " => ", );
      if(doc.data().consentEmail)
      {
         sendUserEmail(email,function(result){
           if(result){
              res.status(200).send('Donation Receipt sent.')
           }
           
           else{
            res.status(200).send('Error sending email.')
           }
         });
      }
      else if(typeof doc.data().consentEmail == 'undefined')
           {
            sendUserEmail(email,function(result){
              if(result){
                 res.status(200).send('Donation Receipt sent.')
              }
              
              else{
               res.status(200).send('Error sending email.')
              }
            });
           }
      else{
        res.status(200).send('Subscribe email from Consent Setting to get payment receipt.');
      }
    })
   
  }).catch(function(error){
      console.log("Error getting document", error);
      res.status(402).send('User will not get email');
  });

});


 //send user's parent a concent about using app

 app.post("/sendUserConcentEmail", (req, res) => {
  console.log(req.body);
  console.log(req.query);
   

  var email =req.body.email;
  var userName = req.body.userName;
 
  if(!email)
  email= req.query.email;

  if(!userName)
  userName= req.query.userName;

 // console.log(stripe_version + "" +customerId);
  if (!email) {
      res.status(400).end();
    return;
  }

  const account= {
    user:'info@jump360.me',
     pass:'jump@2017360'
  }

  console.log('account',account);

  const mailOptions = {
    from: account.user, // sender address
    to: email, // list of receivers
    subject: 'Mailer',
    text: "Hare Krishna!\n\n" +

    "Your Daughter/Son "+userName+" has installed Ask Krishna App and below are the user consents\n\n"+
    
    "1) Allow sending the push notification, messages and emails relating to the purchases, information, and facilities offered by the Ask Krishna app\n\n"+
    
    "2) Allow receiving emails and marketing information relating directly to ISKCON London and from its subsidiaries.\n\n"+
    
    "3) Allow processing data collected for the analysis and statistic calculations. We use the name, DOB, location and amount of donation for this purpose.\n\n"+
    
    "4) Allow sharing personal details and statistics held on the files for the devotee (as the user) to be shared with ISKCON London.\n\n"+
    
    "Regards,\n"+
    "ASK Krishna"
   // html: '<p>Your html here</p>'// plain text body
  };
  console.log('mail',mailOptions);
  // Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    name: 'Godaddy',
    host: "smtpout.secureserver.net",
    secure: true,
    port: 465,
    auth: {
    user: 'info@jump360.me',
    pass: 'jump@2017360'
    }
    });

 console.log('tarnsporetr',transporter);


 transporter.sendMail(mailOptions, function (err, info) {
    if(err)
    {
      console.log("err",err)
      res.status(200).send("Error Sending email.");  
    }

    else
    {
      console.log("success",info);
      
      res.status(200).send("Sent concent email to your parent.");
    }   
 });
});
});
  // get data from stripe with charge id

  app.get('/stripe', function (req, res) {

    console.log('id====== ' + req.param('data'));
    
      stripe.charges.retrieve(req.param('data'), function (err, charge) {
    
        console.log("========stripe cal=======", charge);
        // asynchronously called
    
        res.send(charge);
    
      });
    
    
    });



app.get('/sentMail', function (req, res) {

  var chargeId =req.body.chargeId;
  var userId = req.body.userId;
 
  if(!chargeId)
  chargeId= req.query.chargeId;

  if(!userId)
  userId= req.query.userId;
  console.log("chargeid" + chargeId + " " + "userId" + userId);

  var url = 'https://stripepaymentdonation.herokuapp.com/#/mail/' + chargeId + '+' + userId;
 
       res.status(200);
       res.render('https://stripepaymentdonation.herokuapp.com/#/mail/');
       res.redirect(url);
       
         
        
  
    });
  
    app.post('/sendMailReceipt', function (req, res) {

      var charge_id = req.body.id;
      var user_id = req.body.user;
      
      if(!charge_id)
         charge_id = req.query.id;
      if(!user_id)
         user_id = req.query.user;
      
         if(!charge_id)
         charge_id = req.param('id');
         if(!user_id)
         user_id = req.param('user');
      
      
         console.log(charge_id);
         console.log(user_id);
      
        stripe.charges.retrieve(charge_id, function (err, charge) {
      
          var sfDocRef = firestoreDb.collection("receipt_number").doc("receipt_id");
          firestoreDb.runTransaction((transaction) => {
             return transaction.get(sfDocRef).then((sfDoc) => {
             if (!sfDoc.exists) {
               throw "Document does not exist!";
             }
       
             receipt_number = sfDoc.data().last;
             var dt = new Date();
             var year_db = receipt_number.toString().substring(0, 4);
             var cur_year = dt.getFullYear().toString();
             if (year_db === cur_year) {
       
               var last = sfDoc.data().last + 1;
               transaction.update(sfDocRef, { last: last });
       
             }
             else {
               var new_year = parseInt(year_db);
               new_year++;
               year_db = new_year + '0000000';
               new_year = parseInt(year_db);
               receipt_number = new_year;
       
               transaction.update(sfDocRef, { last: ++new_year });
             }
       
           
           });
         }).then((last) => {
       
          firestoreDb.collection('users').doc(user_id).get().then((doc)=>{
            console.log(doc.data());
           
           var data ={
            email : doc.data().email,
            gift : doc.data().giftAid,
            name : doc.data().name,
            receipt_number : receipt_number
            }
      
             html(charge,data);
      
         })
         
           
         }).catch((err) => {
       
           console.error(err);
         });
      
          res.send('Donation receipt sent.');
      
        });
      
      
      });
      
    
  // api for send receipt for year donation

app.post('/sendYearPdf', function (req, res) {


  var date = req.body.date + '';
  var name =  req.body.name;
  var email = req.body.email;
  var customer_id = req.body.customer_id;

  if(!date)
    charge_id = req.query.date;
 if(!name)
    user_id = req.query.name;
 if(!email)
    charge_id = req.query.email;
 if(!customer_id)
    user_id = req.query.customer_id;
 
 

  var start = new Date(date.split('to')[0]);
  var end = new Date(date.split('to')[1]);

  console.log(start + ' to ' + end);

 var arr = [];

 function paginateCharges(last_id){
   var req_params = { limit : 100 ,  customer : customer_id}
   if(last_id!== undefined){
   req_params.starting_after = last_id
   }
   stripe.charges.list(
   req_params,
   function(err, charges) {
   
   for (i = 0; i < charges.data.length; i++){
   var trn_date = new Date(charges.data[i].created * 1000);
   if(trn_date >= start && trn_date <= end && charges.data[i].description == "Donation")
       arr.push(charges.data[i]);

   }
   // Check for more
   if (charges.has_more) {
   paginateCharges(charges["data"][charges["data"].length - 1].id);
   }
   else{
   var x = {};
   x.data = arr;
   // x.amount = amount;
   // x.td = time_data;
   // console.log(arr);

   yearpdf(arr,email,name);
   console.log(arr.length);
   res.send(arr);
   
   }
   }
   )}
   var last_id;
   paginateCharges(last_id);
   

 });

//Delete Card 

app.post("/deleteCard",function(req , res){

  //cust and card id : cus_CefgaMlFMgYIF8 , card_1Cp93VBOPVtYY8u1DGjE4cHk

  var customer_id = req.body.customer_id;
  var source_id = req.body.source_id;
  if(!customer_id)
  customer_id = req.query.customer_id;
  if(!source_id)
    source_id = req.query.source_id;

  if (!customer_id) {
    res.status(400).end();
    return;
  }
  if (!source_id) {
    res.status(400).end();
    return;
  }
  console.log(customer_id,source_id);

  stripe.customers.deleteCard(customer_id,source_id,function(err,confirmation)
{
  if(err)
  {
    res.status(500).send({
      status:false,
      message:"Error in Deleting Card.Please try again",
      code:500
    })
  }

  else if(confirmation)
  {
    if(confirmation.deleted){
      res.status(200).send({
        status:true,
        message:"Card Deleted Successfully.",
        code:200
      })
    }
    else{
      res.status(200).send({
        status:false,
        message:"Error in Deleting Card.Please try again",
        code:200
      })
    }
  }
 
  // console.log(confirmation);
 // res.send(confirmation);
})
});


// start server code

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 8080!'))