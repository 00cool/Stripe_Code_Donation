const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var admin = require("firebase-admin");
const stripe = require("stripe")(
    "sk_test_xtz7vzUNDhyFM1leNDKmLLAW"
  );
  app.use(express.static(__dirname + '/dist'));
  app.use('*', (req, res, next) => {
    let allowedOrigins = ['http://localhost:4200', 'http://localhost:5000','https://stripepaymentdonation.herokuapp.com/'];
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
  app.use(bodyParser.json());
  
// raw data parse

app.use(bodyParser.raw({ limit: '50mb', type: 'text' }))
app.use(bodyParser.raw({ type: 'application/json',limit: '50mb' }))
  var serviceAccount = require("./donationapp-3a9ae-firebase-adminsdk-f4ms5-f6837d8737.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://donationapp-3a9ae.firebaseio.com"
  });

  // Initialize Cloud Firestore through Firebase
var firestoreDb = admin.firestore();

  // parse JSON inputs


// request handling

app.use('*', (req, res, next) => {
  let allowedOrigins = ['http://localhost:4200', 'http://localhost:5000','https://stripepaymentdonation.herokuapp.com/'];
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

// Also, parse URL encoded inputs
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/getUserData', (req, res) => {
  firestoreDb.collection('users').where('email',"==",'mitsdesai73@gmail.com').get().then(function(querySnapshot){
    querySnapshot.forEach(function(doc){
      console.log(doc.id, " => ", );
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
    var customerId =req.body.customerId;

    if(!stripe_version)
    stripe_version=req.query.api_version;

    if(!customerId)
    customerId=req.query.customerId;


    console.log(stripe_version + "" +customerId);
    if (!stripe_version) {
        res.status(400).end();
      return;
    }
    
    // This function assumes that some previous middleware has determined the
    // correct customerId for the session and saved it on the request object.
    stripe.ephemeralKeys.create(
      {customer: customerId},
      {stripe_version: stripe_version}
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

      if(!email)
      email=req.query.email;
  
      console.log(email);
      if (!email) {
          res.status(400).end();
        return;
      }
      
      stripe.customers.create({
        email:email
      }, function(err, customer) {
        // asynchronously called

        console.log(err);
        console.log(customer);
        if(err!=null){
          res.status(402).end();
        }
        else if(customer!=null){
          res.status(200).send(customer.id);
        }
      });

      });

  // create charge for any customer

app.post("/charge", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);

    var customerId =req.body.customer_id;
    var amount =req.body.amount;
    var shipping =req.body.shipping;
    var source = req.body.source;
    var metadata =req.body.metadata;

    if(!amount)
    amount=req.query.amount;

    if(!customerId)
    customerId=req.query.customer_id;

    if(!shipping)
    shipping=req.query.shipping;

    if(!customerId)
    source=req.query.source;

    if(!metadata){
      metadata=req.query.metadata
    }

    if (!customerId) {
        res.status(400).end();
      return;
    }
    
    stripe.charges.create({
      amount: amount,
      currency: "gbp",
      description: "Example charge",
      source: source,
      shipping:shipping,
      customer:customerId,
      metadata:metadata,
    }, function(err, charge) {
      // asynchronously called

      if(err!=null){
        console.log(err);
        res.status(402).json(err);
      }
      else if(charge!=null){
        console.log(charge);
        // call email sent
        res.redirect('https://stripepaymentdonation.herokuapp.com/#/mail/' +'ch_1CPO7uBOPVtYY8u14pSvR0kV');

        res.status(200).json(charge);
       
        res.end();
      
        return;
        
      }
    });
  });

  // save card for any customer 

  app.post("/saveCards", (req, res) => {
  
    //console.log(req.baseUrl);
  
      var customerId =req.body.customer_id;
      var source = req.body.source;

      if(!customerId)
      customerId=req.query.customer_id;
     
      if(!source){
        source=req.query.source;
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
      },function(err,customer){
       
        if(err!=null){
          console.log("create source",err);
          res.status(402).end();
        }
        else if(customer!=null){
          console.log("create source",customer);
          customerData(customer,customerId,function(confirmation){
          
              if(confirmation!=null){
              console.log("delete card",confirmation);
              res.status(200).send("Card already exists");
            }
            else{
              console.log("delete card"," card added successfully");
              res.status(200).send("Card added Successfully");
            }
          });
        }
      });
    });
    function customerData(customer,customer_id,callback){
      console.log('customer fingerprint',customer.fingerprint);

      var flag=false;

      stripe.customers.listCards(customer_id, function(err, cards) {
        // asynchronously called
        if(err!=null)
        {
          console.log("list card",err);
          callback(null);
        }
        else if(cards!=null)
        {
          console.log("list card",cards.data);
          if(cards.data.length>0)
          {
            for( var i=0; i<cards.data.length;i++){
              if(customer.fingerprint===cards.data[i].fingerprint && customer.id !=cards.data[i].id)
              {
                console.log(customer.id,cards.data[i].id);
                stripe.customers.deleteCard(
                  customer_id,
                  customer.id,
                  function(err, confirmation) {
                    // asynchronously called
                  callback(confirmation);
                  }
                );
                flag=true; 
                break;
              }
               
            }
            if(!flag)
            {
              console.log(flag," card not match with other cards")
              callback(null);
            }
          }
          else{

            console.log("list card"," no card found");
            callback(null);
          }
   
        }
      });
    }

    // google pay 
app.post("/chargeGooglePay", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);
   
    var amount =req.body.amount;
    var shipping =req.body.shipping;
    var source = req.body.source;
    var metadata =req.body.metadata;

    if(!amount)
    amount=req.query.amount;

    if(!shipping)
    shipping=req.query.shipping;

    if(!source)
    source=req.query.source;

    if(!metadata){
      metadata=req.query.metadata
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
      shipping:shipping,
      metadata:metadata,
    }, function(err, charge) {
      // asynchronously called
      
      
      if(err!=null){
        console.log(err);
        res.status(402).end();
      }
      else if(charge!=null){
        console.log(charge.id);
        res.status(200).json(charge);
      }
    });
  });

      // get all charges of any customer

