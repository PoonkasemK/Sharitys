import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";
// import 'firebase/auth';
// import 'firebase/database';
// import { firebaseConfig } from "../key";
// import redirect from "./redirect";

const storage = firebase.storage();
firebase.analytics();

export { storage, firebase as default };
