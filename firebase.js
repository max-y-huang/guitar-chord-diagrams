import firebase from 'firebase';
import config from './config';

let fb = firebase.initializeApp(config.firebase);

exports.db = fb.database();
