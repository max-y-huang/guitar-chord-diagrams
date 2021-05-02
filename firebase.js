import firebase from 'firebase';
import credentials from './config';

let fb = firebase.initializeApp(credentials);

exports.db = fb.database();
