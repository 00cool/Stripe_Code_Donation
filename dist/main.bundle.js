webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApiService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.testingMethod = function (data, email) {
        var _this = this;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        params.set("email", email);
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
        requestOptions.search = params;
        console.log("=======================service method called==================");
        return this.http.post("https://stripepaymentdonation.herokuapp.com/sendMailReceipt", data, requestOptions).map(function (results) { return _this.result = results; });
    };
    ApiService.prototype.getStripeData = function (id) {
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* URLSearchParams */]();
        params.set("data", id);
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]();
        requestOptions.search = params;
        console.log("=======================service stripe method called==================");
        return this.http.get("https://stripepaymentdonation.herokuapp.com/stripe", requestOptions).map(function (result) {
            console.log('data', result.json());
            return (result.json());
        });
    };
    ApiService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n\r\n\r\n<!-- <form method=\"post\" action=\"https://stripepaymentdonation.herokuapp.com/charge\">\r\n<input id='customer_id' name='customer_id' value='cus_CgwSEeluTuqoyY'>\r\n<input id='amount' name='amount' value='50'>\r\n<input id='source' name='source' value='card_1CHYazBOPVtYY8u1wCku7h6m'>\r\n<button type=\"submit\" >submit</button>\r\n</form> -->\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export router */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__("./node_modules/angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__ = __webpack_require__("./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_storage__ = __webpack_require__("./node_modules/angularfire2/storage/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__firebase_example_firebase_example_component__ = __webpack_require__("./src/app/firebase-example/firebase-example.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__api_service__ = __webpack_require__("./src/app/api.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// import { HttpClientModule, HttpClient } from '@angular/common/http';
// // import * as fs from 'file-system';

var config = {
    apiKey: "AIzaSyBX3nrDzY7OGGfdRiLGGqhZ2Hh58S0WKf8",
    authDomain: "donationapp-3a9ae.firebaseapp.com",
    databaseURL: "https://donationapp-3a9ae.firebaseio.com",
    projectId: "donationapp-3a9ae",
    storageBucket: "donationapp-3a9ae.appspot.com",
    messagingSenderId: "423650619788"
};
var router = [
    { path: 'mail/:id', component: __WEBPACK_IMPORTED_MODULE_7__firebase_example_firebase_example_component__["a" /* FirebaseExampleComponent */] },
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_7__firebase_example_firebase_example_component__["a" /* FirebaseExampleComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_4_angularfire2_firestore__["b" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_5_angularfire2_storage__["a" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_router__["b" /* RouterModule */].forRoot(router),
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_10__api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_9__angular_common__["f" /* Location */], { provide: __WEBPACK_IMPORTED_MODULE_9__angular_common__["g" /* LocationStrategy */], useClass: __WEBPACK_IMPORTED_MODULE_9__angular_common__["d" /* HashLocationStrategy */] }
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/firebase-example/firebase-example.component.css":
/***/ (function(module, exports) {

module.exports = "h3 {\r\n\tcolor: #523806;\r\n}\r\n\r\ntable, tr, td {\r\n\tborder-collapse: collapse;\r\n}\r\n\r\ntr {\r\n\tborder: 1px solid #999;\r\n\tborder-top: 0;\r\n\tline-height: 1.5em;\r\n}\r\n\r\ntd {\r\n\tpadding-left: 7px;\r\n}\r\n\r\n.halfTwo {\r\n\tdisplay: -ms-grid;\r\n\tdisplay: grid;\r\n\t-ms-grid-columns: 1fr 1fr;\r\n\t    grid-template-columns: 1fr 1fr;\r\n}\r\n\r\n.style1 {\r\n\tborder: 1px solid #999;\r\n\tborder-top: 0;\r\n\tbackground: #eee;\r\n\tpadding-left: 7px;\r\n}\r\n\r\n.halfFirst {\r\n\tbackground: #f7f7f7;\r\n}\r\n\r\n.subTable {\r\n\tborder: 0;\r\n}\r\n\r\n.subTableData {\r\n text-align: left;\r\n}\r\n\r\n.subTableTR {\r\n\twidth: 100%;\r\n\tdisplay: -ms-grid;\r\n\tdisplay: grid;\r\n\t-ms-grid-columns: 4fr 1fr 1fr 1fr;\r\n\t    grid-template-columns: 4fr 1fr 1fr 1fr;\r\n\tborder: 0;\r\n}"

/***/ }),

/***/ "./src/app/firebase-example/firebase-example.component.html":
/***/ (function(module, exports) {

module.exports = "\n<head>\n  <script src=\"https://unpkg.com/jspdf@latest/dist/jspdf.min.js\"></script>\n  <script>\n  </script>\n  \n</head>\n<div>\n\n</div>\n<div id='pdf' style=\"background: #f5f0c4; margin: auto; min-width: 55%; width: 55%; border: 1px solid black; \">\n  <div style=\"text-align: center; padding-top: 5%\">\n    <img src=\"../../assets/img/krishana.png\" alt=\"logo\">\n    <h3>ISKCON-London</h3>\n    <h3>Radha-Krishna Temple</h3>\n    <h4>Thank you for your donation</h4>\n  </div>\n  <div style=\"text-align: center;\">\n    <span style=\"margin-left: auto\">Please print this confirmation for your records.</span>\n  </div>\n  <br>\n  <table style=\" width: 80%; margin: auto; \">\n    <tr class=\"style1\"  style=\"border-top: 1px solid  #999\">Contribution Item Information</tr>\n    <tr style=\"display: grid; grid-template-columns: 1fr;\">\n      <table class=\"subTable\" style=\"width: 100%;\">\n        <tr style=\"border: 0\">\n          <td style=\"width: 50%; border: 0; font-weight: bold;\">Item</td>\n          <td style=\"width: 50%; border: 0; font-weight: bold;\">Amount</td>\n        </tr>\n        <tr *ngFor=\"let item of List\">\n          <td class=\"subTableData\">{{item.name}}</td>\n        \n          <td class=\"subTableData\">£{{item.amount}}</td>\n        </tr>\n      </table>\n    </tr>\n    <tr class=\"style1\">Contribution Information</tr>\n    <tr class=\"halfTwo\">\n      <td class=\"halfFirst\">Receipt Number</td>\n      <td> {{receipt_number}}</td>\n    </tr>\n    <tr class=\"halfTwo\">\n      <td class=\"halfFirst\">Total Amount</td>\n      <td>£{{totalAmount}}</td>\n    </tr>\n    <tr class=\"halfTwo\">\n      <td class=\"halfFirst\">Date</td>\n      <td>{{date}}</td>\n    </tr>\n    <tr class=\"halfTwo\">\n      <td class=\"halfFirst\">Transaction # </td>\n      <td>{{trasactionId}}</td>\n    </tr>\n       <tr class=\"style1\" style=\"font-weight: bold;\">\n      UK / Home Address And Gift aid Declaration\n    </tr>\n   \n    <tr class=\"halfTwo\">\n      <td class=\"halfFirst\">Name(s)</td>\n      <td>{{firstname}}</td>\n    </tr>\n       <tr class=\"halfTwo\">\n      <td class=\"halfFirst\">Can we Claim Gift Aid Qualifying?</td>\n      <td>{{giftaid}}</td>\n    </tr>\n    <tr class=\"style1\" style=\"font-weight: bold;\">\n      Additional Comments\n    </tr>\n    <tr class=\"halfTwo\">\n      <td class=\"halfFirst\" style=\"width: 50%\">Additional Comments</td>\n      <td>{{comments}}</td>\n    </tr>\n    <tr>\n      <td>\n      <img src=\"../../assets/img/president.png\" style=\"padding-top: 10px\">   \n      <br>\n      <span>Your servant,<br>\n      Jai Nitai dasa<br>\n      ISKCON-London Temple President\n      </span>\n      </td>\n    </tr>\n  </table>\n  <br>\n  <br>\n</div>\n\n"

/***/ }),

/***/ "./src/app/firebase-example/firebase-example.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseExampleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__ = __webpack_require__("./node_modules/angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_service__ = __webpack_require__("./src/app/api.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var jsPDF = __webpack_require__("./node_modules/jspdf/dist/jspdf.min.js");
var pdf = new jsPDF("p", "mm", "a4");
;
var FirebaseExampleComponent = /** @class */ (function () {
    function FirebaseExampleComponent(db, api, _Activatedroute, http) {
        var _this = this;
        this.db = db;
        this.api = api;
        this._Activatedroute = _Activatedroute;
        this.http = http;
        this.ReceiptCollection = this.db.collection('receipt_number');
        this.Receipt = this.db.collection('receipt_number').valueChanges();
        this.userCollection = this.db.collection('users');
        this.user = this.db.collection('users').valueChanges();
        this.List = [];
        this.receiptNumber();
        this.param_data = this._Activatedroute.snapshot.params['id'];
        this.spilt_data = this.param_data.split('+');
        console.log('charge id  === ' + this.spilt_data[0] + 'user id ' + this.spilt_data[1]);
        this.getUserData(this.spilt_data[1]).then(function () {
            _this.pdfAndHtml();
        });
    }
    FirebaseExampleComponent.prototype.ngOnInit = function () {
    };
    FirebaseExampleComponent.prototype.receiptNumber = function () {
        var _this = this;
        var sfDocRef = this.db.collection("receipt_number").doc("receipt_id").ref;
        this.db.firestore.runTransaction(function (transaction) {
            return transaction.get(sfDocRef).then(function (sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                _this.receipt_number = sfDoc.data().last;
                var dt = new Date();
                var year_db = _this.receipt_number.toString().substring(0, 4);
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
                    _this.receipt_number = new_year;
                    transaction.update(sfDocRef, { last: ++new_year });
                }
            });
        }).then(function (last) {
        }).catch(function (err) {
            console.error(err);
        });
    };
    FirebaseExampleComponent.prototype.getUserData = function (user_id) {
        var _this = this;
        this.userCollection.doc(user_id).ref.get().then(function (doc) {
            console.log(doc.data());
            _this.email = doc.data().email;
            _this.gift = doc.data().giftAid;
            _this.name = doc.data().name;
        });
        return Promise.resolve();
    };
    FirebaseExampleComponent.prototype.pdfAndHtml = function () {
        var _this = this;
        this.api.getStripeData(this.spilt_data[0]).subscribe(function (res) {
            console.log("from the componnet.ts STRIPE method....", res);
            _this.data = res;
            console.log("meta data " + _this.data.metadata);
            var keys = Object.keys(_this.data.metadata);
            console.log(keys);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i] === "latitude" || keys[i] === "longitude") {
                }
                else {
                    _this.List.push({ name: keys[i], amount: _this.data.metadata[keys[i]] });
                }
            }
            console.log(_this.List);
            _this.totalAmount = (_this.data.amount / 100) + '';
            _this.date = new Date(_this.data.created * 1000).toString().slice(0, 24);
            _this.trasactionId = _this.data.id;
            console.log(_this.email);
            _this.title = 'Mr';
            _this.firstname = (_this.data.source.name != undefined) ? _this.data.source.name : _this.name; //this.data.source.name;
            _this.giftaid = (_this.gift) ? 'Yes' : 'No';
            _this.comments = '';
            setTimeout(function () {
                var elementToPrint = document.getElementById('pdf');
                pdf.setFillColor(245, 240, 196, 1);
                pdf.addHTML(elementToPrint, function () {
                    var pdfData = pdf.output('datauristring');
                    _this.api.testingMethod(pdfData, _this.email).subscribe(function (res) {
                        console.log(res.toString());
                    });
                });
            }, 1000);
        });
    };
    FirebaseExampleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-firebase-example',
            template: __webpack_require__("./src/app/firebase-example/firebase-example.component.html"),
            styles: [__webpack_require__("./src/app/firebase-example/firebase-example.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_firestore__["a" /* AngularFirestore */], __WEBPACK_IMPORTED_MODULE_3__api_service__["a" /* ApiService */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], FirebaseExampleComponent);
    return FirebaseExampleComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    source: {
        apiKey: "AIzaSyBX3nrDzY7OGGfdRiLGGqhZ2Hh58S0WKf8",
        authDomain: "donationapp-3a9ae.firebaseapp.com",
        databaseURL: "https://donationapp-3a9ae.firebaseio.com",
        projectId: "donationapp-3a9ae",
        storageBucket: "donationapp-3a9ae.appspot.com",
        messagingSenderId: "423650619788"
    },
    destination: {
        apiKey: "AIzaSyAdvXoC8n6wminzT-b5veYrxloXdVoLN6E",
        authDomain: "prod-donation.firebaseapp.com",
        databaseURL: "https://prod-donation.firebaseio.com",
        projectId: "prod-donation",
        storageBucket: "prod-donation.appspot.com",
        messagingSenderId: "112589549179"
    }
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map