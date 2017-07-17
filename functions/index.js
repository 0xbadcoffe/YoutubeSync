const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

exports.testFunction = functions.database.ref('Rooms/zain').onUpdate(event => {

    //response.send("hi person in Zain room");
    console.log("hello firebase user");
    const promise = firebase.database().ref("Rooms/zain").set({
        heyfuncitonworked: "it did it"
    });

});