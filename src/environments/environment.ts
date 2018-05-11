// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,

  source: 
     {
      apiKey: "AIzaSyBX3nrDzY7OGGfdRiLGGqhZ2Hh58S0WKf8",
      authDomain: "donationapp-3a9ae.firebaseapp.com",
      databaseURL: "https://donationapp-3a9ae.firebaseio.com",
      projectId: "donationapp-3a9ae",
      storageBucket: "donationapp-3a9ae.appspot.com",
      messagingSenderId: "423650619788"
  },

  destination : {

    apiKey: "AIzaSyAdvXoC8n6wminzT-b5veYrxloXdVoLN6E",
    authDomain: "prod-donation.firebaseapp.com",
    databaseURL: "https://prod-donation.firebaseio.com",
    projectId: "prod-donation",
    storageBucket: "prod-donation.appspot.com",
    messagingSenderId: "112589549179"

  }

};
