// const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.testFunction = functions.https.onRequest((request, response) => {
  response.header("Content-Type", "application/json");
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Content-Type");

  const con = admin.firestore().collection("ec_product");
  const ec_product_record = [];
  const promise = con.where("upc", "==", "123").get();
  const p2 = promise.then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      if (doc.exists) {
        //console.log(doc.id, " => ", doc.data().manufacturer);
        const { upc, manufacturer, mpn, mpnDescription } = doc.data();
        ec_product_record.push({
          key: doc.id,
          doc, // DocumentSnapshot
          upc,
          manufacturer,
          mpn,
          mpnDescription
        });
        // console.log("By UPC => " + ec_product_record);
        response.send(ec_product_record);
      }
    });
  });

  p2.catch(error => {
    console.log(error);
    response.status(500).send(error);
  });
});
