declare var require: any
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { ApiService } from '../api.service'
import { AngularFireDatabase } from 'angularfire2/database'
import { AngularFireStorage } from 'angularfire2/storage';
import { ActivatedRoute, Router } from '@angular/router';



export interface ReceiptNumber { last: number; }
export interface User {consentEmail : boolean; email : string; giftaid : boolean; name: string;}

let jsPDF = require('jspdf');
const pdf = new jsPDF("p", "mm", "a4");;
@Component({
  selector: 'app-firebase-example',
  templateUrl: './firebase-example.component.html',
  styleUrls: ['./firebase-example.component.css']
})
export class FirebaseExampleComponent implements OnInit {


  ReceiptCollection = this.db.collection<ReceiptNumber>('receipt_number');
  Receipt = this.db.collection<ReceiptNumber>('receipt_number').valueChanges();

  userCollection = this.db.collection<User>('users');
  user = this.db.collection<User>('users').valueChanges();
  name :string;
  gift : boolean;
  List: any[] = [];
  totalAmount: string;
  date: string;
  trasactionId: string;
  email: string;
  title: string;
  firstname: string;
  giftaid: string;
  comments: string;
  receipt_number: number;
  data: any;
  param_data: string;
  spilt_data : any;


  constructor(public db: AngularFirestore, private api: ApiService, private _Activatedroute: ActivatedRoute, private http: Http) {

    this.receiptNumber();

    this.param_data = this._Activatedroute.snapshot.params['id'];
    this.spilt_data = this.param_data.split('+');



    console.log('charge id  === ' + this.spilt_data[0] + 'user id ' + this.spilt_data[1]);
    this.getUserData(this.spilt_data[1]).then(()=>{
       this.pdfAndHtml();
    })
    
  }

  ngOnInit() {

  }

  receiptNumber() {
    var sfDocRef = this.db.collection("receipt_number").doc("receipt_id").ref;

    this.db.firestore.runTransaction((transaction) => {
      return transaction.get(sfDocRef).then((sfDoc) => {
        if (!sfDoc.exists) {
          throw "Document does not exist!";
        }

        this.receipt_number = sfDoc.data().last;
        var dt = new Date();
        var year_db = this.receipt_number.toString().substring(0, 4);
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
          this.receipt_number = new_year;

          transaction.update(sfDocRef, { last: ++new_year });
        }

      });
    }).then((last) => {

    }).catch((err) => {

      console.error(err);
    });

  }


  getUserData(user_id : string){
    this.userCollection.doc(user_id).ref.get().then((doc)=>{
       console.log(doc.data());

       this.email = doc.data().email;
       this.gift= doc.data().giftAid;
       this.name = doc.data().name;
    })

    return Promise.resolve();
  }


  pdfAndHtml(){
    this.api.getStripeData(this.spilt_data[0]).subscribe((res) => {
      console.log("from the componnet.ts STRIPE method....", res);
      this.data = res;

      console.log("meta data " + this.data.metadata);

      var keys = Object.keys(this.data.metadata);
      console.log(keys);

      for (var i = 0; i < keys.length; i++) {
        if (keys[i] === "latitude" || keys[i] === "longitude") {

        }
        else {
          this.List.push({ name: keys[i], amount: this.data.metadata[keys[i]] })

        }

      }

      console.log(this.List);

      this.totalAmount = (this.data.amount / 100) + '';
      this.date = new Date(this.data.created * 1000).toString().slice(0, 24);
      this.trasactionId = this.data.id;
      console.log(this.email);
      this.title = 'Mr';
      this.firstname =  (this.data.source.name != undefined) ? this.data.source.name : this.name;    //this.data.source.name;
       this.giftaid = (this.gift) ? 'Yes' : 'No';
      this.comments = '';


      setTimeout(() => {

        const elementToPrint = document.getElementById('pdf');
        pdf.setFillColor(245, 240, 196, 1);
        pdf.addHTML(elementToPrint, () => {
          var pdfData = pdf.output('datauristring');

          this.api.testingMethod(pdfData , this.email).subscribe((res) => {
             console.log(res.toString());
          });

        });

      }, 1000)

    })

  }


}







