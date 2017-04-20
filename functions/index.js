const wdk = require('wikidata-sdk')
const request = require('request');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
// var endpoint = new SparqlHttp({endpointUrl:'https://query.wikidata.org/sparql'});
/*?format=json&query=SPARQL*/
admin.initializeApp(functions.config().firebase);


// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
exports.updateData = functions.https.onRequest((REQUEST, response) => {
  // if you do not bind any city, it returns 10 random leaderNames
  var db = admin.database();
  var ref = db.ref("chemicals");
  var query = ""
  +"SELECT ?symbol ?elementLabel (SAMPLE(?electronegativity) AS ?electronegativity) (SAMPLE(?mass) AS ?mass) (SAMPLE(?density) AS ?density) (SAMPLE(?melting_point) AS ?melting_point) (SAMPLE(?protons) AS ?protons) (SAMPLE(?boiling_point) AS ?boiling_point) "
  +"WHERE "
  +"{ "
  +"  ?element wdt:P31 wd:Q11344. "
  +"  ?element wdt:P246 ?symbol. "
  +"  MINUS { "
  +"    ?element wdt:P279 wd:Q24243084. "
  +"  } "
  +"  OPTIONAL { "
  +"    ?isotope wdt:P279 ?element; "
  +"    wdt:P1148 ?neutrons. "
  +"  } "
  +"  OPTIONAL { "
  +"    ?element wdt:P1086 ?protons; "
  +"  } "
  +"  OPTIONAL { "
  +"    ?element wdt:P2102 ?boiling_point; "
  +"  } "
  +"  OPTIONAL { "
  +"    ?element wdt:P2101 ?melting_point; "
  +"  } "
  +"  OPTIONAL { "
  +"    ?element wdt:P1108 ?electronegativity; "
  +"  } "
  +"  OPTIONAL { "
  +"    ?element wdt:P2067 ?mass; "
  +"  } "
  +"  OPTIONAL { "
  +"    ?element wdt:P2054 ?density. "
  +"  } "
  +'  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }     '
  +"} "
  +"GROUP BY ?symbol ?elementLabel "
  +"ORDER BY ?protons"
  var url = wdk.sparqlQuery(query)
  // console.log(url);
  request(url, function (error, response, body) {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var data = JSON.parse(body).results.bindings;
    for (datum of data) {
  // Get the leaderName(s) of the given citys
    for (variable of  Object.keys(datum)) {
      datum[variable]=datum[variable].value;
    }
  }
  ref.set(data);
  // console.log("Over and out !");
  // console.log(data); // Print the HTML for the Google homepage.
});
response.status(200).send();
});
