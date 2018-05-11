import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Data } from './data';

@Injectable()
export class ApiService {


    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    constructor(private http: Http) { }

    result: any;

    testingMethod(data: any) {
      
        let params: URLSearchParams = new URLSearchParams();
        params.set("data", data);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        console.log("=======================service method called==================");
        return this.http.post("http://localhost:5000/sendMailReceipt", data).map(results => this.result = results);
    }

    getStripeData(id : any){
      
        let params: URLSearchParams = new URLSearchParams();
        params.set("data", id);
        let requestOptions = new RequestOptions();
        requestOptions.search = params;

        console.log("=======================service stripe method called==================");
      return this.http.get("http://localhost:5000/stripe",requestOptions).map(function(result){
          console.log('data',result.json())
          return (result.json());
      });
    }
   
}