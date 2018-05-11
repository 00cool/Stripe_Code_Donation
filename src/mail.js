const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const stripe = require("stripe")(
  "sk_test_xtz7vzUNDhyFM1leNDKmLLAW"
);

app.use(bodyParser.raw({ limit: '50mb', type: 'text' }))
app.use(bodyParser.raw({ type: 'application/json' }))

app.use('*', (req, res, next) => {
  let allowedOrigins = ['http://localhost:4200', 'http://localhost:5000'];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    console.log(origin);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200', 'http://localhost:5000');
  }
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', "GET,POST,PUT,OPTIONS,DELETE");
  next();
});



app.get('/stripe', function (req, res) {

console.log('id====== ' + req.param('data'));

  stripe.charges.retrieve(req.param('data'), function (err, charge) {

    console.log("========stripe cal=======", charge);
    // asynchronously called

    res.send(charge);

  });


});


app.get('/sendMail', function (req, res) {


  console.log('hello');
  // res.redirect('http://localhost:4200/mail/' + 'ch_1CPO7uBOPVtYY8u14pSvR0kV');

  // window.location = 'http://localhost:4200/mail/' + 'ch_1CPO7uBOPVtYY8u14pSvR0kV'
  res.redirect('http://localhost:4200/mail/' + 'ch_1CPO7uBOPVtYY8u14pSvR0kV')
  // res.send('sucess');
  // res.end();
});


app.post('/sendMailReceipt', function (req, res) {
  var pdfData = req.body + '';

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jump3602017@gmail.com',
      pass: 'Jump@3602017'
    }
  });

  const mailOptions = {
    from: 'jump3602017@gmail.com', // sender address
    to: 'harshadakhani8882@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    text: 'hello',
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

app.listen(process.env.PORT || 5000, () =>
  console.log('server on port 5000')
)