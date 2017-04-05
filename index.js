// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// var SparqlHttp = require('sparql-http-client');
// var thing = {};
// SparqlHttp(thing);
const wdk = require('wikidata-sdk')
// var endpoint = new SparqlHttp({endpointUrl:'https://query.wikidata.org/sparql'});
/*?format=json&query=SPARQL*/
// admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
  // Get the leaderName(s) of the given citys
  // if you do not bind any city, it returns 10 random leaderNames
var query = "SELECT ?element (SAMPLE(?symbol) AS ?symbol) WHERE {  ?element wdt:P31 wd:Q11344.  ?element wdt:P246 ?symbol.  MINUS {  ?element wdt:P279 wd:Q24243084.    }} GROUP BY ?element";
console.log(wdk.sparqlQuery(query));

// })
