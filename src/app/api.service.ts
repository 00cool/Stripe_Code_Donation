import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {


    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    constructor(private http: Http) { }

    result: any;

    testingMethod(data: any, email : string) {
       
        let params: URLSearchParams = new URLSearchParams();
        params.set("email", email);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        console.log("=======================service method called==================");
        return this.http.post("https://stripepaymentdonation.herokuapp.com/sendMailReceipt", data,requestOptions).map(results => this.result = results);
    }

    getStripeData(id : any){
      
        let params: URLSearchParams = new URLSearchParams();
        params.set("data", id);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        console.log("=======================service stripe method called==================");
      return this.http.get("https://stripepaymentdonation.herokuapp.com/stripe",requestOptions).map(function(result){
          console.log('data',result.json())
          return (result.json());
      });
    }
   
}