var pdf = require('html-pdf');
var fs = require('fs');
const nodemailer = require('nodemailer');
var async = require('async');

var serviceAccount = require("./donationapp-3a9ae-firebase-adminsdk-f4ms5-c14a38e71f.json");


var List = [];


var receipt_number = '201800000';

function songbookReceiptHtml(stripe,UserData) {
// var receipt_number = receiptNumber();

(stripe.source.name != undefined) ? stripe.source.name : UserData.name;

var giftAd = (UserData.gift) ? 'YES' : 'No';
  var keys = [];   
  List = [];
  if(stripe.metadata != null)
 keys = Object.keys(stripe.metadata); 
  
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] === "latitude" || keys[i] === "longitude") {

    }
    else {
      List.push({ name: keys[i], amount: stripe.metadata[keys[i]] })

    }

  }

  // console.log(List);

  var table_data = ``;
 
  for(var i=0;i<List.length;i++){

    var amount = List[i].amount.split('|');
    table_data = table_data + `<tr>
      <td class="subTableData"> `+ amount[0] +`</td>
    
      <td class="subTableData">£`+ parseFloat(Math.round(amount[amount.length - 1] * 100) / 100).toFixed(2)    +`</td>
    </tr>`
    }

    //  console.log(table_data);

  var html =`<html>
<head>
<style>
h3 {
	color: #523806;
}

table, tr, td {
	border-collapse: collapse;
}

tr {
	border: 1px solid #999;
	border-top: 0;
	line-height: 1.5em;
}

td {
	padding-left: 7px;
}

.halfTwo {
	display: grid;
	grid-template-columns: 1fr 1fr;
}

.style1 {
	border: 1px solid #999;
	border-top: 0;
  background: #eee;
	padding-left: 7px;
}

.halfFirst {
	background: #f7f7f7;
}




.subTable {
	border: 0;
}

.subTableData {
 text-align: left;
}

.subTableTR {
	width: 100%;
	display: grid;
	grid-template-columns: 4fr 1fr 1fr 1fr;
	border: 0;
}

</style>
</head>
<body>
  <div id='pdf' style="background: #f5f0c4; margin: auto; min-width: 55%; width: 90%; border: 1px solid black;  ">
  <div style="text-align: center; padding-top: 2%">
    <img src='data:image/png;base64,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
    1uOXiwAAAABJRU5ErkJggg==' alt="logo">
    <h3>ISKCON-London</h3>
    <h3>Radha-Krishna Temple</h3>
    <h4>THANK YOU FOR DOWNLOADING</h4>
  </div>
  <div style="text-align: center;">
    <span style="margin-left: auto">Please print this confirmation for your records.</span>
  </div>
  <br>
  <div style="padding-left : 5% ; padding-right:5%; padding-bottom:5%;">
  <table style=" width: 80%; margin: auto; border-top : 2px solid;">
   <tr><div style="background: #eee; padding-left: 7px; padding:5px; 	border: 1px solid #999;">Contribution Item Information </div></tr>
    <tr style="display: grid; grid-template-columns: 1fr;">
      <table class="subTable" style="width: 100%; border: 1px solid  #999;">
        <tr style="border-top : 2px solid">
          <td style="width: 50%; border: 0; font-weight: bold;">Item</td>
          <td style="width: 50%; border: 0; font-weight: bold;">Amount</td>
        </tr>
        ` +   table_data   +    `
       
        </table>
    </tr>
    </tr>
    <table class="subTable" style="width: 100%; border: 1px solid  #999;">
    <tr class="style1" ><div style="background: #eee; padding-left: 7px;  	border: 1px solid #999;">Contribution Information</div></tr>
    <tr class="halfTwo">
    <td class="halfFirst" style="width:50%">Receipt Number</td>
      <td>`+ UserData.receipt_number  +`</td>
    </tr>
    <tr class="halfTwo">
      <td class="halfFirst">Total Amount</td>
      <td>£`+ parseFloat(Math.round(stripe.amount) / 100).toFixed(2)  + `</td>
    </tr>
    <tr class="halfTwo">
    
      <td class="halfFirst" style="width:50%">Date</td>
      <td>` + new Date(stripe.created * 1000).toString().slice(0, 24) + `</td>
    </tr>
    <tr class="halfTwo">
      <td class="halfFirst" style="width:50%">Transaction # </td>
      <td>`+ stripe.id +`</td>
    </tr>
    </table>
    <table class="subTable" style="width: 100%; border: 1px solid  #999;">
       <tr class="style1" style="font-weight: bold;"><div style="background: #eee; padding-left: 7px; 	border: 1px solid #999;">
      UK / Home Address And Gift aid Declaration </div>
    </tr>
   
    <tr class="halfTwo">
      <td class="halfFirst" style="width:50%">Name(s)</td>
      <td>` + stripe.source.name+ `<td>
    </tr>
    <tr class="halfTwo">
      <td class="halfFirst" style="width:50%">Can we Claim Gift Aid Qualifying?</td>
      <td>`+giftAd + `<td>
    </tr>
   
    </table>
    <table class="subTable" style="width: 100%; border: 1px solid  #999;">
    <tr>
    
      <td>
      <img src='data:image/png;base64,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
      sP8Bmmnix/4Tj5QAAAAASUVORK5CYII=' style="padding-top: 10px">   
      <br>
      <span>Your servant,<br>
      Jai Nitai dasa<br>
      ISKCON-London Temple President
      </span>
      </td>
    </tr>
    <table>
  </table>
  </div>
</div>
</body>
</html>`;

var options = {
  format: 'Letter',
  paginationOffset: 1,
  "footer": {
    "height": "20mm",
    "contents": {
      // Any page number is working. 1-based index
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value

    }
  },
};


pdf.create(html,options).toFile('./songbookReceipt.pdf',function(err,stream){
  if(err){
      console.log(err);
  }
  else{
      // console.log(stream+'');
       SendMail(UserData.email);
  }
})

 
}


function SendMail(email){

  // var pdf = buffer + '';
  // console.log('pdf '+ pdf)
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

  const mailOptions = {
    from: 'info@jump360.me', // sender address
    to: email , // list of receivers
    subject: 'SongBook Payment Receipt', // Subject line
    text: "Hare Krishna!\n\n" +

      "        Thank you for downloading..\n\n Please find attached your donation receipt.\n\n" +

      "Regards,\n" +
      "ASK Krishna?",
    attachments: [{
      filename: 'receipt.pdf',
      contentType: 'application/pdf',
      path: './songbookReceipt.pdf',
    }]
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("======from the mail.js======" + err);
      console.log('Eror in Mail send');
    }
    else {
      console.log("======from the mail.js======" + info);
      console.log('sending Mail');
    }

  });

  // res.status(200).send('success');
   return;
}



 module.exports  = songbookReceiptHtml;

