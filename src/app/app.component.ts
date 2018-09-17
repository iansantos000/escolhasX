import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
  const config = {
    apiKey: 'AIzaSyCb1NWjg-fRC4Ew6JQVXBDc0uJFIRF2qn4',
    authDomain: 'escolhasfirebase.firebaseapp.com',
    databaseURL: 'https://escolhasfirebase.firebaseio.com',
    projectId: 'escolhasfirebase',
    storageBucket: 'escolhasfirebase.appspot.com',
    messagingSenderId: '221937898178'
  };
  firebase.initializeApp(config);
  }
}
