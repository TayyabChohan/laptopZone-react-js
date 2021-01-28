import * as firebase from "firebase";
import firestore from "firebase/firestore";
const settings = { timestampsInSnapshots: true };

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA9RQnIoU_UV_zqgUnnwuxi7EAT9OQCnks",
  authDomain: "listjeannie.firebaseapp.com",
  databaseURL: "https://listjeannie.firebaseio.com",
  projectId: "listjeannie",
  storageBucket: "listjeannie.appspot.com",
  messagingSenderId: "614305059778"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
