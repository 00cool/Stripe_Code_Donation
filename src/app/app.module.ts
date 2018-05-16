import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AppComponent } from './app.component';
import { FirebaseExampleComponent } from './firebase-example/firebase-example.component';
import {RouterModule, Routes} from '@angular/router'; 

import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

// import { HttpClientModule, HttpClient } from '@angular/common/http';
// // import * as fs from 'file-system';
import {ApiService} from './api.service'
var config =
{
  apiKey: "AIzaSyBX3nrDzY7OGGfdRiLGGqhZ2Hh58S0WKf8",
  authDomain: "donationapp-3a9ae.firebaseapp.com",
  databaseURL: "https://donationapp-3a9ae.firebaseio.com",
  projectId: "donationapp-3a9ae",
  storageBucket: "donationapp-3a9ae.appspot.com",
  messagingSenderId: "423650619788"
}

export const router: Routes =[
  {path:'mail/:id', component: FirebaseExampleComponent},
  {path:'',component : AppComponent}
 
  
]

@NgModule({
  declarations: [
    AppComponent,
    FirebaseExampleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    
    AngularFireStorageModule,
    RouterModule.forRoot(router),
    
  ],
  providers: [ApiService , Location, {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
