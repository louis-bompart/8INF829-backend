// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
var SparqlHttp = require('sparql-http-client');
var thing = {};
SparqlHttp(thing);

var endpoint = new SparqlHttp({endpointUrl:'https://query.wikidata.org/sparql'});
/*?format=json&query=SPARQL*/
// admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
  // Get the leaderName(s) of the given citys
  // if you do not bind any city, it returns 10 random leaderNames
  var query = "PREFIX wd: <http://www.wikidata.org/entity/> PREFIX wdt: <http://www.wikidata.org/prop/direct/> PREFIX wikibase: <http://wikiba.se/ontology#> PREFIX p: <http://www.wikidata.org/prop/> PREFIX ps: <http://www.wikidata.org/prop/statement/> PREFIX pq: <http://www.wikidata.org/prop/qualifier/> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX bd: <http://www.bigdata.com/rdf#> #Chemical elements and their isotopes by number of neutrons (min/max) #added before 2016-10 SELECT ?element (SAMPLE(?symbol) AS ?symbol) WHERE {  ?element wdt:P31 wd:Q11344.  ?element wdt:P246 ?symbol.  MINUS {  ?element wdt:P279 wd:Q24243084.    }} GROUP BY ?element";
  endpoint.selectQuery(query).then(function (res) {
    return res.text()
  }).then(function (body) {
    var result = JSON.parse(body);
    console.log(JSON.stringify(result,null, ' '));
  }).catch(function (err) {
    console.error(err);
  });

// })