app.post("/getCustomerCharges", (req, res) => {
  console.log(req.body);
  //console.log(req.baseUrl);
   

  var customerId =req.body.customer_id;
  var starting_after = req.body.starting_after;

  
  if(!customerId)
  customerId=req.query.customer_id;

  if(!starting_after)
  starting_after= req.query.starting_after;

 // console.log(stripe_version + "" +customerId);
  if (!customerId) {
      res.status(400).end();
    return;
  }

  if(!starting_after)
  {
    stripe.charges.list(
      { customer:customerId},
      function(err, charges) {
        // asynchronously called
          // asynchronously called
          
          if(err!=null){
            console.log(err);
            res.status(402).end();
          }
          else if(charges!=null){
            console.log(charges);
            res.status(200).json(charges);
          }
      }
    );
  }
  else{
    stripe.charges.list(
      { customer:customerId,
        starting_after:starting_after},
      function(err, charges) {
        // asynchronously called
          // asynchronously called
          
          if(err!=null){
            console.log(err);
            res.status(402).end();
          }
          else if(charges!=null){
            console.log("starting_after",charges);
            res.status(200).json(charges);
          }
      }
    );
  }
   
  });

  function sendUserEmail(email,callback)
  {
    const account= {
      user:'info@jump360.me',
       pass:'jump@2017360'
    }
    console.log('account',account);

    const mailOptions = {
      from: account.user, // sender address
      to: email, // list of receivers
      subject: 'Donation Payment Receipt', // Subject line
      text: "Hare Krishna!\n\n" +

      "        Thanks for your contribution. Please find your donation receipt below.\n\n"+

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
        callback(null) 
      }

      else
      {
        console.log("success",info);
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

  app.post("/songPl", (req, res) => {
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


// sent mail with receipt pdf
    
app.post('/sendMailReceipt', function (req, res) {
  var pdfData = req.body +  '';
   var email = req.param('email');
  console.log('id====== ' + email);

  // console.log('pdfData ' +pdfData);
  // console.log('email ' + email);
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

  const mailOptions = {
    from: 'jump3602017@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Donation Payment Receipt', // Subject line
    text: "Hare Krishna!\n\n" +

      "        Thanks for your contribution. Please find your donation receipt below.\n\n" +

      "Regards,\n" +
      "ASK Krishna",
    attachments: [{
      filename: 'receipt.pdf',
      contentType: 'application/pdf',
      path: pdfData
    }]
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("======from the mail.js======" + err);
      res.status(200).send('Mail send');
    }

    else {
      console.log("======from the mail.js======" + info);
      res.status(200).send('Error in sending Mail');
    }

  });

  res.status(200).send('success');

})

// start server code

app.listen(process.env.PORT || 8080, () => console.log('Example app listening on port 5000!'))