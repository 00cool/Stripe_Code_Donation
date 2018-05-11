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



let jsPDF = require('jspdf');
const pdf = new jsPDF();
@Component({
  selector: 'app-firebase-example',
  templateUrl: './firebase-example.component.html',
  styleUrls: ['./firebase-example.component.css']
})
export class FirebaseExampleComponent implements OnInit {


  List: any[];
  totalAmount: string;
  date: string;
  trasactionId: string;
  name1: string;
  name2: string;
  add1: string; add2: string; add3: string;
  country: string;
  email: string;
  title : string;
  firstname: string;
  surname: string;
  initialName: string;
  city: string;
  postal: string;
  county: string;
  mobile: string;
  subscription: string;
  mailDelivery: string;
  giftaid: string;
  comments: string;

  data: any;
  constructor(public db: AngularFirestore, private api: ApiService, private _Activatedroute: ActivatedRoute, private http: Http) {
var id = this._Activatedroute.snapshot.params['id'];
console.log('id  === ' + id);
    this.api.getStripeData(id).subscribe((res) => {
      console.log("from the componnet.ts STRIPE method....", res);
       this.data = res;


      this.totalAmount = this.data.amount;
      this.date = new Date(this.data.created).toString().slice(0,24);
      this.trasactionId = this.data.balance_transaction;
      this.name1 = this.data.source.name;
      this.name2 = this.data.source.name;
      this.add1 = '7 Acorn Close';
      this.add2 = 'Middlesex, LON HA72QS';
      this.country = 'United Kingdom';
      this.email = this.data.receipt_email
       this.title = 'Mr';
      this.firstname = this.data.source.name;
      this.surname = 'Jani';
      this.city = 'Middlesex';
      this.postal = 'HA72QS';
      this.county = 'LON';
      this.mobile = '07808165186';
      this.subscription = '[x]';
      this.mailDelivery = '[x]';
      this.giftaid = 'No';
      this.comments = '';


   setTimeout(()=>{

    const elementToPrint = document.getElementById('pdf');

    pdf.addHTML(elementToPrint, () => {
      var pdfData = pdf.output('datauristring');
      
      this.api.testingMethod(pdfData).subscribe((res) => {
        console.log("from the componnet.ts method....");
      });
    });

   },1000)
     
    })

  }

 
  ngOnInit() {
    this.List = [];
    
    
    this.List.push({
      name: 'Other',
      qty: '£ 5',
      each: '£ 1.0',
      total: '£ 5.0'
    });

   
  }



}







