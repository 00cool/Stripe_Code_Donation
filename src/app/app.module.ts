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
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// // import * as fs from 'file-system';
import {ApiService} from './api.service'



export const router: Routes =[
  {path:'mail/:id', component: FirebaseExampleComponent},
 
  
]

@NgModule({
  declarations: [
    AppComponent,
    FirebaseExampleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.source,'source'),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // HttpClient,
    // HttpClientModule,
    AngularFireStorageModule,
    RouterModule.forRoot(router),
    
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
